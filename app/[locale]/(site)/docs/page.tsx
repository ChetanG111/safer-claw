import { getAllMDX } from '@/lib/mdx'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { ArrowRight } from 'lucide-react'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Docs' })

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  }
}

export default async function DocsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const docs = await getAllMDX('docs')

  return (
    <div className='container mx-auto max-w-5xl py-32 px-4'>
      <div className='mb-20 text-center'>
        <h2 className='text-sm font-bold tracking-widest text-brand-navy mb-4 font-mono uppercase'>
          KNOWLEDGE BASE
        </h2>
        <h1 className='text-4xl font-bold tracking-tight lg:text-6xl text-brand-navy'>
          Documentation
        </h1>
        <p className='mt-6 text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed'>
          Simple guides and deep dives into building safe AI workflows with Safer-Claw.
        </p>
      </div>
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {docs.map((doc) => (
          <Link
            key={doc.slug}
            href={`/docs/${doc.slug}`}
            className='group flex flex-col p-8 rounded-3xl border border-slate-200 bg-white/50 backdrop-blur-sm shadow-sm transition-all hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1'
          >
            <div className='flex items-start justify-between mb-8'>
              <div className='h-10 w-10 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 group-hover:bg-brand-navy group-hover:text-white transition-colors'>
                <span className='font-bold text-xs font-mono uppercase'>{doc.slug.charAt(0)}</span>
              </div>
              <ArrowRight className='h-5 w-5 text-slate-300 group-hover:text-brand-navy transition-colors' />
            </div>
            <h2 className='text-xl font-bold tracking-tight text-brand-navy group-hover:text-emerald-600 transition-colors'>
              {doc.meta.title}
            </h2>
            <p className='mt-4 text-sm font-medium text-slate-500 leading-relaxed'>
              {doc.meta.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
