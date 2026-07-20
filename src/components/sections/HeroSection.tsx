import { ChevronDown } from 'lucide-react'
import { SunGlow } from '#/components/SunGlow'

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-16 text-center">
      <SunGlow />

      <div className="relative z-10 flex flex-col items-center rounded-3xl px-6 py-8 backdrop-blur-[2px] sm:px-10">
        <img src="/charm-cloud.png" alt="CharmOS" className="mb-6 h-32 w-32" />

        <h1 className="font-display text-3xl font-bold text-foreground sm:text-5xl">CharmOS</h1>

        <p className="mt-6 max-w-2xl text-2xl font-semibold text-foreground sm:text-4xl">
          Your mini manager for everything content creation.
        </p>

        <p className="mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
          CharmOS is the all-in-one workspace for UGC creators and influencers juggling brand deals, content ideas,
          and deadlines — without a manager, an agency, or five different apps.
        </p>

        <button
          type="button"
          onClick={() => scrollToId('waitlist-form')}
          className="mt-8 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-md transition-all duration-200 ease-out hover:scale-[1.04] hover:shadow-lg hover:brightness-110 active:scale-[0.97] active:brightness-95"
        >
          Join the Waitlist
        </button>

        <p className="mt-3 text-xs text-muted-foreground">
          Be the first to know when we launch.
          <br />
          Get access to exclusive features and demos.
        </p>
      </div>

      <button
        type="button"
        onClick={() => scrollToId('bio')}
        className="absolute bottom-8 z-10 flex flex-col items-center gap-1 text-xs text-muted-foreground transition-all duration-200 ease-out hover:scale-105 hover:text-foreground active:scale-95"
      >
        <span>Scroll to learn more about CharmOS</span>
        <ChevronDown className="h-4 w-4" />
      </button>
    </section>
  )
}
