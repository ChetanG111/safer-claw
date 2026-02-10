'use client'

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionPanel,
} from '@/components/ui/accordion'

import { motion } from 'framer-motion'

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  } as const

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
      },
    },
  } as const

  return (
    <section id='faq' className='py-12 md:py-24 bg-transparent overflow-hidden'>
      <div className='mx-auto max-w-6xl px-4 sm:px-6'>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='text-center text-sm font-bold tracking-widest text-brand-navy mb-8 font-mono'
        >
          QUESTIONS
        </motion.h2>
        <div className='text-center mb-16'>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className='text-4xl md:text-5xl font-bold tracking-tight mb-4 text-brand-navy'
          >
            Common Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='text-lg md:text-xl text-slate-600 max-w-2xl mx-auto'
          >
            Everything you need to know about Safer-Claw.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          className='mx-auto max-w-3xl'
        >
          <Accordion type='single' collapsible className='w-full space-y-4'>
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={itemVariants}>
                <AccordionItem
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
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
