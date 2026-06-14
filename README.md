# Brittman — Workforce Solutions Website

A multi-page marketing site for **Brittman Utilities &amp; Services Pvt. Ltd.** — an integrated
workforce, payroll, compliance and facility solutions partner for enterprises across India.

> The visual design/layout system is adapted from a third-party template; all written content,
> structure of copy, and brand positioning here are for Brittman.

## Pages

| Page | File | Nav label |
|------|------|-----------|
| Home | `index.html` | — |
| Services | `services.html` | Services |
| Industries | `work.html` | Industries |
| About | `about.html` | About |
| Leadership | `team.html` | Leadership |
| Insights | `blog.html` | Insights |
| Careers | `career.html` | Careers |
| Contact | `contact.html` | Contact |

## Services covered
Temporary staffing · Permanent recruitment · Payroll outsourcing · Compliance management · Facility management.

## Architecture
- `app.js` injects the shared header / fullscreen menu / footer on every page (single source of
  truth) + active-nav state, and wires all interactions (scroll reveals, ticker, accordions,
  count-up, hero video, contact form).
- `styles.css` — theme tokens, animation system, component styles.
- `assets/` — images and the hero showreel video.

## Run
Open any `.html` in a browser — no build step.
