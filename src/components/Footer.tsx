import { brand, contact, navLinks } from '../data/site'

export function Footer() {
  return (
    <footer className="border-t border-charcoal/12 bg-ivory">
      <div className="shell py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-[2rem] leading-none">Aurelia Health</p>
            <p className="mt-4 font-display text-[1.15rem] italic text-slate-blue">{brand.tagline}</p>
          </div>

          <nav aria-label="Footer">
            <ul className="space-y-3 text-[0.95rem] text-charcoal/65">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition-colors duration-500 hover:text-charcoal">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="text-[0.95rem] text-charcoal/65">
            <p>{contact.phone}</p>
            <p className="mt-2">{contact.email}</p>
            <a href="#appointment" className="btn btn-primary mt-7 w-full sm:w-auto">
              Book appointment
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-charcoal/12 pt-8 text-xs leading-relaxed text-charcoal/50 md:flex-row md:items-start md:justify-between">
          <p className="max-w-xl">
            AIVA portfolio concept. Aurelia Health is a fictional clinic created to demonstrate web
            design and development work. It is not a real business, provides no medical services, and
            nothing on this site is medical advice.
          </p>
          <p className="shrink-0 md:text-right">Designed and built by AIVA</p>
        </div>
      </div>
    </footer>
  )
}
