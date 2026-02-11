'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { MessageSquarePlus, Bug, Lightbulb, MessageCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { submitFeedback } from '@/app/actions/operations'
import { useFormStatus } from 'react-dom'
import { useTranslations } from 'next-intl'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type='submit' disabled={pending} className='rounded-xl h-11 px-8 w-full sm:w-auto'>
      {pending ? 'Sending...' : 'Send Feedback'}
    </Button>
  )
}

export function FeedbackWidget() {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const t = useTranslations('Feedback')

  async function action(formData: FormData) {
    const result = await submitFeedback(null, formData)
    if (result.success) {
      setOpen(false)
      toast({
        title: t('thankYouTitle'),
        description: result.message,
      })
    } else {
      toast({
        title: 'Error',
        description: result.message,
        variant: 'destructive',
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant='default'
          size='icon'
          className='fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-110'
        >
          <MessageSquarePlus className='h-6 w-6' />
          <span className='sr-only'>Feedback</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader className='pb-2'>
          <div className='flex items-center gap-4 mb-2'>
            <div className='h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner'>
              <MessageSquarePlus className='h-6 w-6' />
            </div>
            <div className='flex flex-col gap-1'>
              <DialogTitle className='text-2xl font-bold'>Send Feedback</DialogTitle>
              <DialogDescription className='text-muted-foreground'>
                Help us improve! We read every message.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div>
          <form action={action} className='grid gap-6 py-4'>
            <div className='grid gap-2.5'>
              <Label htmlFor='type' className='text-xs font-bold uppercase tracking-wider text-muted-foreground/80'>
                Feedback Type
              </Label>
              <Select name='type' defaultValue='general'>
                <SelectTrigger className='h-12 bg-muted/20 border-border/50 hover:border-border hover:bg-muted/40 transition-all rounded-xl px-4 focus-visible:ring-primary/20'>
                  <SelectValue placeholder='Select type' />
                </SelectTrigger>
                <SelectContent
                  alignItemWithTrigger={false}
                  sideOffset={6}
                  className='w-[var(--anchor-width)] rounded-xl border-border/50 shadow-2xl bg-popover/95 backdrop-blur-sm p-1.5'
                >
                  <SelectItem value='general' className='rounded-lg py-2.5'>
                    <div className='flex items-center gap-3'>
                      <MessageCircle className='h-4.5 w-4.5 text-blue-500' />
                      <span className='font-medium'>General Feedback</span>
                    </div>
                  </SelectItem>
                  <SelectItem value='bug' className='rounded-lg py-2.5'>
                    <div className='flex items-center gap-3'>
                      <Bug className='h-4.5 w-4.5 text-rose-500' />
                      <span className='font-medium'>Bug Report</span>
                    </div>
                  </SelectItem>
                  <SelectItem value='feature' className='rounded-lg py-2.5'>
                    <div className='flex items-center gap-3'>
                      <Lightbulb className='h-4.5 w-4.5 text-amber-500' />
                      <span className='font-medium'>Feature Request</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='grid gap-2.5'>
              <Label htmlFor='message' className='text-xs font-bold uppercase tracking-wider text-muted-foreground/80'>
                Your Message
              </Label>
              <Textarea
                id='message'
                name='message'
                placeholder='Tell us what you think, what could be better, or what issues you encountered...'
                className='min-h-[160px] resize-none bg-muted/20 border-border/50 focus:border-primary/30 focus:bg-background transition-all rounded-xl p-4 text-base leading-relaxed'
                required
              />
              <p className='text-[11px] font-medium text-muted-foreground/70'>
                {t('responseTime')}
              </p>
            </div>
            <DialogFooter variant='bare' className='pt-2'>
              <Button type='button' variant='outline' onClick={() => setOpen(false)} className='rounded-xl h-11 px-6'>
                Cancel
              </Button>
              <div className='flex-1 sm:flex-none'>
                <SubmitButton />
              </div>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
