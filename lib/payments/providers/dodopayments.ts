import DodoPayments from 'dodopayments'
import type {
  PaymentAdapter,
  CheckoutOptions,
  CheckoutResult,
  CustomerData,
  SubscriptionData,
  PortalResult,
  WebhookEvent,
  WebhookResult,
} from '../types'
import type { PaymentProvider, PlanName } from '@/config/payments'
import { getPriceConfig, paymentConfig } from '@/config/payments'
import { env } from '@/config/env'

export class DodoPaymentsAdapter implements PaymentAdapter {
  public readonly provider: PaymentProvider = 'dodopayments'
  private client: DodoPayments

  constructor() {
    if (!env.DODO_PAYMENTS_API_KEY) {
      throw new Error('DODO_PAYMENTS_API_KEY is required for Dodo Payments adapter')
    }

    const dodoEnv =
      env.DODO_PAYMENTS_ENVIRONMENT || (env.NODE_ENV === 'production' ? 'live_mode' : 'test_mode')

    this.client = new DodoPayments({
      bearerToken: env.DODO_PAYMENTS_API_KEY.trim(),
      environment: dodoEnv,
    })

    console.log(`Dodo Payments client initialized in [${dodoEnv}] mode.`)
  }

  async createCheckout(options: CheckoutOptions): Promise<CheckoutResult> {
    const { plan, successUrl, userId, email, trialDays } = options

    const prices = getPriceConfig(plan, 'dodopayments')
    if (prices.length === 0) {
      throw new Error(`No Dodo Payments prices configured for plan: ${plan}`)
    }

    const price = prices.find((p: any) => p.interval === 'month') || prices[0]

    if (!price.productId) {
      throw new Error(`No product ID configured for plan ${plan}`)
    }

    let customerId: string | undefined

    if (email) {
      // Try to find existing customer by email
      try {
        const customers = await this.client.customers.list({ email, page_size: 1 })
        if (customers.items.length > 0) {
          customerId = customers.items[0].customer_id
        }
      } catch (error) {
        console.warn('Failed to find existing Dodo customer:', error)
      }
    }

    // Prepare checkout params
    const params: DodoPayments.CheckoutSessionCreateParams = {
      product_cart: [
        {
          product_id: price.productId,
          quantity: 1,
        },
      ],
      return_url: successUrl || paymentConfig.providers.successUrl,
      metadata: {
        userId,
        plan,
        provider: 'dodopayments',
      },
      payment_method_id: undefined, // Let user choose
    }

    // If we have a customer ID, attach it.
    if (email) {
      params.customer = {
        email: email,
        name: email.split('@')[0], // Fallback name
      }
    }

    if (trialDays && trialDays > 0) {
      params.subscription_data = {
        trial_period_days: trialDays,
      }
    }

    const session = await this.client.checkoutSessions.create(params)

    if (!session.checkout_url) {
      throw new Error('Failed to create checkout session URL')
    }

    return {
      url: session.checkout_url,
      sessionId: session.session_id,
    }
  }

  async createCustomer(userId: string, email?: string): Promise<CustomerData> {
    if (!email) {
      throw new Error('Email is required to create a Dodo Payments customer')
    }

    // Dodo creates customers implicitly during checkout or explicitly.
    const customer = await this.client.customers.create({
      email,
      name: email.split('@')[0],
      metadata: {
        userId,
      },
    })

    return {
      id: `dodopayments_${customer.customer_id}`,
      providerCustomerId: customer.customer_id,
      email: customer.email,
      userId,
      provider: 'dodopayments',
    }
  }

  async getSubscription(providerSubscriptionId: string): Promise<SubscriptionData | null> {
    try {
      const subscription = await this.client.subscriptions.retrieve(providerSubscriptionId)

      const plan = this.mapProductToPlan(subscription.product_id)

      return {
        id: `dodopayments_${subscription.subscription_id}`,
        providerSubscriptionId: subscription.subscription_id,
        userId: subscription.metadata?.userId || '',
        customerId: `dodopayments_${subscription.customer.customer_id}`,
        status: this.mapStatus(subscription.status),
        plan,
        provider: 'dodopayments',
        interval:
          subscription.payment_frequency_interval === 'Month'
            ? 'month'
            : subscription.payment_frequency_interval === 'Year'
              ? 'year'
              : null,
        amount: subscription.recurring_pre_tax_amount / 100, // Convert cents to dollars
        currency: subscription.currency,
        currentPeriodStart: new Date(subscription.previous_billing_date), // Approximate
        currentPeriodEnd: new Date(subscription.next_billing_date),
        cancelAtPeriodEnd: subscription.cancel_at_next_billing_date,
        canceledAt: subscription.cancelled_at ? new Date(subscription.cancelled_at) : null,
        trialStart: null, // Dodo doesn't strictly provide trial start in this view
        trialEnd: null,
      }
    } catch (error) {
      console.error('Failed to get Dodo subscription:', error)
      return null
    }
  }

  async cancelSubscription(
    providerSubscriptionId: string,
    cancelAtPeriodEnd = true
  ): Promise<void> {
    await this.client.subscriptions.update(providerSubscriptionId, {
      cancel_at_next_billing_date: cancelAtPeriodEnd,
      status: cancelAtPeriodEnd ? undefined : 'cancelled',
    })
  }

  async createPortal(customerId: string, returnUrl?: string): Promise<PortalResult> {
    const dodoCustomerId = customerId.replace('dodopayments_', '')

    const session = await this.client.customers.customerPortal.create(dodoCustomerId)

    return {
      url: session.link,
    }
  }

  async processWebhook(event: WebhookEvent): Promise<WebhookResult> {
    try {
      switch (event.type) {
        case 'subscription.active':
        case 'subscription.renewed':
        case 'subscription.updated':
        case 'subscription.cancelled':
        case 'subscription.expired':
        case 'subscription.failed':
        case 'subscription.on_hold':
        case 'subscription.plan_changed': {
          const sub = event.data as any
          if (!sub.subscription_id) return { processed: false, error: 'Invalid subscription data' }

          const plan = this.mapProductToPlan(sub.product_id)

          return {
            processed: true,
            subscription: {
              id: `dodopayments_${sub.subscription_id}`,
              providerSubscriptionId: sub.subscription_id,
              userId: sub.metadata?.userId || '',
              customerId: sub.customer?.customer_id
                ? `dodopayments_${sub.customer.customer_id}`
                : undefined,
              status: this.mapStatus(sub.status),
              plan,
              provider: 'dodopayments',
              interval:
                sub.payment_frequency_interval === 'Month'
                  ? 'month'
                  : sub.payment_frequency_interval === 'Year'
                    ? 'year'
                    : null,
              amount: sub.recurring_pre_tax_amount ? sub.recurring_pre_tax_amount / 100 : null,
              currency: sub.currency,
              currentPeriodStart: sub.previous_billing_date
                ? new Date(sub.previous_billing_date)
                : null,
              currentPeriodEnd: sub.next_billing_date ? new Date(sub.next_billing_date) : null,
              cancelAtPeriodEnd: sub.cancel_at_next_billing_date || false,
              canceledAt: sub.cancelled_at ? new Date(sub.cancelled_at) : null,
              trialStart: null,
              trialEnd: null,
            },
          }
        }
        case 'payment.succeeded': {
          const pay = event.data as any
          return {
            processed: true,
            payment: {
              id: `dodopayments_${pay.payment_id}`,
              providerPaymentId: pay.payment_id,
              userId: pay.metadata?.userId || '',
              customerId: pay.customer?.customer_id
                ? `dodopayments_${pay.customer.customer_id}`
                : undefined,
              subscriptionId: undefined,
              type: 'one_time',
              status: 'succeeded',
              amount: pay.amount / 100,
              currency: pay.currency,
              description: pay.metadata?.description || 'Payment',
            },
          }
        }
      }

      return { processed: true }
    } catch (error) {
      console.error('Dodo webhook processing error:', error)
      return {
        processed: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  async validateWebhook(
    rawBody: string,
    signature: string,
    headers?: Record<string, string>
  ): Promise<boolean> {
    if (!env.DODO_PAYMENTS_WEBHOOK_KEY) {
      throw new Error('DODO_PAYMENTS_WEBHOOK_KEY is required')
    }

    try {
      if (!headers) {
        return false
      }

      this.client.webhooks.unwrap(rawBody, {
        headers,
        key: env.DODO_PAYMENTS_WEBHOOK_KEY,
      })

      return true
    } catch (error) {
      console.error('Dodo webhook validation failed:', error)
      return false
    }
  }

  private mapStatus(status: string): SubscriptionData['status'] {
    switch (status.toLowerCase()) {
      case 'active':
        return 'active'
      case 'cancelled':
      case 'canceled':
        return 'canceled'
      case 'on_hold':
        return 'paused'
      case 'expired':
      case 'failed':
        return 'incomplete'
      case 'pending':
        return 'trialing'
      default:
        return 'incomplete'
    }
  }

  private mapProductToPlan(productId?: string): PlanName {
    if (!productId) return 'free'

    for (const [planName, plan] of Object.entries(paymentConfig.plans)) {
      const dodoPrices = (plan as any).prices.dodopayments
      if (dodoPrices?.some((price: any) => price.productId === productId)) {
        return planName as PlanName
      }
    }
    return 'free'
  }
}
