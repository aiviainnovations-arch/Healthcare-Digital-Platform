/**
 * Every piece of copy and demo data on the site lives here.
 * Aurelia Health is fictional. Nothing below describes a real clinic,
 * clinician, patient or service.
 */

export const brand = {
  name: 'Aurelia Health',
  tagline: 'Care, designed around you.',
  portfolioNotice:
    'Aurelia Health is a fictional clinic, created by AIVA as a web design concept.',
}

/**
 * Hero presentation switch.
 * '3d'    — React Three Fiber sculpture (default)
 * 'video' — cinematic brand film; drop your file in /public/videos (see README)
 */
export const heroMedia: '3d' | 'video' = '3d'

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Specialties', href: '#specialties' },
  { label: 'Doctors', href: '#doctors' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export const principles = [
  {
    title: 'Precision',
    body: 'Thoughtful care supported by modern diagnostic technology.',
  },
  {
    title: 'Clarity',
    body: 'Clear communication throughout the patient journey.',
  },
  {
    title: 'Comfort',
    body: 'A calmer, more human healthcare environment.',
  },
]

export type Specialty = {
  id: string
  name: string
  description: string
  /** Abstract mark drawn in Specialties.tsx — see the `marks` map there. */
  mark: 'pulse' | 'orbit' | 'leaf' | 'layers' | 'shield' | 'scan'
}

export const specialties: Specialty[] = [
  {
    id: 'internal-medicine',
    name: 'Internal medicine',
    description: 'Day-to-day adult care, from routine concerns to longer-term conditions.',
    mark: 'orbit',
  },
  {
    id: 'womens-health',
    name: "Women's health",
    description: 'Consultations and screening across every stage of life.',
    mark: 'leaf',
  },
  {
    id: 'cardiology',
    name: 'Cardiology',
    description: 'Heart health assessment, monitoring and follow-up care.',
    mark: 'pulse',
  },
  {
    id: 'dermatology',
    name: 'Dermatology',
    description: 'Skin, hair and nail concerns, reviewed with unhurried attention.',
    mark: 'layers',
  },
  {
    id: 'preventive-care',
    name: 'Preventive care',
    description: 'Health reviews designed to find small things before they grow.',
    mark: 'shield',
  },
  {
    id: 'diagnostics',
    name: 'Diagnostics',
    description: 'On-site imaging and laboratory work, reported back clearly.',
    mark: 'scan',
  },
]

export type Doctor = {
  id: string
  name: string
  specialty: string
  intro: string
  portrait: string
}

/** Fictional placeholder people. No credentials, awards or claims. */
export const doctors: Doctor[] = [
  {
    id: 'maya-shah',
    name: 'Dr. Maya Shah',
    specialty: 'Internal medicine',
    intro: 'Sees adults for everyday health concerns and long-term follow-up.',
    portrait: '/images/doctor-01.svg',
  },
  {
    id: 'arjun-mehta',
    name: 'Dr. Arjun Mehta',
    specialty: 'Cardiology',
    intro: 'Works with patients on heart health assessment and monitoring.',
    portrait: '/images/doctor-02.svg',
  },
  {
    id: 'elena-rao',
    name: 'Dr. Elena Rao',
    specialty: 'Dermatology',
    intro: 'Consults on skin concerns, from short-term flare-ups to ongoing care.',
    portrait: '/images/doctor-03.svg',
  },
]

export const journey = [
  {
    step: '01',
    title: 'Book',
    body: 'Choose a time that fits your week. Confirmation arrives the same day.',
  },
  {
    step: '02',
    title: 'Arrive',
    body: 'A calm, welcoming space. No queue, no paperwork at the door.',
  },
  {
    step: '03',
    title: 'Consult',
    body: 'An unhurried conversation with the clinician who will follow your care.',
  },
  {
    step: '04',
    title: 'Follow up',
    body: 'Written next steps, results explained in plain language, and a way to reach us.',
  },
]

export const technologyPillars = [
  {
    title: 'Diagnostics',
    body: 'Imaging and laboratory work handled in one visit where possible.',
  },
  {
    title: 'Records',
    body: 'One patient record, readable by you and every clinician you see.',
  },
  {
    title: 'Monitoring',
    body: 'Continuity between visits, so care does not restart each time.',
  },
]

/** Clearly-labelled demo interface copy — not real patient reviews. */
export const testimonials = [
  {
    quote:
      'Sample patient feedback shown for demonstration. This space would hold a short, verified quote about the consultation experience.',
    attribution: 'Demo entry — internal medicine',
  },
  {
    quote:
      'Sample patient feedback shown for demonstration. A second entry shows how longer feedback wraps inside the card.',
    attribution: 'Demo entry — preventive care',
  },
  {
    quote:
      'Sample patient feedback shown for demonstration. Real deployments would source these from a verified review provider.',
    attribution: 'Demo entry — dermatology',
  },
]

/** Placeholder contact details. Deliberately non-routable. */
export const contact = {
  lines: ['Aurelia Health', '123 Wellness Avenue', 'Mumbai, India'],
  phone: '+91 00000 00000',
  email: 'hello@example.com',
  hours: [
    ['Monday – Friday', '08:00 – 20:00'],
    ['Saturday', '09:00 – 16:00'],
    ['Sunday', 'Closed'],
  ] as const,
}

export const appointmentTimes = [
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
]
