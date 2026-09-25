import { useEffect, useState } from 'react'
import { brand, navLinks } from '../data/site'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-700 ease-calm',
        scrolled || open
          ? 'border-b border-charcoal/10 bg-ivory/80 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      ].join(' ')}
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
    >
      <nav className="shell flex h-[4.5rem] items-center justify-between" aria-label="Main">
        <a href="#top" className="group flex items-baseline gap-2.5" onClick={() => setOpen(false)}>
          <span className="font-display text-[1.35rem] leading-none tracking-tight">Aurelia</span>
          <span className="text-[0.7rem] uppercase tracking-wide2 text-charcoal/55">Health</span>
        </a>

        <ul className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative text-sm text-charcoal/75 transition-colors duration-500 hover:text-charcoal"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a href="#appointment" className="btn btn-primary hidden py-3 text-[0.8rem] sm:inline-flex">
            Book appointment
          </a>
          <button
            type="button"
            className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            <span
              className={`block h-px w-5 bg-charcoal transition-transform duration-500 ease-calm ${
                open ? 'translate-y-[3px] rotate-45' : ''
              }`}
            />
            <span
              className={`block h-px w-5 bg-charcoal transition-transform duration-500 ease-calm ${
                open ? '-translate-y-[3px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="shell border-t border-charcoal/10 pb-10 pt-6 lg:hidden"
      >
        <ul className="flex flex-col">
          {navLinks.map((link) => (
            <li key={link.href} className="border-b border-charcoal/10">
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-4 font-display text-2xl"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#appointment"
          onClick={() => setOpen(false)}
          className="btn btn-primary mt-8 w-full"
        >
          Book appointment
        </a>
        <p className="mt-6 text-xs leading-relaxed text-charcoal/50">{brand.portfolioNotice}</p>
      </div>
    </header>
  )
}
