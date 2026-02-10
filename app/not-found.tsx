import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { NotFoundContent } from '@/components/not-found-content'
import { fontSans, fontMono, fontHeading } from '@/config/fonts'
import { ThemeProvider } from '@/components/branding/theme-provider'
import { QueryProvider } from '@/app/_providers/query-provider'
import '@/app/_styles/globals.css'

export const metadata = {
  title: 'Page Not Found',
}

export default async function NotFound() {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({ locale: 'en' })

  return (
    <html lang="en">
      <body className={`${fontSans.variable} ${fontMono.variable} ${fontHeading.variable} font-sans antialiased`}>
        <ThemeProvider>
          <QueryProvider>
            <NextIntlClientProvider locale="en" messages={messages}>
              <NotFoundContent />
            </NextIntlClientProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
