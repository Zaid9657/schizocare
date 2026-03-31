# ECHO Deployment Checklist

Complete all items before deploying ECHO Phase 1 to production.

## Storage and Data

- [ ] All localStorage keys use consistent `echo_` prefix
  - `echo_sessions`, `echo_avatars`, `echo_user_phase`, `echo_onboarded_at`
  - `echo_onboarding_progress`, `echo_safety_events`, `echo_response_favorites`
  - `echo_context` (in-flight session context)
- [ ] No data stored without `echo_` prefix by ECHO code
- [ ] Storage cap enforced for safety events (max 500 events)
- [ ] Supabase migration files are ready for Phase 2 (can be applied later)

## Environment Variables

- [ ] `NEXT_PUBLIC_ECHO_ENABLED=true` set in production environment
- [ ] `NEXT_PUBLIC_ECHO_COMMUNITY_ENABLED=false` (Phase 2 only — keep disabled)
- [ ] `.env.example` is up to date with all ECHO-related variables
- [ ] No secrets or API keys committed to the repository

## Feature Flag

- [ ] Feature flag (`isEchoEnabled()`) tested with `NEXT_PUBLIC_ECHO_ENABLED=false`
  - Visiting `/echo` should show "Coming Soon" page
  - Navigation badge should not appear
- [ ] Feature flag tested with `NEXT_PUBLIC_ECHO_ENABLED=true` (default behaviour)

## Translations

- [ ] All user-facing strings have EN translations
- [ ] All user-facing strings have DE translations
- [ ] No hardcoded English strings in DE locale paths
- [ ] Crisis resources page shows correct phone numbers for both locales
  - EN: 988 Suicide & Crisis Lifeline, Crisis Text Line (741741)
  - DE: Telefonseelsorge (0800 111 0 111, 0800 111 0 222), online chat

## Safety

- [ ] Crisis keywords list reviewed and verified (EN + DE)
- [ ] Crisis resources phone numbers verified as current and correct
- [ ] Crisis Help button visible and accessible from all session pages
- [ ] Grounding button accessible from session and layout bar
- [ ] Error boundary in place on ECHO layout
- [ ] Safety event logging tested (STRESS_BUTTON, CRISIS_KEYWORD, MOOD_DROP)

## Grounding Tools

- [ ] Box breathing animation works offline (no external resources)
- [ ] 5-4-3-2-1 senses exercise renders correctly on mobile
- [ ] Safe place visualisation loads without errors
- [ ] All grounding exercises accessible without an avatar or session

## Mobile Layout

- [ ] Mobile bottom navigation renders correctly (if present)
- [ ] All touch targets ≥ 48px
- [ ] Crisis Help button visible without scrolling on mobile
- [ ] Avatar creation wizard works on small screens (320px min width)
- [ ] Session dialogue scrolls correctly on mobile

## Accessibility

- [ ] Accessibility checklist passed (see `accessibility-checklist.md`)
- [ ] Crisis alert modal announces correctly to screen readers
- [ ] Keyboard navigation tested end-to-end

## TypeScript and Build

- [ ] `npm run typecheck` passes with zero errors
- [ ] `npm run build` passes (Next.js production build)
- [ ] `npm run test` passes (all Vitest unit + integration tests)
- [ ] `npm run lint` passes with zero errors

## Final Manual Testing

- [ ] New user: redirected to onboarding when visiting `/echo`
- [ ] Complete full 8-step onboarding flow
- [ ] Create avatar with all customisation options
- [ ] Start and complete a session (minimum 3 exchanges)
- [ ] Use stress button mid-session → grounded → resume session
- [ ] End session with win statement
- [ ] Mood improvement displayed in session summary
- [ ] Return to dashboard → stats updated (streak, sessions, mood avg)
- [ ] All grounding exercises work
- [ ] Crisis resources page loads and displays correct numbers
- [ ] German language toggle works throughout entire ECHO flow
- [ ] Feature flag off → "Coming Soon" page shows, no ECHO nav badge
