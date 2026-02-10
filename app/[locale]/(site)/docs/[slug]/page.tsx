import { getMDXData, getMDXFiles, getAllMDX } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

export async function generateStaticParams() {
  const files = await getMDXFiles('docs')
  return files.map((file) => ({
    slug: file.replace(/\.mdx$/, ''),
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  try {
    const doc = await getMDXData('docs', slug)
    return {
      title: doc.meta.title,
      description: doc.meta.description,
    }
  } catch {
    return {
      title: 'Document Not Found',
    }
  }
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let doc
  let allDocs
  try {
    doc = await getMDXData('docs', slug)
    allDocs = await getAllMDX('docs')
  } catch {
    notFound()
  }

  return (
    <div className='container mx-auto max-w-7xl py-32 px-4 flex flex-col md:flex-row gap-12'>
      <aside className='w-full md:w-64 shrink-0 hidden md:block'>
        <div className='sticky top-32 space-y-8'>
          <div>
            <Link
              href='/docs'
              className='group inline-flex items-center text-xs font-bold text-slate-400 font-mono uppercase tracking-widest hover:text-brand-navy transition-colors'
            >
              <ChevronLeft className='mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1' />
              Full Index
            </Link>
          </div>

          <div>
            <h3 className='text-xs font-bold font-mono text-brand-navy uppercase tracking-widest mb-4'>
              Documents
            </h3>
            <div className='space-y-1'>
              {allDocs.map((item) => (
                <Link
                  key={item.slug}
                  href={`/docs/${item.slug}`}
                  className={cn(
                    'block py-2 px-3 rounded-xl text-sm font-semibold transition-all',
                    item.slug === slug
                      ? 'bg-brand-navy text-white shadow-lg shadow-slate-200'
                      : 'text-slate-500 hover:text-brand-navy hover:bg-slate-50'
                  )}
                >
                  {item.meta.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </aside>

      <article className='flex-1 min-w-0'>
        <Link
          href='/docs'
          className='mb-8 inline-flex items-center text-xs font-bold text-slate-400 font-mono uppercase tracking-widest md:hidden'
        >
          <ChevronLeft className='mr-2 h-4 w-4' />
          Back to Index
        </Link>

        <div className='mb-12 border-b border-slate-100 pb-12'>
          <h1 className='text-4xl md:text-5xl font-bold tracking-tight text-brand-navy leading-tight'>
            {doc.meta.title}
          </h1>
          <p className='mt-6 text-xl text-slate-500 font-medium leading-relaxed'>
            {doc.meta.description}
          </p>
        </div>

        <div
          className='prose prose-slate prose-lg max-w-none text-slate-600 font-medium leading-relaxed
          prose-headings:text-brand-navy prose-headings:font-bold prose-headings:tracking-tight
          prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-brand-navy prose-strong:font-bold
          prose-code:text-emerald-700 prose-code:bg-emerald-50 prose-code:px-1 prose-code:rounded
          prose-img:rounded-3xl prose-img:shadow-xl prose-img:border prose-img:border-slate-100'
        >
          <MDXRemote source={doc.content} />
        </div>
      </article>
    </div>
  )
}
