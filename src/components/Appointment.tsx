import {
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
  type InputHTMLAttributes,
} from 'react'
import { appointmentTimes, specialties } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { SectionIntro } from './ui/SectionIntro'

type Fields = {
  name: string
  email: string
  phone: string
  specialty: string
  date: string
  time: string
}

const empty: Fields = { name: '', email: '', phone: '', specialty: '', date: '', time: '' }

export function Appointment() {
  const reduced = usePrefersReducedMotion()
  const ref = useReveal<HTMLElement>({ disabled: reduced })
  const [fields, setFields] = useState<Fields>(empty)
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({})
  const [sent, setSent] = useState(false)

  const today = useMemo(() => new Date().toISOString().slice(0, 10), [])

  const update = (key: keyof Fields) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFields((current) => ({ ...current, [key]: event.target.value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
  }

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const next: Partial<Record<keyof Fields, string>> = {}
    if (!fields.name.trim()) next.name = 'Enter the name the appointment is for.'
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fields.email)) next.email = 'Enter an email we can reply to.'
    if (fields.phone.replace(/\D/g, '').length < 7) next.phone = 'Enter a phone number we can reach.'
    if (!fields.specialty) next.specialty = 'Choose a specialty.'
    if (!fields.date) next.date = 'Choose a preferred date.'
    if (!fields.time) next.time = 'Choose a preferred time.'

    setErrors(next)
    if (Object.keys(next).length === 0) setSent(true)
  }

  return (
    <section ref={ref} id="appointment" className="bg-mist/50 py-24 md:py-36">
      <div className="shell">
        <SectionIntro
          index="Appointments"
          heading="Request a time that suits you."
          body="This form is part of a design concept. Nothing is sent, stored or booked — submitting it only shows the confirmation state."
        />

        <div className="mt-16 grid gap-12 md:mt-24 lg:grid-cols-[1fr_22rem] lg:gap-20">
          {sent ? (
            <div className="bg-ivory p-10 shadow-lift md:p-14" role="status" aria-live="polite">
              <h3 className="font-display text-editorial">Request received</h3>
              <p className="mt-5 max-w-measure text-[1.0625rem] leading-relaxed text-charcoal/70">
                Thank you. Our team will contact you to confirm your appointment.
              </p>
              <p className="mt-8 max-w-measure text-sm leading-relaxed text-charcoal/45">
                Demonstration only — no appointment has been made and no details have been sent
                anywhere.
              </p>
              <button
                type="button"
                className="btn btn-ghost mt-10"
                onClick={() => {
                  setFields(empty)
                  setSent(false)
                }}
              >
                Start another request
              </button>
            </div>
          ) : (
            <form className="bg-ivory p-8 shadow-lift md:p-12" onSubmit={submit} noValidate>
              <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
                <Field
                  id="name"
                  label="Full name"
                  value={fields.name}
                  onChange={update('name')}
                  error={errors.name}
                  autoComplete="name"
                />
                <Field
                  id="email"
                  label="Email"
                  type="email"
                  value={fields.email}
                  onChange={update('email')}
                  error={errors.email}
                  autoComplete="email"
                />
                <Field
                  id="phone"
                  label="Phone"
                  type="tel"
                  value={fields.phone}
                  onChange={update('phone')}
                  error={errors.phone}
                  autoComplete="tel"
                />

                <div>
                  <label htmlFor="specialty" className="eyebrow block">
                    Specialty
                  </label>
                  <select
                    id="specialty"
                    className="field mt-3"
                    value={fields.specialty}
                    onChange={update('specialty')}
                    aria-invalid={Boolean(errors.specialty)}
                    aria-describedby={errors.specialty ? 'specialty-error' : undefined}
                  >
                    <option value="">Select</option>
                    {specialties.map((specialty) => (
                      <option key={specialty.id} value={specialty.name}>
                        {specialty.name}
                      </option>
                    ))}
                  </select>
                  <ErrorText id="specialty-error" message={errors.specialty} />
                </div>

                <Field
                  id="date"
                  label="Preferred date"
                  type="date"
                  min={today}
                  value={fields.date}
                  onChange={update('date')}
                  error={errors.date}
                />

                <div>
                  <label htmlFor="time" className="eyebrow block">
                    Preferred time
                  </label>
                  <select
                    id="time"
                    className="field mt-3"
                    value={fields.time}
                    onChange={update('time')}
                    aria-invalid={Boolean(errors.time)}
                    aria-describedby={errors.time ? 'time-error' : undefined}
                  >
                    <option value="">Select</option>
                    {appointmentTimes.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                  <ErrorText id="time-error" message={errors.time} />
                </div>
              </div>

              <button type="submit" className="btn btn-primary mt-12 w-full sm:w-auto">
                Request appointment
              </button>
            </form>
          )}

          <aside className="self-start border-t border-charcoal/12 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <h3 className="font-display text-[1.5rem] leading-tight">What happens next</h3>
            <ol className="mt-6 space-y-5 text-[0.95rem] leading-relaxed text-charcoal/65">
              <li>We confirm the slot by phone or email, usually the same day.</li>
              <li>You receive a short intake form before the visit.</li>
              <li>Your clinician reviews it before you arrive.</li>
            </ol>
            <p className="mt-10 text-xs leading-relaxed text-charcoal/45">
              For anything urgent, contact your local emergency service. This concept site does not
              provide medical advice.
            </p>
          </aside>
        </div>
      </div>
    </section>
  )
}

function Field({
  id,
  label,
  error,
  ...rest
}: InputHTMLAttributes<HTMLInputElement> & { id: string; label: string; error?: string }) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow block">
        {label}
      </label>
      <input
        id={id}
        className="field mt-3"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...rest}
      />
      <ErrorText id={`${id}-error`} message={error} />
    </div>
  )
}

function ErrorText({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className="mt-2 text-xs text-slate-blue">
      {message}
    </p>
  )
}
