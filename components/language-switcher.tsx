'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const localeNames: Record<string, string> = {
  en: 'English',
  fr: 'Français',
  es: 'Español',
}

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <div className='flex items-center gap-2'>
      <span className='text-sm font-medium text-muted-foreground'>
        Language:
      </span>
      <Select value={locale} onValueChange={handleLocaleChange}>
        <SelectTrigger className='w-[140px] h-8'>
          <SelectValue placeholder='Select language' />
        </SelectTrigger>
        <SelectContent>
          {routing.locales.map((loc) => (
            <SelectItem key={loc} value={loc}>
              {localeNames[loc] || loc}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
