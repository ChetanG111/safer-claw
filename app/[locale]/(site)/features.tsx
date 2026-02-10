'use client'

export default function Features() {
  const features = [
    {
      title: 'One-Click Launch',
      description:
        'Deploy OpenClaw instantly. No complex setup, no servers to manage—just click and your agent is ready to work.',
    },
    {
      title: 'Safe & Secure',
      description:
        'Your agent runs in an isolated environment. Your data and workflows remain completely safe.',
    },
    {
      title: 'Chat Integration',
      description:
        'Connect directly to Telegram or WhatsApp. Talk to your agent where you already work.',
    },
    {
      title: 'Workflow Automation',
      description:
        'Run complex workflows and automate repetitive tasks. It acts like a digital employee.',
    },
    {
      title: 'Zero Maintenance',
      description:
        'We handle all the infrastructure, updates, and security patches. You focus on the results.',
    },
    {
      title: 'Controlled Access',
      description:
        'Secure permissions and access control. You decide exactly what your agent can and cannot do.',
    },
  ]

  const stack = []

  return (
    <section id='features' className='py-12 md:py-24 bg-transparent'>
      <div className='mx-auto max-w-6xl px-4 sm:px-6'>
        <h2 className='text-center text-sm font-bold tracking-widest text-brand-navy mb-8 font-mono'>
          CAPABILITIES
        </h2>
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold tracking-tight mb-4 text-brand-navy'>
            Your Digital Employee, Ready to Work
          </h2>
          <p className='text-lg md:text-xl text-slate-600 max-w-2xl mx-auto'>
            Powerful features designed for operators, solo founders, and small teams.
          </p>
        </div>

        <div className='border border-slate-200 rounded-3xl overflow-hidden bg-white/50 backdrop-blur-sm shadow-sm'>
          <div className='grid grid-cols-1 md:grid-cols-3 auto-rows-fr h-full'>
            {[...features, ...stack].map((item, index) => (
              <div
                key={index}
                className={`p-10 flex flex-col items-center text-center md:items-start md:text-left border-b last:border-b-0 border-slate-100 md:border-b-0 ${index % 3 !== 2 ? 'md:border-r md:border-slate-100' : ''
                  } ${index < 3 ? 'md:border-b md:border-slate-100' : ''} hover:bg-white/80 transition-colors`}
              >
                {item.logo && !item.logos && (
                  <div className='mb-3 flex items-center justify-center md:justify-start gap-2'>
                    <img src={item.logo} alt={item.title} className='h-10 w-10 object-contain' />
                  </div>
                )}
                {item.logos && (
                  <div className='mb-3 flex items-center justify-center md:justify-start gap-2 flex-wrap'>
                    {item.logos.map((logo, logoIndex) => (
                      <img
                        key={logoIndex}
                        src={logo}
                        alt={item.title}
                        className={`h-10 w-10 object-contain ${logo.includes('prisma') ? 'brightness-0' : ''
                          }`}
                      />
                    ))}
                  </div>
                )}
                <h3 className='text-lg font-semibold mb-2'>{item.title}</h3>
                <p className='text-sm text-muted-foreground'>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
