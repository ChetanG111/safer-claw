import { auth } from '@/lib/auth/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { FeedbackWidget } from '@/components/feedback/feedback-widget'
import { StampBackground } from '@/components/branding/stamp-background'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  let session = await auth.api.getSession({
    headers: await headers(),
  })

  // Basic auth check
  if (!session) {
    if (process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true' && process.env.NODE_ENV === 'development') {
      // Mock session for local dev
      session = {
        user: {
          id: 'mock-admin-id',
          name: 'Mock Admin',
          email: 'admin@local.dev',
          emailVerified: true,
          role: 'admin',
          image: 'https://avatar.vercel.sh/admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        session: {
          id: 'mock-session-id',
          userId: 'mock-admin-id',
          token: 'mock-token',
          expiresAt: new Date(Date.now() + 86400000),
          ipAddress: '127.0.0.1',
          userAgent: 'MockAgent',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      }
    } else {
      redirect('/login')
    }
  }

  // Role check
  if (session.user.role !== 'admin') {
    redirect('/')
  }

  // Serialize user for client component
  const localizedUser = {
    name: session.user.name,
    email: session.user.email,
    image: session.user.image,
  }

  return (
    <SidebarProvider>
      <AdminSidebar user={localizedUser} />
      <SidebarInset className='bg-white'>
        <StampBackground />
        <header className='sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b border-slate-200/50 bg-white/70 backdrop-blur-xl px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
          <div className='flex items-center gap-2'>
            <SidebarTrigger className='-ml-1' />
            <Separator orientation='vertical' className='mr-2 h-4' />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className='hidden md:block'>
                  <BreadcrumbLink
                    href='/admin'
                    className='font-semibold text-slate-500 hover:text-brand-navy'
                  >
                    Admin
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className='hidden md:block' />
                <BreadcrumbItem>
                  <BreadcrumbPage className='font-bold text-brand-navy'>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className='flex items-center gap-4'>
            <div className='hidden items-center gap-3 sm:flex'>
              <span className='text-sm font-semibold text-slate-700'>{localizedUser.name}</span>
              <Avatar className='h-9 w-9 border-2 border-slate-100'>
                <AvatarImage src={localizedUser.image || ''} alt={localizedUser.name} />
                <AvatarFallback className='bg-slate-100 text-slate-600 font-bold'>
                  {localizedUser.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>
        <div className='flex flex-1 flex-col gap-4 p-4 pt-4'>
          {children}
          <FeedbackWidget />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
