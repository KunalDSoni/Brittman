# Frolab — Study Recreation

A hand-built, multi-page **study recreation** of the [Frolab Framer site](https://frolab.framer.website/),
reverse-engineered from the live page for learning purposes.

> ⚠️ **Not affiliated with Frolab.** This is an educational rebuild. The brand, logos, photos
> and the original site design belong to their respective owners. Body copy here is original/paraphrased,
> not copied from the source. Don't deploy this publicly or use it commercially.

## Pages

| Page | File |
|------|------|
| Home | `index.html` |
| Work | `work.html` |
| Services | `services.html` |
| About | `about.html` |
| Team | `team.html` |
| Blog | `blog.html` |
| Career | `career.html` |
| Contact | `contact.html` |

## What's recreated

**Theme** — light/white canvas, `#121212` text, 6 candy accent colors
(coral `#ff8f64`, amber `#ffcc4e`, lime `#b7ff93`, neon green `#00d419`, lavender `#dca8ff`, pink `#f8a7ff`).

**Typography** — Unbounded (display), DM Mono (labels), DM Sans (body).

**Animation** — scroll-into-view reveals (fade / slide-up / slide-left / scale) on the easing pulled
from the source, `cubic-bezier(.27, 0, .51, 1)` over `0.7s`, with per-element stagger. Animated stat
count-up. Infinite logo ticker and animated testimonial columns (GPU-composited via `will-change`).

**Gestures** — arrow-rotate-on-hover (→ ↗) on CTAs, award rows and project cards; card image zoom;
FAQ + awards accordions with a `+` → `×` rotation; sticky condensing nav; fullscreen menu overlay.

**Interactions** — working contact form (client-side validation + success state), showreel modal,
WhatsApp link, dismissible study badge.

## Architecture

- `app.js` injects a single shared **header / fullscreen menu / footer** on every page (one source of
  truth), sets the active nav state, and wires all interactions.
- `styles.css` holds the theme tokens, animation system and all component styles.
- `assets/images/` — 52 assets pulled from the live site for fidelity.

## Run

Open any `.html` in a browser — no build step. (For the showreel modal and form, just click around.)

---

*Educational recreation only.*
