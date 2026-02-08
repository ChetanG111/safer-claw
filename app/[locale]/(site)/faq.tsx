'use client'

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionPanel,
} from '@/components/ui/accordion'
import Link from 'next/link'

export default function FAQ() {
  const faqs = [
    {
      question: "What is Safer-Claw?",
      answer:
        "Safer-Claw is a lightweight SaaS that lets you deploy your own private OpenClaw agent and connect it directly to Telegram or WhatsApp in one click.",
    },
    {
      question: "Is it secure?",
      answer:
        "Yes. Security and control are our core promises. You get a private environment where you control the agent's permissions and data access.",
    },
    {
      question: "Do I need coding skills?",
      answer:
        "No. Safer-Claw is built for non-technical users. You can set up your agent and workflows without writing a single line of code.",
    },
    {
      question: "What platforms does it support?",
      answer: "We currently support direct integration with Telegram and WhatsApp.",
    },
    {
      question: "Can it automate tasks?",
      answer: "Absolutely. Your agent can run workflows, automate repetitive tasks, and essentially act as a digital employee within your chat tools.",
    },
    {
      question: "How do I get access?",
      answer:
        "We are currently in a closed beta. Join our waitlist to be notified when we open up more spots.",
    },
  ]

  return (
    <section id='faq' className='py-12 md:py-24 border-t border-b border-[#E4E4E7] bg-[#F4F4F5]'>
      <div className='mx-auto max-w-6xl px-4 sm:px-6'>
        <h2
          className='text-center text-sm font-medium text-muted-foreground mb-8'
          style={{ fontFamily: 'var(--font-geist-mono)' }}
        >
          FAQ
        </h2>
        <div className='flex flex-col items-center gap-8 max-w-2xl mx-auto'>
          {/* Header Section */}
          <div className='text-center'>
            <h2 className='text-3xl font-semibold tracking-tight mb-4'>
              Frequently Asked Questions
            </h2>
            <p className='text-base text-muted-foreground'>
              Have another question? Contact us on{' '}
              <Link
                href='https://x.com/kyronhq'
                target='_blank'
                rel='noopener noreferrer'
                className='text-foreground underline underline-offset-4 hover:text-primary transition-colors'
              >
                Twitter
              </Link>
              .
            </p>
          </div>

          {/* FAQ Items */}
          <div className='w-full'>
            <Accordion className='space-y-0'>
              {faqs.map((faq, index) => (
                <AccordionItem key={index} className='border-b border-[#E4E4E7] last:border-b-0'>
                  <AccordionTrigger className='text-left py-4 text-base font-medium hover:no-underline'>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionPanel className='text-muted-foreground text-sm pb-4'>
                    {faq.answer}
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
