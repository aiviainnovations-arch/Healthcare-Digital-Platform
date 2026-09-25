/**
 * Static stand-in for the 3D scenes: same composition, no WebGL.
 * Used on mobile, with reduced motion, while a scene chunk loads, or when
 * ENABLE_3D is false.
 */
export function SceneFallback({ variant = 'hero' }: { variant?: 'hero' | 'cta' }) {
  if (variant === 'cta') {
    return (
      <svg viewBox="0 0 900 460" className="h-full w-full" role="presentation" focusable="false">
        <defs>
          <linearGradient id="cta-wash" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E9EFEA" />
            <stop offset="100%" stopColor="#F7F5F0" />
          </linearGradient>
        </defs>
        <rect width="900" height="460" fill="url(#cta-wash)" />
        <g opacity="0.75">
          <rect x="130" y="150" width="640" height="10" rx="5" fill="#C7D8D1" transform="rotate(-2 450 155)" />
          <rect x="190" y="212" width="520" height="10" rx="5" fill="#FFFFFF" transform="rotate(1.4 450 217)" />
          <rect x="110" y="274" width="680" height="10" rx="5" fill="#6E8790" opacity="0.55" />
          <rect x="230" y="336" width="440" height="10" rx="5" fill="#DED9D0" transform="rotate(-2.2 450 341)" />
        </g>
        <circle cx="450" cy="243" r="112" fill="none" stroke="#8EA9A2" strokeWidth="1.5" opacity="0.5" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 760 700" className="h-full w-full" role="presentation" focusable="false">
      <defs>
        <linearGradient id="hero-panel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6E8790" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#C7D8D1" stopOpacity="0.35" />
        </linearGradient>
        <radialGradient id="hero-light" cx="0.34" cy="0.24" r="0.8">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#F7F5F0" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="760" height="700" fill="#F7F5F0" />
      <rect x="470" y="60" width="66" height="580" fill="#DED9D0" />
      <rect x="96" y="150" width="240" height="330" fill="url(#hero-panel)" />
      <circle cx="380" cy="330" r="196" fill="none" stroke="#C7D8D1" strokeWidth="7" opacity="0.85" />
      <circle cx="318" cy="392" r="132" fill="none" stroke="#FFFFFF" strokeWidth="5" />
      <circle cx="528" cy="222" r="46" fill="#D8C8A8" opacity="0.7" />
      <path
        d="M70 420 H250 l26 -74 l22 128 l24 -140 l26 86 h250 l32 -30 h42"
        fill="none"
        stroke="#6E8790"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.75"
      />
      <rect width="760" height="700" fill="url(#hero-light)" />
    </svg>
  )
}
