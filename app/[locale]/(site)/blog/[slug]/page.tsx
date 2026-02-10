import { getMDXData, getMDXFiles, getAllMDX } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
import { Link } from '@/i18n/navigation'
import { ChevronLeft } from 'lucide-react'
import Navbar from '../../navbar'
import Footer from '../../footer'
import { GridLayout } from '../../grid-layout'
import { cn } from '@/lib/utils'

export async function generateStaticParams() {
  const files = await getMDXFiles('blog')
  return files.map((file) => ({
    slug: file.replace(/\.mdx$/, ''),
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  try {
    const post = await getMDXData('blog', slug)
    return {
      title: post.meta.title,
      description: post.meta.description,
    }
  } catch {
    return {
      title: 'Blog Post Not Found',
    }
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let post
  let allPosts
  try {
    post = await getMDXData('blog', slug)
    allPosts = await getAllMDX('blog')
  } catch {
    notFound()
  }

  return (
    <GridLayout>
      <Navbar showLinks={false} />
      <div className='container mx-auto max-w-7xl py-32 px-4 flex flex-col md:flex-row gap-12'>
        <aside className='w-full md:w-64 shrink-0 hidden md:block'>
          <div className='sticky top-32 space-y-8'>
            <div>
              <Link
                href='/blog'
                className='group inline-flex items-center text-xs font-bold text-slate-400 font-mono uppercase tracking-widest hover:text-brand-navy transition-colors'
              >
                <ChevronLeft className='mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1' />
                Back to Blog
              </Link>
            </div>

            <div>
              <h3 className='text-xs font-bold font-mono text-brand-navy uppercase tracking-widest mb-4'>Recent Posts</h3>
              <div className='space-y-1'>
                {allPosts.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/blog/${item.slug}`}
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
            href='/blog'
            className='mb-8 inline-flex items-center text-xs font-bold text-slate-400 font-mono uppercase tracking-widest md:hidden'
          >
            <ChevronLeft className='mr-2 h-4 w-4' />
            Back to Blog
          </Link>

          <div className='mb-12 border-b border-slate-100 pb-12'>
            <h1 className='text-4xl md:text-5xl font-bold tracking-tight text-brand-navy leading-tight'>{post.meta.title}</h1>
            <div className='mt-6 flex items-center gap-6 text-sm font-bold font-mono text-slate-400 uppercase tracking-widest'>
              <time dateTime={post.meta.date}>
                {new Date(post.meta.date).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <div className='h-1 w-1 rounded-full bg-slate-300' />
              {post.meta.author && <span>by {post.meta.author}</span>}
            </div>
          </div>

          <div className='prose prose-slate prose-lg max-w-none text-slate-600 font-medium leading-relaxed
            prose-headings:text-brand-navy prose-headings:font-bold prose-headings:tracking-tight
            prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-brand-navy prose-strong:font-bold
            prose-code:text-emerald-700 prose-code:bg-emerald-50 prose-code:px-1 prose-code:rounded
            prose-img:rounded-3xl prose-img:shadow-xl prose-img:border prose-img:border-slate-100'>
            <MDXRemote source={post.content} />
          </div>
        </article>
      </div>
      <Footer />
    </GridLayout>
  )
}
