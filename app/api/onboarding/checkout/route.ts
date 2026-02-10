import { type NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth/auth'
import { db } from '@/database'

import { getPaymentAdapter } from '@/lib/payments/service'
import { getBaseUrl } from '@/lib/utils'

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: req.headers })
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { agentType, agentName } = await req.json()

    if (!agentType || !agentName) {
      return NextResponse.json({ error: 'Missing defined fields' }, { status: 400 })
    }

    // 1. Create the agent record (status: configuring)
    const [newAgent] = await db
      .insert(agent)
      .values({
        userId: session.user.id,
        type: agentType,
        name: agentName,
        status: 'configuring',
      })
      .returning()

    // 2. Create Checkout Session
    // We'll use a fixed plan for now, e.g., 'pro' or whatever is default in onboarding
    // In a real app, you might pass the selected plan from the UI
    const paymentAdapter = getPaymentAdapter()

    // Assuming 'pro' plan is the standard offering for the agent
    const checkout = await paymentAdapter.createCheckout({
      plan: 'pro',
      userId: session.user.id,
      email: session.user.email,
      successUrl: `${getBaseUrl()}/onboarding/success?agentId=${newAgent.id}`,
      // cancelUrl: `${getBaseUrl()}/onboarding`, // Optional if supported
    })

    return NextResponse.json({ checkoutUrl: checkout.url })
  } catch (error) {
    console.error('Onboarding checkout error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
