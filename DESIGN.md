# WAZUKA Design System

This document describes the design system for the WAZUKA product showcase website. It covers colors, typography, spacing, components, and animation principles.

## 1. Colors

### Brand palette

| Role | Value | Usage |
|------|-------|-------|
| Base white | `#FFFFFF` | Page backgrounds, cards |
| Light blue-tinted | `#F4F8FF` | Alternating section backgrounds |
| Deep blue (dominant) | `#0B3D91` | Headings, primary buttons, key surfaces |
| Brighter blue | `#1E63D6` | Hover states, highlights |
| Warm red (accent) | `#D62839` | Tiny details only — badges, small underlines |
| Dark navy (text) | `#0B1B33` | Body text instead of pure black |

**Proportion rule:** Approximately 90% white and blue, at most 5% red. Red is never used for large areas or main buttons.

### Full blue scale

- `blue-50` `#F0F5FF` — subtle backgrounds
- `blue-100` `#E0EBFF` — light backgrounds
- `blue-500` `#1E63D6` — hover states
- `blue-700` `#0B3D91` — primary buttons, headings
- `blue-900` `#062352` — darkest blue

## 2. Typography

Maximum 2 font families, both self-hosted via `@fontsource`:

- **Headings:** Plus Jakarta Sans (geometric sans-serif) — used for all headings, confident and modern
- **Body:** Inter (highly readable sans-serif) — used for all body text, captions, UI labels

Body text is never smaller than 16px. Headlines are large and confident on desktop, comfortably readable on mobile.

## 3. Spacing

- Section padding: `px-4 sm:px-6 lg:px-8 py-12 md:py-16`
- Container max-width: `max-w-7xl`
- Gap between grid items: `gap-6 md:gap-8`
- Component padding: cards use `p-5` or `p-8`

## 4. Border radius

- `xl`: 12px — small elements, badges
- `2xl`: 16px — cards, buttons
- `3xl`: 24px — hero slideshow, modal, large containers

## 5. Shadows

- `soft`: `0 4px 20px -4px rgba(11, 27, 51, 0.08)` — subtle elevation
- `card`: `0 8px 32px -8px rgba(11, 27, 51, 0.12)` — hover state on cards

## 6. Component styles

### Buttons

- **Primary:** Blue-700 background, white text, rounded-xl, smooth hover to blue-600 with shadow
- **Outline:** Transparent background, blue-700 border and text, hover fills to blue-700

### Product cards

- White background, rounded-3xl, subtle border, soft shadow
- Hover: lifts slightly (`-translate-y-1`), shadow deepens
- Image area: `object-contain` with padding, never crops products
- Category badge, name, short description, WhatsApp action

### Section headers

- Title: `text-3xl md:text-4xl`, font-bold, navy-900
- Subtitle: `text-lg`, navy-900/70, max-width constrained for readability

## 7. Icons

Emoji-based icons for categories (🥛 Glassware, 🍽️ Ceramics, 🍳 Cookware, 🔌 Appliances, 📦 Storage, 🍴 Utensils). Simple SVG icons for UI actions (arrows, external links, etc.).

## 8. Animation timings

All animations use only `transform` and `opacity` for 60fps performance:

- **Fade in:** 0.5s ease-out
- **Fade in up:** 0.6s ease-out (scroll-reveal)
- **Ken Burns (hero slideshow):** 10s ease-in-out infinite, scale 1.00 → 1.03
- **Slide transitions:** 0.7s ease-in-out cross-fade
- **Card hover:** 0.3s all
- **Button transitions:** 0.2s all
- **Modal open/close:** spring physics, damping 25, stiffness 400
- **Staggered grid:** 0.4s duration per item

## 9. Scroll behavior

- Smooth scrolling enabled on `html`
- Sticky header with blur and shadow after scrolling
- Offset for sticky header when scrolling to sections

## 10. Accessibility

- WCAG AA contrast for all text
- Focus rings: ring-2 ring-blue-500 ring-offset-2
- Skip to content link
- Touch targets minimum 44x44px
- `prefers-reduced-motion` respected (motion reduced or disabled)

## 11. Photo treatment

- Product images use `object-contain` — never cropped or stretched
- Consistent 4:5 or 1:1 aspect ratio in grid with padded background
- Soft tinted background behind each image
- Hero slideshow: blurred enlarged copy as background when photo doesn't fill frame
- Lazy loading for all images below first screen
- Responsive `srcset` for performance
