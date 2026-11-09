# Wazuka Motion Design Specification

## Brand Overview
Wazuka is a premium, modern kitchenware brand communicating quality, elegance, reliability, and contemporary living. The website should feel sophisticated, minimal, and spacious.

## Visual Identity
- **Primary background:** White
- **Primary brand colour:** Blue (`#0B3D91`)
- **Secondary colour:** Soft blue
- **Accent colour:** Red, used sparingly for highlights/promotions
- **Typography:** Clean, modern, elegant - Plus Jakarta Sans
- **Overall aesthetic:** Premium, minimal, sophisticated, spacious

## Motion Design Principles

### Core Principles
1. **Elegance over excitement** - Animations should complement, never distract
2. **Subtlety is key** - Prefer ease-out curves over aggressive transitions
3. **Performance-first** - Animations must be GPU-accelerated and lightweight
4. **Purpose-driven** - Every motion serves a communicative purpose
5. **Respect brand tone** - Blue-dominant, red-accented, no generic kitchen clichés

### Typography Animations

#### Hero Headings
- Reveal line by line using `clip-path` or `background-clip: text`
- Delay between lines: 100-150ms
- Use `text-` utilities from Tailwind with blue color
- Example: WAZUKA heading reveals each letter/subsequent line progressively

#### Supporting Text
- Reveal progressively with `opacity` + `transform` 
- Stagger children by 50ms
- Start from `scale-95` to `scale-100`
- Use `transition-all duration-700 ease-out`

#### Promotional Statements
- Scroll-linked highlighting with `scroll-trigger` effects
- Elements fade in as they enter viewport
- Use `IntersectionObserver` for scroll-based reveals

#### Product Descriptions
- Enter with subtle staggered animations
- Sequence: image first, then text in waves
- Use `translate-y-2` → `translate-y-0` + `opacity-0` to `opacity-1`
- Delay: 75ms between each product in a row

#### Section Headings
- Elegant masked text reveals
- Use `mask-image` with `linear-gradient` reveal
- Or `clip-path` animated from top to bottom
- Blue color only, no red accents in typography reveals

### Product Interactions

#### Product Images
- Enter with subtle scale + opacity
- From `scale-95 opacity-0` to `scale-100 opacity-1`
- Duration: 600ms, ease-out

#### Product Cards
- Hover interactions: slight lift + shadow
- `transform: translate-y-[-4px]` on hover
- Duration: 200ms, ease-out
- No scaling up to avoid "cheap" feel

#### Product Information
- Appears in coordinated sequence
- First: image
- Then: title (100ms later)
- Then: price/features (100ms after title)
- Use `transition-all duration-500 ease-out`

#### Shopping Buttons
- Subtle hover: background opacity change
- Press feedback: scale 0.98 briefly
- Red accent allowed for CTA buttons
- `hover:text-blue-700` + `hover:bg-red-50` (very subtle)

#### Category Sections
- Transition naturally while scrolling
- Parallax subtlety on image sections
- Use `transform: translateZ(0)` for GPU acceleration
- Duration: 800ms, ease-out on scroll

## Animation Curve Specifications

### Recommended Curves
- **Ease-out:** `cubic-bezier(0, 0, 0.2, 1)` - natural deceleration
- **Ease-in-out:** `cubic-bezier(0.4, 0, 0.2, 1)` - balanced
- **Never use:** `linear`, `ease-in`, aggressive bouncing curves

### Duration Guidelines
- **Subtle enters:** 400-600ms
- **Medium transitions:** 600-800ms
- **Scroll-linked:** 800-1000ms (driven by scroll, not fixed time)
- **Button feedback:** 150-200ms

## Color Usage in Motion

### Blue (`#0B3D91`)
- Dominant color for all typography animations
- Used in text color, hover states, active states
- Consistent across all motion elements

### Soft Blue
- Background overlays, subtle gradients
- `bg-blue-50` / `bg-navy-900/5` for header variants

### Red (`#D62839`)
- **Reserved** for:
  - CTA button backgrounds (on hover/press)
  - Important promotional badges
  - Occasional highlight accents
- **Never use** for typography reveals or general motion
- Maximum 5-10% of visual motion elements

### Forbidden Colors
- No generic kitchen-themed browns, greens, or wood tones
- No rainbow gradients or flashy color transitions
- No unrelated accent colors

## Mobile Responsiveness

### Touch Considerations
- Minimum touch target: 44px high for interactive elements
- Reduced motion preference respect
- Simplified animations on mobile (duration -20%)

### Mobile-Specific Animations
- Header logo: simpler fade-in, no scale hover
- Product cards: vertical swipe navigation instead of complex hover
- Section reveals: simpler opacity-based, no mask effects

## Performance Guidelines

### GPU Acceleration
- Always animate `transform` and `opacity` when possible
- Avoid animating `width`, `height`, `margin`, `padding`
- Use `will-change` sparingly (only during active animation)

### Reduced Motion
- Respect `prefers-reduced-motion` media query
- Fallback to instant styles or very subtle fade
- No physics-based animations or complex sequences

### Browser Compatibility
- Test on Chrome, Safari, Firefox
- No CSS features requiring polyfills
- Focus on modern browsers supporting IntersectionObserver

## Section-by-Section Motion Plan

### Header
- Logo: fade-in on load, scale on hover (small: 10%)
- Nav links: staggered fade-in 100ms apart
- Scroll progress bar: width animation on scroll
- Background: bg-white/90 ↔ bg-transparent on scroll

### Hero Section
- Main heading: line-by-line reveal
- Subheading: progressive opacity + translate
- CTA button: subtle scale hover, red accent
- Background: minimal, spacious

### Products Grid
- Cards enter from bottom in rows
- Stagger: 75ms between cards, 150ms between rows
- Hover: translate-y-2 only, no scale
- Image: subtle fade + scale on hover (max 10%)

### About Section
- Heading: masked text reveal
- Description: staggered fade
- Image: subtle parallax on scroll (10px max)

### Contact Section
- Form inputs: focus + subtle border animation
- Info text: progressive reveal
- Social links: gentle hover scale

### Footer
- Links: fade-in bottom-up
- Copyright: simple center alignment
- No animations beyond subtle fades

## Implementation Notes

### Tailwind Classes Pattern
```tsx
// Typography reveal
<h1 className="hidden reveal-line">WAZUKA</h1>

// Product card enter
<div className="group/transition-all/duration-500 ease-out">...</button>

// Button press feedback
<button className="transition-transform duration-150 group-hover:scale-98">...</button>
```

### React IntersectionObserver Pattern
```jsx
const revealOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const handleReveal = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "reveal 600ms ease-out forwards";
    }
  });
};
```

### Keyframe Examples
```css
@keyframes reveal {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keymas fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
```