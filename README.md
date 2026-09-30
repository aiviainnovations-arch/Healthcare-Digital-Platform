<div align="center">

# Aurelia Health

**Care, designed around you.**

A fictional premium clinic website, built as a portfolio concept for **AIVA**.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-View%20Site-1f2937?style=for-the-badge)](https://aiviainnovations-arch.github.io/Healthcare-Digital-Platform/)
[![License: MIT](https://img.shields.io/badge/License-MIT-8EA9A2?style=for-the-badge)](LICENSE)

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-ScrollTrigger-88CE02?logo=greensock&logoColor=white)
![Three.js](https://img.shields.io/badge/React_Three_Fiber-3D-000000?logo=threedotjs&logoColor=white)

<img src="public/images/screenshots/Screenshot%202026-09-30%20190559.png" alt="Aurelia Health hero section" width="900">

</div>

> **Disclaimer:** Aurelia Health is not a real business. No real clinicians, patients, services, credentials or reviews are represented anywhere in this project, and nothing in it is medical advice.

---

## Table of contents

- [Overview](#overview)
- [Screenshots](#screenshots)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Project structure](#project-structure)
- [Customisation](#customisation)
- [Deployment](#deployment)
- [Accessibility and performance](#accessibility-and-performance)
- [License](#license)

---

## Overview

Aurelia Health is a single-page marketing site for an imaginary premium clinic. It shows how AIVA approaches healthcare web design: a calm ivory, sage and slate palette, editorial typography, restrained motion, and an optional 3D hero that never gets in the way of accessibility or load time.

All copy and demo data live in one file (`src/data/site.ts`), so the site is easy to retheme or adapt.

## Screenshots

### Hero

<p align="center">
  <img src="public/images/screenshots/Screenshot%202026-09-30%20190559.png" alt="Hero: Care, designed around you" width="900">
</p>

### About and principles

<table>
  <tr>
    <td width="50%"><img src="public/images/screenshots/Screenshot%202026-09-30%20190609.png" alt="About the clinic with Precision, Clarity and Comfort cards"><br><sub><b>About the clinic</b> - Precision, Clarity, Comfort</sub></td>
    <td width="50%"><img src="public/images/screenshots/Screenshot%202026-09-30%20190616.png" alt="Precision in care statement band"><br><sub><b>Statement band</b> - Precision in care, comfort in every detail</sub></td>
  </tr>
</table>

### Specialties

<table>
  <tr>
    <td width="50%"><img src="public/images/screenshots/Screenshot%202026-09-30%20190625.png" alt="Care across six practices"><br><sub><b>Care across six practices</b></sub></td>
    <td width="50%"><img src="public/images/screenshots/Screenshot%202026-09-30%20190633.png" alt="Specialty cards grid"><br><sub><b>Specialty cards</b> - internal medicine, women's health, cardiology, dermatology, preventive care, diagnostics</sub></td>
  </tr>
</table>

### Doctors and patient journey

<table>
  <tr>
    <td width="50%"><img src="public/images/screenshots/Screenshot%202026-09-30%20190648.png" alt="Doctors section with illustrated placeholder portraits"><br><sub><b>Doctors</b> - three fictional clinicians with illustrated placeholders</sub></td>
    <td width="50%"><img src="public/images/screenshots/Screenshot%202026-09-30%20190653.png" alt="Four-stage patient journey"><br><sub><b>Patient journey</b> - Book, Arrive, Consult, Follow up</sub></td>
  </tr>
</table>

### Appointments and technology

<table>
  <tr>
    <td width="50%"><img src="public/images/screenshots/Screenshot%202026-09-30%20190658.png" alt="Appointment request form"><br><sub><b>Appointment form</b> - accessible, demo-only confirmation state</sub></td>
    <td width="50%"><img src="public/images/screenshots/Screenshot%202026-09-30%20190704.png" alt="Technology section"><br><sub><b>Technology</b> - diagnostics, records, monitoring</sub></td>
  </tr>
</table>

### Testimonials and location

<table>
  <tr>
    <td width="50%"><img src="public/images/screenshots/Screenshot%202026-09-30%20190711.png" alt="Demo testimonial cards"><br><sub><b>Feedback</b> - clearly labelled demo entries</sub></td>
    <td width="50%"><img src="public/images/screenshots/Screenshot%202026-09-30%20190717.png" alt="Location, contact details and opening hours with map"><br><sub><b>Visiting</b> - placeholder address, hours and illustrative map</sub></td>
  </tr>
</table>

### Closing call to action and footer

<table>
  <tr>
    <td width="50%"><img src="public/images/screenshots/Screenshot%202026-09-30%20190723.png" alt="Final call to action: Your health, your time, your experience"><br><sub><b>Final CTA</b></sub></td>
    <td width="50%"><img src="public/images/screenshots/Screenshot%202026-09-30%20190726.png" alt="Footer with navigation and contact details"><br><sub><b>Footer</b> - with portfolio disclaimer</sub></td>
  </tr>
</table>

---

## Features

- **12 sections:** navbar, hero, about, specialties, doctors, patient journey, appointments, technology, testimonials, location, final CTA and footer
- **Optional 3D:** React Three Fiber hero and CTA scenes, lazy-loaded, with automatic SVG fallbacks
- **Scroll animation:** GSAP ScrollTrigger reveals, magnetic buttons and card tilt
- **Video-ready:** background film slots with poster fallbacks (no video files ship by default)
- **Single source of content:** every string and demo record lives in `src/data/site.ts`
- **Design tokens:** colours and typography configured in `tailwind.config.js`
- **Accessible by default:** semantic landmarks, skip link, visible focus rings, ARIA-labelled form, reduced-motion support
- **Fully static:** no backend, no environment variables, deploys anywhere

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | React 18, TypeScript |
| Build | Vite 5 |
| Styling | Tailwind CSS 3, PostCSS |
| Animation | GSAP (ScrollTrigger) |
| 3D | React Three Fiber (three.js) |
| Fonts | Google Fonts, with Georgia / system-ui fallbacks |

## Getting started

Requires **Node 18+** (Node 20+ recommended) and npm.

```bash
git clone https://github.com/aiviainnovations-arch/Healthcare-Digital-Platform.git
cd Healthcare-Digital-Platform

npm install      # first run only
npm run dev      # http://localhost:5173
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build into `/dist` |
| `npm run preview` | Serve the built site locally |
| `npm run typecheck` | TypeScript check only, no build |

> The Google Fonts stylesheet loads from `index.html`, so the first run needs an internet connection. Offline, the site falls back to the fonts declared in `tailwind.config.js`.

## Project structure

```text
Healthcare-Digital-Platform/
├── index.html                  # SEO, OpenGraph, font loading
├── package.json
├── tailwind.config.js          # design tokens: colour, type, spacing
├── vite.config.ts              # build + manual chunking
├── postcss.config.js
├── tsconfig.json
├── public/
│   ├── favicon.svg
│   ├── og-image.png            # 1200x630 social preview
│   ├── images/                 # portraits, video posters, screenshots
│   └── videos/                 # drop brand films here (empty by default)
└── src/
    ├── main.tsx                # entry point
    ├── App.tsx                 # section order
    ├── index.css               # CSS variables, base type, focus, reduced motion
    ├── data/site.ts            # ALL copy and demo data
    ├── hooks/                  # useReveal, usePrefersReducedMotion, useMediaQuery, usePointer
    └── components/
        ├── Navbar, Hero, About, Specialties, Doctors, Journey,
        │   Appointment, Technology, Testimonials, Location,
        │   FinalCta, Footer
        ├── ui/                 # MagneticButton, SectionIntro
        ├── three/              # SceneMount, SceneFallback, HeroScene, CtaScene
        └── video/              # VideoBlock (hero, clinic, technology films)
```

## Customisation

**Content.** Edit `src/data/site.ts`: brand name, tagline, nav links, specialties, doctors, journey stages, testimonials, contact block, opening hours and appointment slots. Section order is set in `src/App.tsx`.

**Colours.** Change the `colors` block in `tailwind.config.js`. Copies of the palette also live in `src/index.css` (CSS variables) and the hex constants at the top of `HeroScene.tsx` and `CtaScene.tsx`.

**Images.** Replace files in `public/images/`, keeping filenames (doctor portraits at ~640x800, posters at 1600x900 or 1600x700, social preview at 1200x630). Only use images you have rights to.

**Videos.** Add `.mp4` / `.webm` files (under ~6 MB each) to `public/videos/`, then uncomment the source lines in `src/components/video/VideoBlock.tsx`. Videos are muted, looped, lazy-loaded, paused off-screen and skipped on mobile or under reduced motion.

**Hero: 3D or video.** In `src/data/site.ts`:

```ts
export const heroMedia: '3d' | 'video' = 'video'
```

**Turn 3D off.** In `src/components/three/SceneMount.tsx`:

```ts
export const ENABLE_3D = false
```

Three.js is dynamically imported, so it is never downloaded when disabled. 3D also disables itself below 1024px, under `prefers-reduced-motion`, and until the section is near the viewport.

**Adapting for a real clinic.** Replace every placeholder, remove the portfolio notices in `Hero.tsx`, `Navbar.tsx` and `Footer.tsx`, and connect the appointment form to a real endpoint. Until then, keep the disclaimers.

## Deployment

The build output is a static `dist/` folder, so any static host works.

- **GitHub Pages:** if serving from a subpath, set `base: '/Healthcare-Digital-Platform/'` in `vite.config.ts`, then deploy `dist/`.
- **Vercel:** framework preset Vite, build command `npm run build`, output directory `dist`.
- **Netlify:** build command `npm run build`, publish directory `dist`.
- **Any static server:** serve `dist/` with nginx, Caddy or similar.

Before going live, update the canonical URL and `og:image` path in `index.html` to your real domain.

## Accessibility and performance

- Semantic landmarks, a skip link and a single `h1`
- Keyboard-operable controls with visible focus rings
- Form uses real labels, `aria-invalid`, `aria-describedby` and an `aria-live` confirmation
- Doctor profile toggle uses `aria-expanded` / `aria-controls`
- `prefers-reduced-motion` disables 3D, video, scroll reveals, magnetic buttons and card tilt
- three.js and GSAP are split into separate chunks; three.js never enters the initial bundle
- Lazy-loaded images and videos
- Checked at 1920, 1440, 1280, 1024, 768, 480, 390 and 375 px

## License

Released under the [MIT LICENSE](LICENSE). Third-party libraries (React, GSAP, three.js and others) remain under their own licenses.

---

<div align="center">

Designed and built by **AIVA**. Aurelia Health is a fictional concept.

</div>
