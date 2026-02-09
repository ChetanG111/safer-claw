import { auth } from '@/lib/auth/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { FeedbackWidget } from '@/components/feedback/feedback-widget'

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
      <SidebarInset>
        <header className='sticky top-0 z-40 flex h-14 shrink-0 items-center justify-between border-b border-[#E4E4E7] bg-[#F4F4F5] px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
          <div className='flex items-center gap-2'>
            <SidebarTrigger className='-ml-1' />
            <Separator orientation='vertical' className='mr-2 h-4' />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className='hidden md:block'>
                  <BreadcrumbLink href='/admin'>Admin</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className='hidden md:block' />
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className='flex items-center gap-4'>
            <div className='hidden items-center gap-3 sm:flex'>
              <span className='text-sm font-medium text-muted-foreground'>
                {localizedUser.name}
              </span>
              <div className='h-8 w-8 overflow-hidden rounded-full font-medium text-xs bg-muted flex items-center justify-center'>
                {localizedUser.image ? (
                  <img
                    src={localizedUser.image}
                    alt={localizedUser.name}
                    className='h-full w-full object-cover'
                  />
                ) : (
                  localizedUser.name.charAt(0).toUpperCase()
                )}
              </div>
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
