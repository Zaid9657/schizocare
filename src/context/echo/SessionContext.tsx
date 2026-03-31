"use client";

// ─────────────────────────────────────────────────────────────────────────────
// ECHO SessionContext
// Single source of truth for an active dialogue session.
// Wraps the dialogue engine functions and owns phase transitions.
// ─────────────────────────────────────────────────────────────────────────────

import React, { createContext, useCallback, useReducer } from "react";
import type { Avatar, AvatarTurn, SessionSummary } from "@/types/echo";
import type { EngineContext } from "@/lib/echo/dialogue/context-manager";
import type { UserResponseCategory } from "@/lib/echo/content/seed-data";
import {
  startSession as engineStart,
  processResponse as engineProcess,
  endSession as engineEnd,
} from "@/lib/echo/dialogue/dialogue-engine";

// ── Session phases ────────────────────────────────────────────────────────────

export type SessionPhase =
  | "check-in"       // mood-before + "I'm ready"
  | "dialogue"       // exchanges with avatar
  | "win-statement"  // pick a win statement
  | "summary"        // post-session mood + reflection
  | "aborted";       // user left early

// ── State ─────────────────────────────────────────────────────────────────────

export interface SessionState {
  phase:               SessionPhase;
  avatar:              Avatar | null;
  locale:              string;
  engineCtx:           EngineContext | null;
  moodBefore:          number;
  moodAfter:           number;
  /** Current avatar statement text shown in dialogue phase */
  currentStatementText: string;
  currentStatementId:   string;
  /** Latest reaction from the engine (after user responds) */
  lastTurn:            AvatarTurn | null;
  /** True when avatar is "speaking" (animation cue for AvatarPreview) */
  isSpeaking:          boolean;
  /** Non-blocking break reminder */
  showBreakReminder:   boolean;
  /** Final summary after endSession() */
  summary:             SessionSummary | null;
}

const DEFAULT_STATE: SessionState = {
  phase:               "check-in",
  avatar:              null,
  locale:              "en",
  engineCtx:           null,
  moodBefore:          5,
  moodAfter:           5,
  currentStatementText: "",
  currentStatementId:   "",
  lastTurn:            null,
  isSpeaking:          false,
  showBreakReminder:   false,
  summary:             null,
};

// ── Actions ───────────────────────────────────────────────────────────────────

type Action =
  | { type: "INIT";        avatar: Avatar; locale: string }
  | { type: "SET_MOOD_BEFORE"; score: number }
  | { type: "SESSION_STARTED"; ctx: EngineContext; statementText: string; statementId: string }
  | { type: "SPEAKING_START" }
  | { type: "SPEAKING_END" }
  | { type: "TURN_RESULT"; ctx: EngineContext; turn: AvatarTurn }
  | { type: "SHOW_BREAK_REMINDER" }
  | { type: "DISMISS_BREAK_REMINDER" }
  | { type: "GO_WIN_STATEMENT" }
  | { type: "SET_MOOD_AFTER"; score: number }
  | { type: "SESSION_ENDED"; summary: SessionSummary }
  | { type: "ABORT" };

function reducer(state: SessionState, action: Action): SessionState {
  switch (action.type) {
    case "INIT":
      return { ...DEFAULT_STATE, avatar: action.avatar, locale: action.locale, phase: "check-in" };
    case "SET_MOOD_BEFORE":
      return { ...state, moodBefore: action.score };
    case "SESSION_STARTED":
      return {
        ...state,
        phase:               "dialogue",
        engineCtx:           action.ctx,
        currentStatementText: action.statementText,
        currentStatementId:   action.statementId,
        isSpeaking:          true,
      };
    case "SPEAKING_START":
      return { ...state, isSpeaking: true };
    case "SPEAKING_END":
      return { ...state, isSpeaking: false };
    case "TURN_RESULT": {
      const next = action.turn;
      return {
        ...state,
        engineCtx:           action.ctx,
        lastTurn:            next,
        currentStatementText: next.nextStatementText ?? state.currentStatementText,
        currentStatementId:   next.nextStatementId   ?? state.currentStatementId,
      };
    }
    case "SHOW_BREAK_REMINDER":
      return { ...state, showBreakReminder: true };
    case "DISMISS_BREAK_REMINDER":
      return { ...state, showBreakReminder: false };
    case "GO_WIN_STATEMENT":
      return { ...state, phase: "win-statement", isSpeaking: false };
    case "SET_MOOD_AFTER":
      return { ...state, moodAfter: action.score };
    case "SESSION_ENDED":
      return { ...state, phase: "summary", summary: action.summary };
    case "ABORT":
      return { ...state, phase: "aborted" };
    default:
      return state;
  }
}

// ── Context value ─────────────────────────────────────────────────────────────

export interface SessionContextValue {
  state: SessionState;
  /** Call once when the page mounts with the chosen avatar */
  init: (avatar: Avatar, locale: string) => void;
  setMoodBefore: (score: number) => void;
  /** Fires the engine startSession and transitions to dialogue phase */
  beginSession: () => void;
  /** Submit a preset response category */
  respond: (category: UserResponseCategory) => void;
  /** Submit free-text response (engine will classify it) */
  respondText: (text: string) => void;
  /** User dismisses the break reminder */
  dismissBreak: () => void;
  /** Advance to win-statement phase */
  goToWinStatement: () => void;
  setSpeaking: (v: boolean) => void;
  setMoodAfter: (score: number) => void;
  /** Complete the session after win statement is shown */
  finishSession: () => void;
  abort: () => void;
}

export const SessionContext = createContext<SessionContextValue | null>(null);

// ── Provider ──────────────────────────────────────────────────────────────────

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);

  const init = useCallback((avatar: Avatar, locale: string) => {
    dispatch({ type: "INIT", avatar, locale });
  }, []);

  const setMoodBefore = useCallback((score: number) => {
    dispatch({ type: "SET_MOOD_BEFORE", score });
  }, []);

  const beginSession = useCallback(() => {
    if (!state.avatar) return;
    const result = engineStart({
      avatarId:          state.avatar.id,
      avatarPersonality: state.avatar.personality,
      locale:            state.locale,
    });
    dispatch({
      type:          "SESSION_STARTED",
      ctx:           result.context,
      statementText: result.openingStatementText,
      statementId:   result.openingStatementId,
    });
  }, [state.avatar, state.locale]);

  const _processResponse = useCallback(
    (opts: { responseCategory?: UserResponseCategory; responseText?: string }) => {
      if (!state.engineCtx) return;
      const result = engineProcess({ ctx: state.engineCtx, ...opts });
      dispatch({ type: "TURN_RESULT", ctx: result.context, turn: result.turn });
      if (result.suggestBreak) dispatch({ type: "SHOW_BREAK_REMINDER" });
      if (result.routeToGrounding) {
        // Grounding redirect handled by useSession consumer
        dispatch({ type: "ABORT" });
      }
    },
    [state.engineCtx]
  );

  const respond = useCallback(
    (category: UserResponseCategory) => _processResponse({ responseCategory: category }),
    [_processResponse]
  );

  const respondText = useCallback(
    (text: string) => _processResponse({ responseText: text }),
    [_processResponse]
  );

  const dismissBreak = useCallback(() => {
    dispatch({ type: "DISMISS_BREAK_REMINDER" });
  }, []);

  const goToWinStatement = useCallback(() => {
    dispatch({ type: "GO_WIN_STATEMENT" });
  }, []);

  const setSpeaking = useCallback((v: boolean) => {
    dispatch({ type: v ? "SPEAKING_START" : "SPEAKING_END" });
  }, []);

  const setMoodAfter = useCallback((score: number) => {
    dispatch({ type: "SET_MOOD_AFTER", score });
  }, []);

  const finishSession = useCallback(() => {
    if (!state.engineCtx) return;
    const summary = engineEnd({
      ctx:        state.engineCtx,
      moodBefore: state.moodBefore,
      moodAfter:  state.moodAfter,
    });
    dispatch({ type: "SESSION_ENDED", summary });
  }, [state.engineCtx, state.moodBefore, state.moodAfter]);

  const abort = useCallback(() => {
    dispatch({ type: "ABORT" });
  }, []);

  const value: SessionContextValue = {
    state,
    init,
    setMoodBefore,
    beginSession,
    respond,
    respondText,
    dismissBreak,
    goToWinStatement,
    setSpeaking,
    setMoodAfter,
    finishSession,
    abort,
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
}
