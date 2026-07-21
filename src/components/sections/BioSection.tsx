import { Instagram } from 'lucide-react'

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M16.5 3c.4 2.2 2 3.8 4.2 4.1V10c-1.5 0-2.9-.5-4.2-1.3v6.2a5.9 5.9 0 1 1-5.9-5.9c.3 0 .6 0 .9.1v2.6a3.3 3.3 0 1 0 2.3 3.2V3h2.7Z" />
    </svg>
  )
}

const SOCIAL_ICONS = [
  { label: 'TikTok', Icon: TikTokIcon },
  { label: 'Instagram', Icon: Instagram },
]

export function BioSection() {
  return (
    <section id="bio" className="relative mx-auto max-w-2xl px-4 py-24">
      <div className="charm-glass mx-auto flex flex-col items-center gap-5 rounded-xl p-8 text-center sm:flex-row sm:items-start sm:p-10 sm:text-left">
        <div className="flex shrink-0 flex-col items-center gap-3">
          <img
            src="/bio-photo.jpg"
            alt="Ziqing, founder of CharmOS"
            className="h-32 w-28 rounded-2xl object-cover shadow-md sm:h-36 sm:w-32"
          />

          <div className="flex gap-2">
            {SOCIAL_ICONS.map(({ label, Icon }) => (
              <div
                key={label}
                aria-hidden="true"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-primary"
              >
                <Icon className="h-4 w-4" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">For creators, by a creator.</p>
          <p className="mt-3 text-sm leading-relaxed text-foreground sm:text-base">
            As a micro influencer (10k combined) and full time student/intern, I'm constantly juggling
            work, making videos, and dealing with other commitments. Content creation is one of my passions, but it
            began to feel like a chore. I want to ensure creators never feel this way, and focus on what we love:
            creating!
          </p>
        </div>
      </div>
    </section>
  )
}
