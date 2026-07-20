import { useState, type FormEvent } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { supabase } from '#/lib/supabase'
import { MultiSelectDropdown } from '#/components/MultiSelectDropdown'
import { SearchableSelect } from '#/components/SearchableSelect'
import { COUNTRIES } from '#/lib/countries'

const REASON_OPTIONS = [
  { value: 'lose_track', label: 'I lose track of brand deals' },
  { value: 'missed_deadline', label: 'Missed deadlines from disorganization' },
  { value: 'one_place', label: 'Want deals in one place, not Notion/sheets' },
  { value: 'organize_ideas', label: 'Better way to organize content ideas' },
  { value: 'manage_retainers', label: 'Manage long-term/retainer partnerships' },
  { value: 'track_renewals', label: 'Track recurring deliverables & renewals' },
  { value: 'track_earnings', label: 'Track earnings from brand deals' },
  { value: 'better_tools', label: 'Better tools overall as a creator' },
  { value: 'just_curious', label: 'Just curious / exploring' },
  { value: 'other', label: 'Other' },
]

const FOLLOWER_RANGE_OPTIONS = [
  { value: '', label: 'Select a range…' },
  { value: 'under_1k', label: 'Under 1,000' },
  { value: '1k_10k', label: '1,000 – 10,000' },
  { value: '10k_50k', label: '10,000 – 50,000' },
  { value: '50k_250k', label: '50,000 – 250,000' },
  { value: '250k_1m', label: '250,000 – 1,000,000' },
  { value: 'over_1m', label: '1,000,000+' },
]

const CREATOR_TYPE_OPTIONS = [
  { value: '', label: 'Select one…' },
  { value: 'canvas_ugc', label: 'Canvas UGC' },
  { value: 'tech_ugc', label: 'Tech UGC' },
  { value: 'beauty_ugc', label: 'Beauty UGC' },
  { value: 'general_creator', label: 'General content creator' },
]

const NICHE_OPTIONS = [
  { value: 'beauty', label: 'Beauty' },
  { value: 'fashion', label: 'Fashion' },
  { value: 'fitness', label: 'Fitness & Wellness' },
  { value: 'food', label: 'Food & Cooking' },
  { value: 'tech_gaming', label: 'Tech & Gaming' },
  { value: 'travel', label: 'Travel' },
  { value: 'lifestyle', label: 'Lifestyle' },
  { value: 'parenting', label: 'Parenting & Family' },
  { value: 'home_diy', label: 'Home & DIY' },
  { value: 'finance', label: 'Finance & Business' },
  { value: 'other', label: 'Other' },
]

const PLATFORM_OPTIONS = ['Instagram', 'TikTok', 'YouTube', 'Twitter/X', 'Twitch', 'Facebook', 'Other']

export function FormSection() {
  const [email, setEmail] = useState('')
  const [reasons, setReasons] = useState<string[]>([])
  const [reasonOtherText, setReasonOtherText] = useState('')
  const [creatorType, setCreatorType] = useState('')
  const [followerRange, setFollowerRange] = useState('')
  const [location, setLocation] = useState('')
  const [niches, setNiches] = useState<string[]>([])
  const [nicheOtherText, setNicheOtherText] = useState('')
  const [platforms, setPlatforms] = useState<string[]>([])
  const [newsletterOptIn, setNewsletterOptIn] = useState(false)
  const [suggestions, setSuggestions] = useState('')

  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  function toggleReason(value: string) {
    setReasons((prev) => (prev.includes(value) ? prev.filter((r) => r !== value) : [...prev, value]))
  }

  function toggleNiche(value: string) {
    setNiches((prev) => (prev.includes(value) ? prev.filter((n) => n !== value) : [...prev, value]))
  }

  function togglePlatform(platform: string) {
    setPlatforms((prev) => (prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    const reasonLabels = reasons.map((value) => REASON_OPTIONS.find((o) => o.value === value)?.label ?? value)
    const nicheLabels = niches.map((value) => NICHE_OPTIONS.find((o) => o.value === value)?.label ?? value)

    try {
      const { error } = await supabase.from('waitlist').insert({
        email,
        purpose: reasonLabels.length ? reasonLabels : null,
        purpose_other: reasons.includes('other') && reasonOtherText ? reasonOtherText : null,
        creator_type: creatorType || null,
        follower_range: followerRange || null,
        location: location || null,
        niche: nicheLabels.length ? nicheLabels : null,
        niche_other: niches.includes('other') && nicheOtherText ? nicheOtherText : null,
        platforms: platforms.length ? platforms : null,
        newsletter_opt_in: newsletterOptIn,
        suggestions: suggestions || null,
      })

      if (error) {
        setStatus('error')
        setErrorMessage(
          error.code === '23505' ? "You're already on the list!" : 'Something went wrong. Please try again.',
        )
        return
      }

      setStatus('done')
    } catch {
      setStatus('error')
      setErrorMessage('Network error — please check your connection and try again.')
    }
  }

  return (
    <section id="waitlist-form" className="relative flex min-h-screen items-center justify-center px-4 py-16">
      <div className="charm-glass w-full max-w-lg rounded-xl p-8 text-center sm:p-10">
        <img src="/charm-cloud.png" alt="CharmOS" className="mx-auto mb-4 h-14 w-14" />

        <h1 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">CharmOS</h1>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          Be the first to know when we launch. Join the waitlist below.
        </p>

        {status === 'done' ? (
          <div className="mt-8 flex flex-col items-center gap-2 text-primary">
            <CheckCircle2 className="h-8 w-8" />
            <p className="font-medium text-foreground">You're on the list!</p>
            <p className="text-sm text-muted-foreground">We'll email you when it's ready.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4 text-left">
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium text-foreground">Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-input bg-background/70 px-4 py-2.5 text-sm text-foreground outline-none ring-ring/50 placeholder:text-muted-foreground focus:ring-2"
              />
            </label>

            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-foreground">Why are you interested in Creator OS?</span>
              <MultiSelectDropdown
                options={REASON_OPTIONS}
                selected={reasons}
                onToggle={toggleReason}
                placeholder="Select all that apply…"
              />
              {reasons.includes('other') && (
                <input
                  type="text"
                  value={reasonOtherText}
                  onChange={(e) => setReasonOtherText(e.target.value)}
                  placeholder="Tell us more…"
                  className="mt-1 rounded-lg border border-input bg-background/70 px-4 py-2 text-sm text-foreground outline-none ring-ring/50 placeholder:text-muted-foreground focus:ring-2"
                />
              )}
            </div>

            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium text-foreground">What kind of creator are you?</span>
              <select
                value={creatorType}
                onChange={(e) => setCreatorType(e.target.value)}
                className="w-full rounded-lg border border-input bg-background/70 px-4 py-2.5 text-sm text-foreground outline-none ring-ring/50 focus:ring-2"
              >
                {CREATOR_TYPE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium text-foreground">Combined follower count</span>
              <select
                value={followerRange}
                onChange={(e) => setFollowerRange(e.target.value)}
                className="w-full rounded-lg border border-input bg-background/70 px-4 py-2.5 text-sm text-foreground outline-none ring-ring/50 focus:ring-2"
              >
                {FOLLOWER_RANGE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1">
                <span className="text-sm font-medium text-foreground">Location</span>
                <SearchableSelect
                  options={COUNTRIES}
                  value={location}
                  onChange={setLocation}
                  placeholder="Select a country…"
                />
              </label>

              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-foreground">Your niche</span>
                <MultiSelectDropdown
                  options={NICHE_OPTIONS}
                  selected={niches}
                  onToggle={toggleNiche}
                  placeholder="Select all that apply…"
                />
                {niches.includes('other') && (
                  <input
                    type="text"
                    value={nicheOtherText}
                    onChange={(e) => setNicheOtherText(e.target.value)}
                    placeholder="Tell us your niche…"
                    className="mt-1 rounded-lg border border-input bg-background/70 px-4 py-2 text-sm text-foreground outline-none ring-ring/50 placeholder:text-muted-foreground focus:ring-2"
                  />
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-foreground">Platforms you use</span>
              <div className="flex flex-wrap gap-2">
                {PLATFORM_OPTIONS.map((platform) => {
                  const active = platforms.includes(platform)
                  return (
                    <button
                      type="button"
                      key={platform}
                      onClick={() => togglePlatform(platform)}
                      aria-pressed={active}
                      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200 ease-out hover:scale-105 active:scale-95 ${
                        active
                          ? 'scale-105 border-2 border-primary bg-primary text-primary-foreground shadow-md'
                          : 'border-input bg-background/70 text-foreground hover:bg-secondary'
                      }`}
                    >
                      {platform}
                    </button>
                  )
                })}
              </div>
            </div>

            <label className="flex items-start gap-2 text-sm text-foreground">
              <input
                type="checkbox"
                checked={newsletterOptIn}
                onChange={(e) => setNewsletterOptIn(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-input accent-[var(--primary)]"
              />
              <span>Subscribe me to the email newsletter with updates and launch info</span>
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium text-foreground">Have any other suggestions? Let me know:</span>
              <textarea
                value={suggestions}
                onChange={(e) => setSuggestions(e.target.value)}
                placeholder="Optional…"
                rows={3}
                className="w-full resize-none rounded-lg border border-input bg-background/70 px-4 py-2.5 text-sm text-foreground outline-none ring-ring/50 placeholder:text-muted-foreground focus:ring-2"
              />
            </label>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="mt-2 w-full rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-md transition-all duration-200 ease-out hover:scale-[1.03] hover:shadow-lg hover:brightness-110 active:scale-[0.97] active:brightness-95 disabled:opacity-60 disabled:hover:scale-100 disabled:hover:brightness-100"
            >
              {status === 'submitting' ? 'Joining…' : 'Join waitlist'}
            </button>
          </form>
        )}

        {status === 'error' && <p className="mt-3 text-sm text-destructive">{errorMessage}</p>}

        <p className="mt-8 text-xs italic text-muted-foreground">Thank you for your support :) - @Ziqingsdiary</p>
      </div>
    </section>
  )
}
