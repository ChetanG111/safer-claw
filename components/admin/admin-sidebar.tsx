'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import {
  UsersIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  Building2Icon,
  LogOutIcon,
} from 'lucide-react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function AdminSidebar({ user }: { user: any }) {
  return (
    <Sidebar collapsible='icon' className='border-r border-slate-200/50 bg-white'>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' render={<Link href='/' />} className='hover:bg-slate-50'>
              <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-brand-navy text-white transition-transform group-hover:scale-110'>
                <img
                  src='/image.png'
                  alt='Safer-Claw Logo'
                  className='h-5 w-5 object-contain invert'
                />
              </div>
              <div className='grid flex-1 text-left text-sm leading-tight ml-2'>
                <span className='truncate font-bold text-brand-navy'>safer-claw</span>
                <span className='truncate text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono'>
                  Admin
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className='px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono mb-2'>
            Platform
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className='space-y-1 px-2'>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip='Dashboard'
                  render={<Link href='/admin' />}
                  className='rounded-xl hover:bg-slate-50 transition-colors'
                >
                  <LayoutDashboardIcon className='h-4 w-4 text-slate-500' />
                  <span className='font-semibold text-slate-600'>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip='Users'
                  render={<Link href='/admin/users' />}
                  className='rounded-xl hover:bg-slate-50 transition-colors'
                >
                  <UsersIcon className='h-4 w-4 text-slate-500' />
                  <span className='font-semibold text-slate-600'>Users</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip='Organizations'
                  render={<Link href='/admin/organizations' />}
                  className='rounded-xl hover:bg-slate-50 transition-colors'
                >
                  <Building2Icon className='h-4 w-4 text-slate-500' />
                  <span className='font-semibold text-slate-600'>Organizations</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className='p-4 border-t border-slate-100'>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size='lg'
                  className='rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300 transition-all shadow-sm'
                >
                  <Avatar className='h-8 w-8 rounded-lg'>
                    <AvatarImage src={user.image || ''} alt={user.name} />
                    <AvatarFallback className='rounded-lg bg-slate-200 text-slate-600 font-bold'>
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className='grid flex-1 text-left text-sm leading-tight ml-2'>
                    <span className='truncate font-bold text-brand-navy'>{user.name}</span>
                    <span className='truncate text-xs text-slate-500'>{user.email}</span>
                  </div>
                  <SettingsIcon className='ml-auto size-4 text-slate-400' />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className='w-[--radix-dropdown-menu-trigger-width] min-w-64 rounded-2xl p-2 shadow-xl border-slate-200'
                side='top'
                align='end'
                sideOffset={12}
              >
                <DropdownMenuItem className='rounded-xl text-red-600 focus:text-red-700 focus:bg-red-50 p-3'>
                  <LogOutIcon className='mr-2 h-4 w-4' />
                  <span className='font-bold'>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
