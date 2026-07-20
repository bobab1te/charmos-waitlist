import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'

type Option = { value: string; label: string }

export function MultiSelectDropdown({
  options,
  selected,
  onToggle,
  placeholder,
}: {
  options: Option[]
  selected: string[]
  onToggle: (value: string) => void
  placeholder: string
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const summary =
    selected.length === 0
      ? placeholder
      : selected.length === 1
        ? (options.find((o) => o.value === selected[0])?.label ?? placeholder)
        : `${selected.length} selected`

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-lg border border-input bg-background/70 px-4 py-2.5 text-left text-sm text-foreground outline-none ring-ring/50 focus:ring-2"
      >
        <span className={selected.length === 0 ? 'text-muted-foreground' : ''}>{summary}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="charm-glass absolute z-20 mt-1 max-h-64 w-full overflow-y-auto rounded-lg p-2">
          {options.map((opt) => {
            const checked = selected.includes(opt.value)
            return (
              <label
                key={opt.value}
                className="flex cursor-pointer items-start gap-2 rounded-md px-2 py-1.5 text-sm text-foreground hover:bg-secondary"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggle(opt.value)}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-input accent-[var(--primary)]"
                />
                <span>{opt.label}</span>
              </label>
            )
          })}
        </div>
      )}
    </div>
  )
}
