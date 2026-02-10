import { getAllMDX } from '@/lib/mdx'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Blog' })

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  }
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const posts = await getAllMDX('blog')

  return (
    <div className='container mx-auto max-w-5xl py-32 px-4'>
      <div className='mb-20 text-center'>
        <h2 className='text-sm font-bold tracking-widest text-brand-navy mb-4 font-mono uppercase'>LATEST UPDATES</h2>
        <h1 className='text-4xl font-bold tracking-tight lg:text-6xl text-brand-navy'>Blog</h1>
        <p className='mt-6 text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed'>
          Deep dives into security, AI workflows, and the future of safe operators.
        </p>
      </div>
      <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className='group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white/50 backdrop-blur-sm shadow-sm transition-all hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1'
          >
            <div className='aspect-video w-full bg-slate-100 object-cover transition-colors group-hover:bg-slate-200 opacity-80 group-hover:opacity-100' />
            <div className='flex flex-1 flex-col p-8'>
              <div className='flex items-center justify-between gap-4 text-xs font-bold font-mono text-slate-400 uppercase tracking-widest'>
                <time dateTime={post.meta.date}>
                  {new Date(post.meta.date).toLocaleDateString(locale, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
              <h2 className='mt-4 text-xl font-bold tracking-tight text-brand-navy transition-colors group-hover:text-emerald-600'>
                {post.meta.title}
              </h2>
              <p className='mt-4 line-clamp-3 text-sm text-slate-500 leading-relaxed font-medium'>
                {post.meta.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
