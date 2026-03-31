# ECHO — Voice Dialogue Feature

ECHO is a structured voice-dialogue tool embedded in SchizoCare. It allows users to practise responding to critical internal voices using evidence-based techniques (ACT defusion, self-compassion, assertiveness). All content is pre-authored and deterministic — ECHO never generates text dynamically.

---

## Feature Overview

- **Onboarding** (8-step wizard) — introduces the feature, sets expectations, prompts avatar creation and a first session
- **Avatar system** — users create a named "inner voice" with a visual style, personality, and voice settings
- **Dialogue sessions** — structured exchanges: avatar delivers a hostile statement → user picks or types a response → avatar reacts → repeat
- **Safety system** — crisis keyword detection, stress button, mood-drop detection, extended-session alerts
- **Grounding tools** — box breathing, 5-4-3-2-1 senses, safe place visualisation (accessible offline)
- **Dashboard** — streak, session count, average mood improvement, recent activity
- **Favorites** — users can save responses they found helpful

---

## Architecture

```
src/
  app/[locale]/echo/          # Next.js route tree
    layout.tsx                # ECHO shell (top bar, error boundary)
    page.tsx                  # Home / dashboard (guards onboarding)
    onboarding/               # 8-step onboarding wizard
    avatar/create/            # Avatar creation wizard
    session/                  # Active session (dialogue + check-in)
    grounding/                # Grounding tools hub
    crisis/                   # Crisis resources page

  lib/echo/                   # Pure business logic (no React)
    dialogue/
      dialogue-engine.ts      # Public API: startSession, processResponse, endSession
      content-selector.ts     # Picks statements/reactions from seed library
      context-manager.ts      # Session context (in-memory + localStorage)
      response-classifier.ts  # Keyword-based free-text → category
      session-controller.ts   # Lifecycle rules, session persistence
      phase-manager.ts        # EARLY → MIDDLE → LATE phase progression
    content/
      seed-data.ts            # All hostile statements, reactions, win statements
      response-matrix.ts      # Maps user response category → valid reaction types
    safety/
      crisis-keywords.ts      # EN + DE keyword list + checkForCrisis()
      crisis-resources.ts     # Phone numbers and links per locale
      safety-service.ts       # logSafetyEvent, getSafetyEvents, checkDistressLevel
    avatar/
      avatar-service.ts       # CRUD for avatars in localStorage
    responses/
      favorites-service.ts    # Save/remove/count favorite responses
    onboarding/
      onboarding-service.ts   # isOnboarded, progress tracking
    home/
      dashboard-service.ts    # Aggregates stats for the dashboard
    analytics.ts              # trackEvent stubs (Plausible/Posthog-ready)
    feature-flags.ts          # isEchoEnabled, isEchoCommunityEnabled

  components/echo/            # React components
    EchoErrorBoundary.tsx     # Class component error boundary
    AvatarCard.tsx
    AvatarCreateWizard.tsx
    ActiveSession.tsx
    NewSessionSetup.tsx
    ResponseSelector.tsx
    CustomResponseInput.tsx
    ResponseExplanation.tsx
    StressButton.tsx
    EchoProgressBar.tsx
    (grounding/...)
    (onboarding steps/...)
```

---

## Key Design Decisions

**No LLM / no generative AI.** All content is pre-authored. This ensures clinical safety, predictability, and offline capability.

**localStorage-first, Supabase-ready.** Every service function accepts a `userId` parameter and documents the Supabase swap point. Migrating to persistent cloud storage is a 1:1 function replacement with no UI changes.

**Safety-first routing.** The Crisis Help button is visible at all times within the ECHO layout. The grounding page requires no avatar or session. Crisis detection runs on every user input.

**Deterministic phase progression.** Users advance from EARLY → MIDDLE → LATE based on completed session count (3 and 6 respectively). Phases never regress. This controls reaction intensity and content variety.

---

## Running Locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000/en/echo`.

To test with ECHO disabled:

```bash
NEXT_PUBLIC_ECHO_ENABLED=false npm run dev
```

---

## Running Tests

```bash
npm run test           # Run all tests once
npm run test:watch     # Watch mode
```

Tests are in `tests/echo/` and use Vitest with Node environment (no browser required). All tests operate on in-memory localStorage mocks.

### Test files

| File | What it covers |
|------|----------------|
| `test-utils.ts` | Shared mocks and factory helpers |
| `dialogue-engine.test.ts` | Context creation, exchange rules, content selection |
| `response-classifier.test.ts` | Keyword classification, confidence levels |
| `safety-system.test.ts` | Crisis detection, distress levels, event logging |
| `favorites-service.test.ts` | Add/remove/increment favorites |
| `integration/session-flow.test.ts` | Complete session lifecycle |
| `integration/onboarding-flow.test.ts` | Onboarding state machine |

---

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_ECHO_ENABLED` | `true` | Enable the ECHO feature |
| `NEXT_PUBLIC_ECHO_COMMUNITY_ENABLED` | `false` | Enable Phase 2 community feed |

See `.env.example` for the full list.

---

## Future Roadmap (Phase 2)

- **Supabase persistence** — sync sessions, avatars, and favorites across devices
- **Community feed** — anonymised "what helped me" posts from other users
- **Therapist view** — optional sharing of session summaries with a support person
- **Audio TTS** — avatar voices using Web Speech API or ElevenLabs
- **More personalities** — expand beyond `critical` (perfectionist, catastrophiser, etc.)
- **Analytics** — connect `trackEvent` stubs to Plausible or Posthog
- **Push reminders** — opt-in daily check-in notifications
