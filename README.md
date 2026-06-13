# Frolab — Recreation

A faithful, hand-built recreation of the [Frolab Framer site](https://frolab.framer.website/),
reverse-engineered from the live page: theme, typography, imagery, animations and gestures.

## What's recreated

**Theme** — dark `#121212` canvas, gray text hierarchy, 6 candy accent colors
(coral `#ff8f64`, amber `#ffcc4e`, lime `#b7ff93`, neon green `#00d419`, lavender `#dca8ff`, pink `#f8a7ff`).

**Typography** — Unbounded (display), DM Mono (labels/stats), DM Sans (body).

**Animation** — scroll-into-view reveals (fade / slide-up / slide-left / scale) on the
exact easing pulled from the source: `cubic-bezier(.27, 0, .51, 1)` over `0.7s` with
per-element stagger delays. Animated stat count-up. Infinite logo + testimonial ticker
(seamless loop, GPU-composited via `will-change`).

**Gestures** — signature arrow-rotate-on-hover (→ ↗) on every CTA, award row and project
card; project card image zoom; FAQ accordion with a `+` → `×` chevron rotation; sticky
condensing nav.

**Responsive** — breakpoints mirror the source: 1200 / 810 / 600 px.

## Structure

```
frolab/
├── index.html        # full single-page site
├── styles.css        # theme tokens + animation system
├── script.js         # reveals, ticker, accordion, count-up, nav
└── assets/images/    # 52 assets pulled from the live site
```

## Run

Just open `frolab/index.html` in a browser — no build step.

---

*Study/educational recreation. All imagery © their respective owners.*
