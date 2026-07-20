import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'

export function SearchableSelect({
  options,
  value,
  onChange,
  placeholder,
}: {
  options: string[]
  value: string
  onChange: (value: string) => void
  placeholder: string
}) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const ref = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
        setQuery('')
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const filtered = query ? options.filter((o) => o.toLowerCase().includes(query.toLowerCase())) : options

  function handleSelect(option: string) {
    onChange(option)
    setOpen(false)
    setQuery('')
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => {
          setOpen((o) => !o)
          if (!open) setTimeout(() => inputRef.current?.focus(), 0)
        }}
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-lg border border-input bg-background/70 px-4 py-2.5 text-left text-sm text-foreground outline-none ring-ring/50 focus:ring-2"
      >
        <span className={value ? '' : 'text-muted-foreground'}>{value || placeholder}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="charm-glass-solid absolute z-20 mt-1 w-full overflow-hidden rounded-lg">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search…"
            className="w-full border-b border-input bg-transparent px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          <div className="max-h-56 overflow-y-auto p-1">
            {filtered.length === 0 ? (
              <p className="px-3 py-2 text-sm text-muted-foreground">No matches</p>
            ) : (
              filtered.map((option) => (
                <button
                  type="button"
                  key={option}
                  onClick={() => handleSelect(option)}
                  className={`block w-full rounded-md px-3 py-1.5 text-left text-sm hover:bg-secondary ${
                    option === value ? 'bg-primary/15 text-primary' : 'text-foreground'
                  }`}
                >
                  {option}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
