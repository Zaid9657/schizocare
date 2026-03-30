// ─────────────────────────────────────────────────────────────────────────────
// ECHO Avatar Service — localStorage-backed MVP
// Supabase integration ready: swap localStorage calls for supabase.from() calls
// when auth is wired up.
// ─────────────────────────────────────────────────────────────────────────────

import type { Avatar } from "@/types/echo";
import { generateId } from "@/lib/echo/utils";

const STORAGE_KEY = "echo_avatars";
const MAX_AVATARS = 5;

// ── Storage helpers ────────────────────────────────────────────────────────────

function readAll(): Avatar[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Avatar[]) : [];
  } catch {
    return [];
  }
}

function writeAll(avatars: Avatar[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(avatars));
}

// ── Public API ─────────────────────────────────────────────────────────────────

export interface CreateAvatarInput {
  name: string;
  personality: Avatar["personality"];
  gender: Avatar["gender"];
  visualConfig: Avatar["visualConfig"];
  voiceConfig: Avatar["voiceConfig"];
  notesUser?: string | null;
}

export async function createAvatar(
  _userId: string,
  input: CreateAvatarInput
): Promise<Avatar> {
  const existing = readAll();
  if (existing.length >= MAX_AVATARS) {
    throw new Error("Maximum of 5 active avatars reached.");
  }

  const avatar: Avatar = {
    id:          generateId("avatar"),
    visitorId:   "local",
    name:        input.name.trim() || "Unnamed",
    personality: input.personality,
    gender:      input.gender,
    visualConfig: input.visualConfig,
    voiceConfig:  input.voiceConfig,
    isActive:    true,
    createdAt:   new Date().toISOString(),
    lastSeenAt:  null,
    notesUser:   input.notesUser ?? null,
  };

  writeAll([...existing, avatar]);
  return avatar;
}

export async function updateAvatar(
  avatarId: string,
  patch: Partial<Omit<Avatar, "id" | "visitorId" | "createdAt">>
): Promise<Avatar> {
  const all = readAll();
  const idx = all.findIndex((a) => a.id === avatarId);
  if (idx === -1) throw new Error(`Avatar ${avatarId} not found.`);
  const updated = { ...all[idx], ...patch };
  all[idx] = updated;
  writeAll(all);
  return updated;
}

export async function getActiveAvatar(_userId: string): Promise<Avatar | null> {
  const all = readAll();
  return all.find((a) => a.isActive) ?? null;
}

export async function setActiveAvatar(
  _userId: string,
  avatarId: string
): Promise<void> {
  const all = readAll();
  writeAll(all.map((a) => ({ ...a, isActive: a.id === avatarId })));
}

export async function listAvatars(_userId: string): Promise<Avatar[]> {
  return readAll();
}

export async function deleteAvatar(avatarId: string): Promise<void> {
  writeAll(readAll().filter((a) => a.id !== avatarId));
}
