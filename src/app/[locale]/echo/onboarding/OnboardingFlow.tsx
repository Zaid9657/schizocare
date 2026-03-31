"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOnboarding, TOTAL_STEPS } from "@/hooks/echo/useOnboarding";
import OnboardingLayout from "@/components/echo/onboarding/OnboardingLayout";
import StepWelcome from "@/components/echo/onboarding/StepWelcome";
import StepExpectations from "@/components/echo/onboarding/StepExpectations";
import StepSafety from "@/components/echo/onboarding/StepSafety";
import StepAboutVoice from "@/components/echo/onboarding/StepAboutVoice";
import StepReadiness from "@/components/echo/onboarding/StepReadiness";
import StepFirstSession from "@/components/echo/onboarding/StepFirstSession";
import StepCelebration from "@/components/echo/onboarding/StepCelebration";

interface OnboardingFlowProps {
  locale: string;
}

export default function OnboardingFlow({ locale }: OnboardingFlowProps) {
  const router = useRouter();
  const {
    currentStep,
    avatarCreated,
    firstSessionDone,
    goToStep,
    nextStep,
    prevStep,
    skipToGrounding,
    completeOnboarding,
  } = useOnboarding();

  // Step 6 is the avatar creation redirect — handle it here
  useEffect(() => {
    if (currentStep === 6) {
      router.push(`/${locale}/echo/avatar/create?onboarding=true`);
    }
  }, [currentStep, locale, router]);

  // Step 7 = first session redirect
  useEffect(() => {
    if (currentStep === 7 && avatarCreated) {
      // Only redirect if they haven't done the session yet
      // (allow re-visiting step 7 without re-redirecting)
    }
  }, [currentStep, avatarCreated]);

  function handleStartSession() {
    router.push(`/${locale}/echo/session/new?onboarding=true&guided=true`);
  }

  // Steps that own their own CTA buttons (no bottom nav)
  const selfContainedSteps = new Set([1, 4, 5, 8]);

  // Steps where Back is not shown
  const noBackSteps = new Set([1, 8]);

  if (currentStep === 6) {
    // Redirecting to avatar create — show nothing
    return (
      <div style={{ textAlign: "center", paddingTop: "40px", color: "#7A7A96", fontSize: "16px" }}>
        {locale === "de" ? "Weiterleitung…" : "Redirecting…"}
      </div>
    );
  }

  return (
    <OnboardingLayout
      step={currentStep}
      locale={locale}
      onNext={selfContainedSteps.has(currentStep) ? undefined : nextStep}
      onBack={noBackSteps.has(currentStep) || currentStep === 1 ? undefined : prevStep}
      onSkip={() => skipToGrounding(locale)}
      hideNav={selfContainedSteps.has(currentStep)}
    >
      {currentStep === 1 && (
        <StepWelcome locale={locale} onNext={nextStep} />
      )}

      {currentStep === 2 && (
        <StepExpectations locale={locale} />
      )}

      {currentStep === 3 && (
        <StepSafety locale={locale} />
      )}

      {currentStep === 4 && (
        <StepAboutVoice locale={locale} onNext={nextStep} />
      )}

      {currentStep === 5 && (
        <StepReadiness
          locale={locale}
          onCreateAvatar={() => goToStep(6)}
          onGroundingFirst={() => skipToGrounding(locale)}
        />
      )}

      {/* Step 6 handled by redirect effect above */}

      {currentStep === 7 && (
        <StepFirstSession
          locale={locale}
          avatarCreated={avatarCreated}
          onStart={handleStartSession}
        />
      )}

      {currentStep === 8 && (
        <StepCelebration
          locale={locale}
          avatarCreated={avatarCreated}
          firstSessionDone={firstSessionDone}
          onComplete={() => completeOnboarding(locale)}
        />
      )}
    </OnboardingLayout>
  );
}
