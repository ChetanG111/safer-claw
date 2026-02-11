import type { Metadata } from 'next'
// import { Geist, Geist_Mono, Bricolage_Grotesque } from 'next/font/google' // Moved to config/fonts.ts
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

import '@/app/_styles/globals.css'
import { QueryProvider } from '@/app/_providers/query-provider'
import { ToastProvider } from '@/components/ui/toast'
import { generateMetadata } from '@/lib/seo'

type Props = {
  params: Promise<{ locale: string }>
  children: React.ReactNode
}

export const metadata: Metadata = {
  ...generateMetadata({
    title: 'Safer-Claw - Turn Ideas Into Products, Fast',
    description:
      'Safer-Claw - Turn ideas into products, fast. A production-ready Next.js boilerplate with auth, payments, and everything you need to launch fast. Free forever, open source.',
    isRootLayout: true,
  }),
  icons: {
    icon: '/image.png',
    shortcut: '/image.png',
    apple: '/image.png',
  },
}

import { fontSans, fontMono, fontHeading } from '@/config/fonts'
import { ThemeProvider } from '@/components/branding/theme-provider'
import { NavigationFeedback } from '@/components/feedback/navigation-feedback'

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body
        className={`${fontSans.variable} ${fontMono.variable} ${fontHeading.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <NavigationFeedback />
          <NextIntlClientProvider messages={messages}>
            <QueryProvider>
              <ToastProvider>{children}</ToastProvider>
              <div className="h-screen w-full fixed top-0 left-0 -z-10  bg-[url('/grain.jpg')] opacity-5" />
            </QueryProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
