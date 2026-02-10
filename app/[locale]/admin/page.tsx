import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { UsersIcon, DollarSign, ActivityIcon, CreditCardIcon, ArrowUpRight } from 'lucide-react'
import { BounceSequence } from '@/components/animation/bounce-sequence'

export default function AdminDashboardPage() {
  const stats = [
    {
      title: 'Total Users',
      value: '1,234',
      change: '+12% from last month',
      icon: UsersIcon,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      title: 'Active Subscriptions',
      value: '345',
      change: '+4% from last month',
      icon: CreditCardIcon,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      title: 'Monthly Revenue',
      value: '$12,345',
      change: '+8% from last month',
      icon: DollarSign,
      color: 'text-violet-600',
      bg: 'bg-violet-50',
    },
    {
      title: 'Active Now',
      value: '573',
      change: '+201 since last hour',
      icon: ActivityIcon,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
  ]

  return (
    <div className='flex flex-1 flex-col gap-6 p-2'>
      <BounceSequence className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className='border-slate-200 bg-white/50 backdrop-blur-sm shadow-sm transition-all hover:shadow-md'
          >
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-xs font-bold uppercase tracking-widest text-slate-400 font-mono'>
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon className='h-4 w-4' />
              </div>
            </CardHeader>
            <CardContent>
              <div className='text-3xl font-bold text-brand-navy'>{stat.value}</div>
              <p className='text-xs font-medium text-slate-500 mt-1 flex items-center gap-1'>
                <span className='text-emerald-500 font-bold'>{stat.change.split(' ')[0]}</span>
                {stat.change.split(' ').slice(1).join(' ')}
              </p>
            </CardContent>
          </Card>
        ))}
      </BounceSequence>

      <BounceSequence
        className='grid gap-6 md:grid-cols-2 lg:grid-cols-7'
        initialDelay={0.2}
        staggerDelay={0.1}
      >
        <Card className='col-span-4 border-slate-200 bg-white/50 backdrop-blur-sm shadow-sm'>
          <CardHeader className='flex flex-row items-start justify-between'>
            <div>
              <CardTitle className='text-xl font-bold text-brand-navy'>Overview</CardTitle>
              <CardDescription className='text-slate-500'>
                Recent signups and revenue trends for the last 30 days.
              </CardDescription>
            </div>
            <ArrowUpRight className='h-5 w-5 text-slate-300' />
          </CardHeader>
          <CardContent className='pl-2 pt-4'>
            <div className='h-[350px] flex items-center justify-center border-2 border-dashed border-slate-100 rounded-3xl m-4'>
              <div className='text-center'>
                <ActivityIcon className='h-8 w-8 text-slate-200 mx-auto mb-2' />
                <span className='text-sm font-bold text-slate-400 uppercase tracking-widest font-mono'>
                  Analytics Engine Ready
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className='col-span-3 border-slate-200 bg-white/50 backdrop-blur-sm shadow-sm'>
          <CardHeader>
            <CardTitle className='text-xl font-bold text-brand-navy'>Recent Sales</CardTitle>
            <CardDescription className='text-slate-500 font-medium'>
              You made <span className='text-brand-navy font-bold'>265</span> sales this month.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-6'>
              {[
                {
                  name: 'Olivia Martin',
                  email: 'olivia.martin@email.com',
                  amount: '+$1,999.00',
                  status: 'success',
                },
                {
                  name: 'Jackson Lee',
                  email: 'jackson.lee@email.com',
                  amount: '+$39.00',
                  status: 'success',
                },
                {
                  name: 'Isabella Nguyen',
                  email: 'isabella.nguyen@email.com',
                  amount: '+$299.00',
                  status: 'success',
                },
                {
                  name: 'William Chen',
                  email: 'will@email.com',
                  amount: '+$99.00',
                  status: 'success',
                },
              ].map((sale, i) => (
                <div key={i} className='flex items-center group cursor-pointer'>
                  <div className='h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-slate-100 transition-colors'>
                    <span className='text-xs font-bold text-slate-400'>{sale.name.charAt(0)}</span>
                  </div>
                  <div className='ml-4 space-y-1'>
                    <p className='text-sm font-bold text-brand-navy leading-none'>{sale.name}</p>
                    <p className='text-xs font-semibold text-slate-400'>{sale.email}</p>
                  </div>
                  <div className='ml-auto font-bold text-brand-navy'>{sale.amount}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </BounceSequence>
    </div>
  )
}
