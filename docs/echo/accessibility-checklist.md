# ECHO Accessibility Checklist

Use this checklist before each release. All items must pass before deploying to production.

## Interactive Elements

- [ ] All buttons have visible focus indicators (not just `:focus`, use `:focus-visible`)
- [ ] All links have visible focus indicators
- [ ] Interactive elements are reachable via keyboard Tab order
- [ ] Keyboard navigation works throughout (Tab, Shift+Tab, Enter, Space, Escape)
- [ ] No keyboard traps (user can always Tab away from any element)
- [ ] Custom interactive components use correct ARIA roles (`role="button"` etc.)

## Images and Icons

- [ ] All emoji icons have `aria-hidden="true"` since adjacent labels convey meaning
- [ ] Avatar visual icons have descriptive `aria-label` or screen-reader text
- [ ] No information is conveyed by images alone (text equivalent always present)

## Color Contrast

- [ ] Body text (#1A1A2E on #F9F8F6): passes WCAG AA (≥4.5:1)
- [ ] Secondary text (#4A4A68 on #FFFFFF): passes WCAG AA
- [ ] Button text (white on #0B7B6F): passes WCAG AA
- [ ] Badge text (white on #6B3FA0): passes WCAG AA
- [ ] Crisis button (#C03030 on #FFF0F0): passes WCAG AA for large text
- [ ] No content relies solely on color to convey meaning

## Forms and Labels

- [ ] All form inputs have associated `<label>` elements or `aria-label`
- [ ] Mood slider has accessible label and value readout (`aria-valuetext`)
- [ ] Avatar name input has label
- [ ] Custom response text input has label
- [ ] Required fields are indicated both visually and programmatically (`aria-required`)

## Dynamic Content

- [ ] Crisis alert modal uses `role="alertdialog"` and `aria-live="assertive"`
- [ ] Error boundary error message uses `role="alert"` and `aria-live="assertive"`
- [ ] Toast/status messages use `aria-live="polite"`
- [ ] Session phase changes are announced to screen readers
- [ ] Loading states communicate progress (`aria-busy`, `aria-label`)

## Touch Targets

- [ ] All buttons/links have `min-height: 48px` and `min-width: 48px`
- [ ] Touch targets do not overlap
- [ ] Crisis Help button is prominently sized and easy to tap on mobile
- [ ] Mood rating buttons are at least 48px tall

## Reduced Motion

- [ ] `prefers-reduced-motion: reduce` is respected for avatar animations (pulse, bounce)
- [ ] Breathing exercise animation respects reduced motion preference
- [ ] Page transitions do not cause motion sickness

## Screen Reader Compatibility

- [ ] Tested with VoiceOver (macOS/iOS)
- [ ] Tested with NVDA or JAWS (Windows)
- [ ] Section headings are logically structured (h1 → h2 → h3)
- [ ] Landmark regions are present: `<header>`, `<main>`, `<nav>`, `<footer>`
- [ ] Avatar personality selection reads correctly in screen reader
- [ ] Session dialogue turns are announced in sequence

## Error Messages

- [ ] Validation errors describe what went wrong and how to fix it
- [ ] Error messages are associated with the relevant input via `aria-describedby`
- [ ] Error boundary shows descriptive fallback with actionable options

## Language and Internationalisation

- [ ] `<html lang="en">` / `<html lang="de">` is set correctly per locale
- [ ] All user-facing strings are translated (no untranslated EN strings in DE mode)
- [ ] RTL layout not required (EN/DE are both LTR)
