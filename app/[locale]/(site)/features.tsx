'use client'

export default function Features() {
  const features = [
    {
      title: 'One-Click Launch',
      description:
        'Deploy OpenClaw instantly. No complex setup, no servers to manage—just click and your agent is ready to work.',
    },
    {
      title: 'Private & Secure',
      description:
        'Your agent runs in an isolated environment. Your data and workflows remain completely private.',
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
    <section id="features" className='py-12 md:py-24 bg-[#F4F4F5]'>
      <div className='mx-auto max-w-6xl px-4 sm:px-6'>
        <h2
          className='text-center text-sm font-medium text-muted-foreground mb-8'
          style={{ fontFamily: 'var(--font-geist-mono)' }}
        >
          CAPABILITIES
        </h2>
        <div className='text-center mb-16'>
          <h2 className='text-4xl font-semibold tracking-tight mb-4'>
            Your Digital Employee, Ready to Work
          </h2>
          <p className='text-lg text-muted-foreground'>
            Powerful features designed for operators, solo founders, and small teams.
          </p>
        </div>

        <div className='border border-[#E4E4E7] rounded-none overflow-hidden bg-transparent'>
          <div className='grid grid-cols-1 md:grid-cols-3 auto-rows-fr h-full'>
            {[...features, ...stack].map((item, index) => (
              <div
                key={index}
                className={`p-6 bg-transparent flex flex-col items-center text-center md:items-start md:text-left border-b last:border-b-0 border-[#E4E4E7] md:border-b-0 ${index % 3 !== 2 ? 'md:border-r md:border-[#E4E4E7]' : ''
                  } ${index < 3 ? 'md:border-b md:border-[#E4E4E7]' : ''
                  }`}
              >
                {item.logo && !item.logos && (
                  <div className='mb-3 flex items-center justify-center md:justify-start gap-2'>
                    <img
                      src={item.logo}
                      alt={item.title}
                      className='h-10 w-10 object-contain'
                    />
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
