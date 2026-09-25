import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Statement } from './components/Statement'
import { Specialties } from './components/Specialties'
import { Doctors } from './components/Doctors'
import { Journey } from './components/Journey'
import { Appointment } from './components/Appointment'
import { Technology } from './components/Technology'
import { Testimonials } from './components/Testimonials'
import { Location } from './components/Location'
import { FinalCta } from './components/FinalCta'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[60] focus:rounded-full focus:bg-charcoal focus:px-5 focus:py-3 focus:text-sm focus:text-ivory"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Statement />
        <Specialties />
        <Doctors />
        <Journey />
        <Appointment />
        <Technology />
        <Testimonials />
        <Location />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
