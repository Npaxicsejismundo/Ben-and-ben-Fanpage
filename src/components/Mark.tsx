/**
 * The fan site's own mark: a small glowing orb and "Liwanag" in italic.
 * Deliberately unlike the band's brush-lettered logo and diamond emblem.
 */
export function Mark({ className = '', size = 'md' }: { className?: string; size?: 'md' | 'lg' }) {
  const orb = size === 'lg' ? 'h-6 w-6' : 'h-3 w-3'
  const text = size === 'lg' ? 'text-5xl sm:text-7xl' : 'text-lg'
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span aria-hidden className={`relative inline-block shrink-0 rounded-full bg-light ${orb}`}>
        <span className="glow-orb breathe absolute -inset-[120%] rounded-full" />
      </span>
      <span className={`display italic leading-none ${text}`}>Liwanag</span>
    </span>
  )
}
