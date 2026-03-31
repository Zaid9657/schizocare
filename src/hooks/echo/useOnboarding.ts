"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  isOnboarded,
  markOnboarded,
  getOnboardingProgress,
  saveOnboardingProgress,
} from "@/lib/echo/onboarding/onboarding-service";

export const TOTAL_STEPS = 8;

export interface UseOnboardingReturn {
  currentStep:        number;
  isOnboarded:        boolean;
  avatarCreated:      boolean;
  firstSessionDone:   boolean;
  goToStep:           (n: number) => void;
  nextStep:           () => void;
  prevStep:           () => void;
  skipToGrounding:    (locale: string) => void;
  completeOnboarding: (locale: string) => void;
  markAvatarCreated:  () => void;
  markFirstSession:   () => void;
}

export function useOnboarding(): UseOnboardingReturn {
  const router = useRouter();

  const [currentStep, setCurrentStep]         = useState(1);
  const [onboarded, setOnboarded]             = useState(false);
  const [avatarCreated, setAvatarCreated]     = useState(false);
  const [firstSessionDone, setFirstSessionDone] = useState(false);

  // Load persisted progress on mount
  useEffect(() => {
    setOnboarded(isOnboarded("local"));
    const p = getOnboardingProgress("local");
    setCurrentStep(p.step);
    setAvatarCreated(p.avatarCreated);
    setFirstSessionDone(p.firstSessionDone);
  }, []);

  const persist = useCallback((patch: Partial<{ step: number; avatarCreated: boolean; firstSessionDone: boolean }>) => {
    saveOnboardingProgress("local", patch);
  }, []);

  const goToStep = useCallback((n: number) => {
    const clamped = Math.max(1, Math.min(TOTAL_STEPS, n));
    setCurrentStep(clamped);
    persist({ step: clamped });
  }, [persist]);

  const nextStep = useCallback(() => {
    setCurrentStep((s) => {
      const next = Math.min(TOTAL_STEPS, s + 1);
      persist({ step: next });
      return next;
    });
  }, [persist]);

  const prevStep = useCallback(() => {
    setCurrentStep((s) => {
      const prev = Math.max(1, s - 1);
      persist({ step: prev });
      return prev;
    });
  }, [persist]);

  const skipToGrounding = useCallback((locale: string) => {
    router.push(`/${locale}/echo/grounding`);
  }, [router]);

  const completeOnboarding = useCallback((locale: string) => {
    markOnboarded("local");
    setOnboarded(true);
    router.push(`/${locale}/echo`);
  }, [router]);

  const markAvatarCreated = useCallback(() => {
    setAvatarCreated(true);
    persist({ avatarCreated: true });
  }, [persist]);

  const markFirstSession = useCallback(() => {
    setFirstSessionDone(true);
    persist({ firstSessionDone: true });
  }, [persist]);

  return {
    currentStep,
    isOnboarded:        onboarded,
    avatarCreated,
    firstSessionDone,
    goToStep,
    nextStep,
    prevStep,
    skipToGrounding,
    completeOnboarding,
    markAvatarCreated,
    markFirstSession,
  };
}
