import { LayoutDashboard, Wallet, CalendarDays, FileSearch, Users, Heart, type LucideIcon } from 'lucide-react'
import { SectionDecor } from '#/components/SectionDecor'

const FEATURES: { icon: LucideIcon; text: string }[] = [
  { icon: LayoutDashboard, text: 'One dashboard for every active brand deal (no more DMs and emails)' },
  { icon: Wallet, text: 'Automatic earnings tracking' },
  { icon: CalendarDays, text: 'Content idea scrapbook with a calendar' },
  { icon: FileSearch, text: 'Content requirement auto-parsing' },
  { icon: Users, text: 'Managing deals without a manager!' },
  { icon: Heart, text: 'And so much more! <3' },
]

export function WhatYoullGetSection() {
  return (
    <section id="what-youll-get" className="relative mx-auto max-w-3xl px-4 py-24">
      <SectionDecor
        clouds={[
          { top: '1.5%', right: '10%', size: 40 },
          { bottom: '1.5%', left: '8%', size: 34 },
        ]}
        sparkles={[
          { top: '6%', right: '3%', size: 12 },
          { bottom: '8%', left: '4%', size: 13 },
        ]}
      />

      <h2 className="relative font-display text-center text-2xl font-semibold text-foreground sm:text-3xl">
        What you'll get
      </h2>

      <div className="relative mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {FEATURES.map(({ icon: Icon, text }) => (
          <div key={text} className="charm-glass flex items-start gap-3 rounded-xl p-5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/15">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm text-foreground sm:text-base">{text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
