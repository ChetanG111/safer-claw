import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth/auth'
import { AppHeader } from '@/components/app-header'
import { FeedbackWidget } from '@/components/feedback/feedback-widget'

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  let user = session?.user

  if (!session) {
    if (process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true' && process.env.NODE_ENV === 'development') {
      // Mock user for development
      user = {
        id: 'mock-user-id',
        name: 'Chetan Gonuguntla',
        email: 'chetan@example.com',
        image: 'https://avatar.vercel.sh/chetan',
        emailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    } else {
      redirect('/login')
    }
  }

  return (
    <div className='relative flex min-h-screen flex-col'>
      <AppHeader user={user} />
      <main className='flex-1'>{children}</main>
      <FeedbackWidget />
    </div>
  )
}
