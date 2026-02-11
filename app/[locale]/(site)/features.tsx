'use client'

import { motion } from 'framer-motion'

export default function Features() {
  const features = [
    {
      title: 'One-Click OpenClaw',
      description:
        'Deploy the most advanced AI agents instantly. No complex setup, no servers—just one click and you are ready to explore.',
    },
    {
      title: 'Sandbox Safety',
      description:
        'Every agent runs in its own isolated container. Your personal data is never at risk, even in the most ambitious workflows.',
    },
    {
      title: 'Built-in Guardrails',
      description:
        'Safe execution is built into the core. Our smart guardrails prevent common AI pitfalls so you can deploy with confidence.',
    },
    {
      title: 'For Humans, Not Devs',
      description:
        'Zero terminal commands. Zero configuration files. We have hidden all the complexity behind a beautiful, simple interface.',
    },
    {
      title: 'Instant Chat Control',
      description:
        'Control your agents directly via Telegram or WhatsApp. No new apps to learn—just talk to your AI anywhere.',
    },
    {
      title: 'Scalable & Managed',
      description:
        'We handle 100% of the infrastructure and security updates. Focus on using your agent, not maintaining it.',
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
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
      },
    },
  }

  return (
    <section id='features' className='py-12 md:py-24 bg-transparent overflow-hidden'>
      <div className='mx-auto max-w-6xl px-4 sm:px-6'>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='text-center text-sm font-bold tracking-widest text-brand-navy mb-8 font-mono'
        >
          CAPABILITIES
        </motion.h2>
        <div className='text-center mb-16'>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className='text-4xl md:text-5xl font-bold tracking-tight mb-4 text-brand-navy'
          >
            The Safest Way to Use OpenClaw
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='text-lg md:text-xl text-slate-600 max-w-2xl mx-auto'
          >
            Built for anyone who wants the power of AI agents without the technical risk or setup headache.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          className='border border-slate-200 rounded-3xl overflow-hidden bg-white/50 backdrop-blur-sm shadow-sm'
        >
          <div className='grid grid-cols-1 md:grid-cols-3 auto-rows-fr h-full'>
            {features.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`p-10 flex flex-col items-center text-center md:items-start md:text-left border-b last:border-b-0 border-slate-100 md:border-b-0 ${index % 3 !== 2 ? 'md:border-r md:border-slate-100' : ''
                  } ${index < 3 ? 'md:border-b md:border-slate-100' : ''} hover:bg-white/80 transition-colors group cursor-default`}
              >
                <h3 className='text-lg font-semibold mb-2 group-hover:text-brand-navy transition-colors'>
                  {item.title}
                </h3>
                <p className='text-sm text-muted-foreground'>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
