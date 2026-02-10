import { getAllMDX } from '@/lib/mdx'
import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'
import Navbar from '../navbar'
import Footer from '../footer'
import { GridLayout } from '../grid-layout'
import { BounceSequence } from '@/components/animation/bounce-sequence'

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
    <GridLayout>
      <Navbar showLinks={false} />
      <div className='container mx-auto max-w-5xl py-32 px-4'>
        <BounceSequence className='mb-20 text-center'>
          <h2 className='text-sm font-bold tracking-widest text-brand-navy mb-4 font-mono uppercase'>LATEST UPDATES</h2>
          <h1 className='text-4xl font-bold tracking-tight lg:text-6xl text-brand-navy'>Blog</h1>
          <p className='mt-6 text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed'>
            Deep dives into security, AI workflows, and the future of safe operators.
          </p>
        </BounceSequence>

        <BounceSequence className='grid gap-8 md:grid-cols-2 lg:grid-cols-3' staggerDelay={0.15} initialDelay={0.2}>
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className='group flex flex-col p-8 rounded-3xl border border-slate-200 bg-white/50 backdrop-blur-sm shadow-sm transition-all hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1'
            >
              <div className='flex items-center justify-between mb-8'>
                <div className='h-10 w-10 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 group-hover:bg-brand-navy group-hover:text-white transition-colors'>
                  <span className='font-bold text-xs font-mono uppercase'>{post.slug.charAt(0)}</span>
                </div>
                <time dateTime={post.meta.date} className='text-[10px] font-bold font-mono text-slate-400 uppercase tracking-widest'>
                  {new Date(post.meta.date).toLocaleDateString(locale, {
                    year: 'numeric',
                    month: 'short',
                  })}
                </time>
              </div>
              <h2 className='text-xl font-bold tracking-tight text-brand-navy group-hover:text-emerald-600 transition-colors'>
                {post.meta.title}
              </h2>
              <p className='mt-4 text-sm font-medium text-slate-500 leading-relaxed line-clamp-3'>
                {post.meta.description}
              </p>
            </Link>
          ))}
        </BounceSequence>
      </div>
      <Footer />
    </GridLayout>
  )
}
