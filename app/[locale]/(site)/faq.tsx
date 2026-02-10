'use client'

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionPanel,
} from '@/components/ui/accordion'

export default function FAQ() {
  const faqs = [
    {
      question: 'What is Safer-Claw?',
      answer:
        'Safer-Claw is a lightweight SaaS that lets you deploy your own safe OpenClaw agent and connect it directly to Telegram or WhatsApp in one click.',
    },
    {
      question: 'Is it secure?',
      answer:
        "Yes. Security and control are our core promises. You get a secure environment where you control the agent's permissions and data access.",
    },
    {
      question: 'Do I need coding skills?',
      answer:
        'No. Safer-Claw is built for non-technical users. You can set up your agent and workflows without writing a single line of code.',
    },
    {
      question: 'What platforms does it support?',
      answer: 'We currently support direct integration with Telegram and WhatsApp.',
    },
    {
      question: 'Can it automate tasks?',
      answer:
        'Absolutely. Your agent can run workflows, automate repetitive tasks, and essentially act as a digital employee within your chat tools.',
    },
    {
      question: 'How do I get access?',
      answer:
        'We are currently in a closed beta. Join our waitlist to be notified when we open up more spots.',
    },
  ]

  return (
    <section id='faq' className='py-12 md:py-24 bg-transparent'>
      <div className='mx-auto max-w-6xl px-4 sm:px-6'>
        <h2 className='text-center text-sm font-bold tracking-widest text-brand-navy mb-8 font-mono'>
          QUESTIONS
        </h2>
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold tracking-tight mb-4 text-brand-navy'>
            Common Questions
          </h2>
          <p className='text-lg md:text-xl text-slate-600 max-w-2xl mx-auto'>
            Everything you need to know about Safer-Claw.
          </p>
        </div>

        <div className='mx-auto max-w-3xl'>
          <Accordion type='single' collapsible className='w-full space-y-4'>
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className='border border-slate-200 rounded-2xl px-6 bg-white/50 backdrop-blur-sm transition-all hover:bg-white/80 overflow-hidden'
              >
                <AccordionTrigger className='text-left py-6 text-lg font-bold text-brand-navy hover:no-underline'>
                  {faq.question}
                </AccordionTrigger>
                <AccordionPanel className='text-slate-600 text-base pb-6 leading-relaxed'>
                  {faq.answer}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
