// ─────────────────────────────────────────────────────────────────────────────
// ECHO Dialogue Engine — barrel export
// ─────────────────────────────────────────────────────────────────────────────

export { classifyResponse }                       from "./response-classifier";
export type { ClassifyResult }                    from "./response-classifier";

export { selectHostileStatement, selectReaction, selectWinStatement }
                                                  from "./content-selector";

export {
  createContext, saveContext, loadContext, clearContext,
  incrementExchange, recordStatementUsed, recordReactionUsed,
  recordDistressSignal, recordWinStatementUsed,
}                                                 from "./context-manager";
export type { EngineContext }                     from "./context-manager";

export {
  canEndSession, shouldSuggestBreak, shouldAutoGround,
  buildSession, buildSummary, persistSession, loadPersistedSessions,
  completedSessionCount,
  MIN_EXCHANGES_TO_END, BREAK_SUGGESTION_THRESHOLD, MAX_DISTRESS_SIGNALS,
}                                                 from "./session-controller";
export type { SessionSummary as ControllerSessionSummary } from "./session-controller";

export { getUserPhase, checkPhaseAdvancement, refreshPhase } from "./phase-manager";

export {
  startSession, processResponse, endSession,
}                                                 from "./dialogue-engine";
export type {
  StartSessionOptions, StartSessionResult,
  ProcessResponseOptions, ProcessResponseResult,
  EndSessionOptions,
}                                                 from "./dialogue-engine";
