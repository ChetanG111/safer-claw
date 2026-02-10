import { getMDXData, getMDXFiles } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

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
  try {
    post = await getMDXData('blog', slug)
  } catch {
    notFound()
  }

  return (
    <article className='container mx-auto max-w-4xl py-32 px-4'>
      <Link
        href='/blog'
        className='mb-12 inline-flex items-center text-sm font-bold text-slate-400 font-mono uppercase tracking-widest transition-colors hover:text-brand-navy group'
      >
        <ChevronLeft className='mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1' />
        Back to Blog
      </Link>

      <div className='mb-16'>
        <h1 className='text-4xl font-bold tracking-tight lg:text-7xl text-brand-navy mb-8 leading-[1.1]'>{post.meta.title}</h1>
        <div className='flex items-center gap-6 text-sm font-bold font-mono text-slate-400 uppercase tracking-widest'>
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
  )
}
