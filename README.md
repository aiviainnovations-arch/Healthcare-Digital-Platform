# Aurelia Health

A fictional premium clinic website, built as a portfolio concept for **AIVA**.

Aurelia Health is not a real business. No real clinicians, patients, services,
credentials or reviews are represented anywhere in this project, and nothing in
it is medical advice.

**Stack:** React 18 · Vite 5 · TypeScript · Tailwind CSS 3 · GSAP (ScrollTrigger)
· React Three Fiber (hero and final CTA only)

---

## 1. Running it locally

Requires **Node 18 or newer** (Node 20+ recommended) and npm.

```bash
unzip aurelia-health.zip
cd aurelia-health

npm install     # first run only, ~1–2 minutes
npm run dev     # http://localhost:5173
```

Other commands:

```bash
npm run build      # production build into /dist
npm run preview    # serve the built site locally
npm run typecheck  # TypeScript only, no build
```

The Google Fonts stylesheet is loaded from `index.html`, so the first run needs
an internet connection. Without one the site still renders using the Georgia /
system-ui fallbacks declared in `tailwind.config.js`.

---

## 2. Folder structure

```
aurelia-health/
├── index.html                  # SEO, OpenGraph, font loading
├── package.json
├── tailwind.config.js          # design tokens: colour, type, spacing
├── vite.config.ts              # build + manual chunking
├── postcss.config.js
├── tsconfig.json
│
├── public/                     # served as-is at the site root
│   ├── favicon.svg
│   ├── og-image.png            # 1200×630 social preview
│   ├── images/                 # portraits + video posters
│   │   ├── doctor-01.svg
│   │   ├── doctor-02.svg
│   │   ├── doctor-03.svg
│   │   ├── poster-hero.svg
│   │   ├── poster-clinic.svg
│   │   └── poster-technology.svg
│   └── videos/                 # drop brand films here (empty by default)
│
└── src/
    ├── main.tsx                # entry point
    ├── App.tsx                 # section order
    ├── index.css               # CSS variables, base type, focus, reduced motion
    │
    ├── data/
    │   └── site.ts             # ALL copy and demo data lives here
    │
    ├── hooks/
    │   ├── useReveal.ts             # shared GSAP ScrollTrigger reveal
    │   ├── usePrefersReducedMotion.ts
    │   ├── useMediaQuery.ts
    │   └── usePointer.ts            # pointer position for 3D parallax
    │
    └── components/
        ├── Navbar.tsx  Hero.tsx  About.tsx  Specialties.tsx
        ├── Doctors.tsx  Journey.tsx  Appointment.tsx
        ├── Technology.tsx  Testimonials.tsx  Location.tsx
        ├── FinalCta.tsx  Footer.tsx
        ├── ui/
        │   ├── MagneticButton.tsx
        │   └── SectionIntro.tsx
        ├── three/
        │   ├── SceneMount.tsx       # lazy loader + 3D kill switch
        │   ├── SceneFallback.tsx    # SVG stand-in for every scene
        │   ├── HeroScene.tsx        # architectural glass sculpture
        │   └── CtaScene.tsx         # layered planes
        └── video/
            └── VideoBlock.tsx       # HeroVideo, ClinicExperienceVideo,
                                     # MedicalTechnologyVideo
```

---

## 3. Replacing the videos

No video files ship with this project. Each video slot currently shows its
poster image, which is a complete, intentional visual state — the site does not
look unfinished without them.

To add a film:

1. Export `.mp4` (H.264) and ideally `.webm` (VP9). Target under 6 MB each;
   1920×1080 at a low-ish bitrate is plenty for muted background loops.
2. Put them in `public/videos/`.
3. Open `src/components/video/VideoBlock.tsx` and uncomment the two source
   lines in the relevant wrapper:

```tsx
export const ClinicExperienceVideo = (props: { className?: string }) => (
  <VideoBlock
    poster="/images/poster-clinic.svg"
    label="Daylight moving across stone and glass surfaces in a clinic waiting room."
    className={props.className}
    mp4="/videos/clinic-experience.mp4"      // uncommented
    webm="/videos/clinic-experience.webm"    // uncommented
  />
)
```

Behaviour is already handled: muted, looping, `playsInline`, lazy, paused when
off-screen, and poster-only on mobile or under reduced motion.

### Using a film in the hero instead of 3D

In `src/data/site.ts`:

```ts
export const heroMedia: '3d' | 'video' = 'video'
```

Then uncomment the sources in `HeroVideo`.

### Video generation prompt

For the hero film, in any text-to-video tool:

> Cinematic architectural film of a calm, bright modern medical clinic interior.
> Slow dolly forward through a sunlit space of warm ivory walls, pale stone
> floors and sage-green glass partitions. Soft daylight moves across the stone
> as the camera travels. A translucent sculptural glass form catches the light
> in the centre of the frame, refracting faint blue-green highlights. Shallow
> depth of field, soft focus falloff, gentle lens breathing. Muted palette of
> ivory, sage, soft blue and warm grey. No people, no text, no medical
> equipment, no signage. Calm, still, luxurious, photorealistic. 8 seconds,
> seamless loop, 24fps.

For the clinic film, replace the middle with a waiting area — low linen seating,
a stone bench, daylight crossing the wall. For the technology film, use slow
concentric rings of light passing over a pale ceramic surface, abstract, no
machinery.

---

## 4. Replacing the images

All images live in `public/images/` and are referenced by root-relative path.

**Doctor portraits** — `doctor-01.svg` … `doctor-03.svg`, displayed at 4:5.
Replace with photographs at roughly 640×800 or larger, keeping the same
filenames, or point `portrait:` at new files in `src/data/site.ts`. Update the
`alt` text in `src/components/Doctors.tsx` if the portraits become photographs
of real people — and only use images you have rights to.

**Video posters** — `poster-hero.svg`, `poster-clinic.svg`,
`poster-technology.svg`. Export a frame from your film at 1600×900 (hero) or
1600×700 (the two band videos) and swap the paths in `VideoBlock.tsx`.

**Social preview** — `public/og-image.png`, 1200×630, referenced from
`index.html`.

**Favicon** — `public/favicon.svg`.

---

## 5. Editing the demo content

Everything readable on the site is in **`src/data/site.ts`**: brand name,
tagline, portfolio notice, nav links, the three principles, six specialties,
three doctors, four journey stages, technology pillars, demo testimonials,
contact block, opening hours, appointment time slots.

Adding a specialty means adding an object to the `specialties` array. The `mark`
field selects one of six abstract icons defined in
`src/components/Specialties.tsx` — add a new key to the `marks` map there if you
need a seventh.

Section order is set in `src/App.tsx`. Removing a section is a one-line delete.

**If you adapt this for a real clinic:** replace every placeholder, remove the
portfolio notices in `Hero.tsx`, `Navbar.tsx` and `Footer.tsx`, and wire the
appointment form to a real endpoint. Until then the disclaimers should stay —
they are what keeps a demo from reading as a real medical business.

---

## 6. Changing the colours

One place: the `colors` block in `tailwind.config.js`.

```js
ivory:    '#F7F5F0',   // page background
mist:     '#E9EFEA',   // section tint, image beds
sage:     { light: '#C7D8D1', DEFAULT: '#8EA9A2' },
slate:    { blue: '#6E8790' },   // links, accents, italic headline
sand:     '#D8C8A8',   // champagne accent, used sparingly
charcoal: '#222726',   // all text
```

Two other files hold copies for contexts Tailwind cannot reach:

- `src/index.css` — the `:root` CSS variables used by `.btn`, `.field` and
  focus rings.
- `src/components/three/HeroScene.tsx` and `CtaScene.tsx` — hex constants at the
  top of each file, since three.js materials are not styled by CSS.

The SVG fallbacks in `SceneFallback.tsx` and the map in `Location.tsx` also use
literal hex values.

**Typography** is in the same config under `fontFamily`, with the Google Fonts
request in `index.html`. Changing a typeface means editing both.

---

## 7. Turning the 3D off

Open `src/components/three/SceneMount.tsx`:

```ts
export const ENABLE_3D = false
```

Both scenes fall back to their SVG equivalents and three.js is never
downloaded — it is dynamically imported, so it only leaves the server when a
scene actually mounts.

3D already self-disables, with no configuration, when:

- the viewport is under 1024px wide,
- the visitor has `prefers-reduced-motion: reduce` set,
- the section is more than 300px from the viewport (it loads on approach).

To change the desktop threshold, edit `useIsDesktop` in
`src/hooks/useMediaQuery.ts`.

---

## 8. Deploying

The build output is a static `dist/` folder — any static host works.

**Vercel** — import the repo, or:

```bash
npm i -g vercel
npm run build
vercel deploy --prod
```

Framework preset: Vite. Build command `npm run build`, output directory `dist`.

**Netlify** — build command `npm run build`, publish directory `dist`.

**GitHub Pages** — if serving from a subpath, set `base: '/repo-name/'` in
`vite.config.ts` first, then push `dist/` to your Pages branch.

**Any static server** — `npm run build`, then serve `dist/` with nginx, Caddy or
similar. No backend, no environment variables, no build secrets.

Before going live, update the canonical URL and the `og:image` path in
`index.html` to your real domain.

---

## 9. Accessibility and performance notes

- Semantic landmarks (`header`, `nav`, `main`, `footer`, `section`, `address`,
  `figure`), a skip link, and one `h1`.
- All interactive elements are reachable and operable by keyboard; focus rings
  are visible everywhere and never removed.
- The appointment form uses real labels, `aria-invalid`, `aria-describedby` for
  errors, and an `aria-live` confirmation.
- The doctor profile toggle uses `aria-expanded` / `aria-controls`.
- Decorative visuals are `aria-hidden` or carry a descriptive label; nothing
  meaningful is conveyed by colour alone.
- `prefers-reduced-motion` disables the 3D scenes, video playback, all scroll
  reveals, the magnetic buttons and the card tilt.
- three.js and GSAP are split into separate chunks; three is dynamically
  imported and never enters the initial bundle.
- Images and videos are lazily loaded; videos pause when off-screen.
- `overflow-x: hidden` on `body` plus a single shared `.shell` gutter prevents
  horizontal scroll at every breakpoint.

### Checked at

1920 · 1440 · 1280 · 1024 · 768 · 480 · 390 · 375 px. Desktop is editorial with
the 3D bleeding into the right column; below 1024px the scene is replaced by its
SVG and the layout stacks; below 768px the nav collapses to a full-screen menu
with **Book appointment** as the last, full-width action.

---

Designed and built by AIVA. Aurelia Health is a fictional concept.
