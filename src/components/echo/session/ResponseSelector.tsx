"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { UserResponseCategory } from "@/lib/echo/content/seed-data";
import { USER_RESPONSES } from "@/lib/echo/content/seed-data";
import {
  getFavoritesSync,
  addFavorite,
  removeFavorite,
  incrementUseCount,
} from "@/lib/echo/responses/favorites-service";
import CustomResponseInput from "./CustomResponseInput";
import ResponseExplanation from "./ResponseExplanation";

// ── Category metadata ─────────────────────────────────────────────────────────

const CATEGORY_META: Record<
  UserResponseCategory,
  { icon: string; labelEn: string; labelDe: string; color: string; hintEn: string; hintDe: string }
> = {
  ASSERTIVE:       { icon: "💪", labelEn: "Assertive",       labelDe: "Selbstbehauptend", color: "#6B3FA0", hintEn: "Stand up for yourself.",             hintDe: "Steh für dich ein." },
  DEFUSION:        { icon: "🧘", labelEn: "Defusion",        labelDe: "Defusion",         color: "#0B7B6F", hintEn: "Step back from the thought.",         hintDe: "Distanziere dich vom Gedanken." },
  CHALLENGE:       { icon: "❓", labelEn: "Challenge",        labelDe: "Hinterfragen",     color: "#9E6D1B", hintEn: "Question the evidence.",              hintDe: "Hinterfrage die Beweise." },
  VALUES:          { icon: "💫", labelEn: "Values",           labelDe: "Werte",            color: "#2E7D50", hintEn: "Reconnect with what matters to you.", hintDe: "Erinnere dich, was dir wichtig ist." },
  SELF_COMPASSION: { icon: "💗", labelEn: "Self-compassion",  labelDe: "Selbstmitgefühl",  color: "#B05080", hintEn: "Treat yourself with kindness.",       hintDe: "Behandle dich mit Güte." },
  BOUNDARY:        { icon: "🛑", labelEn: "Boundary",         labelDe: "Grenze",           color: "#C03030", hintEn: "Choose when to engage.",              hintDe: "Entscheide, wann du engagierst." },
};

// ── Types ─────────────────────────────────────────────────────────────────────

interface SuggestionItem {
  id:       string;
  category: UserResponseCategory;
  textEn:   string;
  textDe:   string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function pickSuggestions(skillFocus: UserResponseCategory | null): SuggestionItem[] {
  const categories: UserResponseCategory[] = [
    "ASSERTIVE", "DEFUSION", "CHALLENGE", "VALUES", "SELF_COMPASSION", "BOUNDARY",
  ];
  const pool = skillFocus
    ? [skillFocus, ...categories.filter((c) => c !== skillFocus)].slice(0, 3)
    : [...categories].sort(() => Math.random() - 0.5).slice(0, 3);

  return pool.map((cat) => {
    const responses = USER_RESPONSES.filter((r) => r.category === cat);
    const r = responses[Math.floor(Math.random() * responses.length)];
    return r ? { id: r.id, category: r.category, textEn: r.textEn, textDe: r.textDe } : null;
  }).filter((r): r is SuggestionItem => r !== null);
}

// ── Translations ──────────────────────────────────────────────────────────────

const EN = {
  selectResponse: "How do you want to respond?",
  sendResponse:   "Send Response",
  writeOwn:       "Write my own response",
  cancelCustom:   "Use a suggested response",
  yourFavorites:  "Your Favorites",
  suggestions:    "Suggestions",
  addFav:         "Add to favorites",
  removeFav:      "Remove from favorites",
  responseAria:   (n: number, total: number, type: string, text: string) =>
    `Response ${n} of ${total}, ${type}: ${text}`,
};
const DE = {
  selectResponse: "Wie möchtest du antworten?",
  sendResponse:   "Antwort senden",
  writeOwn:       "Eigene Antwort schreiben",
  cancelCustom:   "Vorschlag verwenden",
  yourFavorites:  "Deine Favoriten",
  suggestions:    "Vorschläge",
  addFav:         "Zu Favoriten hinzufügen",
  removeFav:      "Aus Favoriten entfernen",
  responseAria:   (n: number, total: number, type: string, text: string) =>
    `Antwort ${n} von ${total}, ${type}: ${text}`,
};

// ── Response Card ─────────────────────────────────────────────────────────────

interface ResponseCardProps {
  item:       SuggestionItem;
  index:      number;
  total:      number;
  selected:   boolean;
  favorited:  boolean;
  locale:     string;
  disabled:   boolean;
  onSelect:   () => void;
  onToggleFav: () => void;
  animDelay:  number;
}

function ResponseCard({
  item, index, total, selected, favorited, locale, disabled,
  onSelect, onToggleFav, animDelay,
}: ResponseCardProps) {
  const meta      = CATEGORY_META[item.category];
  const text      = locale === "de" ? item.textDe : item.textEn;
  const typeLabel = locale === "de" ? meta.labelDe : meta.labelEn;
  const t         = locale === "de" ? DE : EN;

  return (
    <div
      style={{
        position:          "relative",
        opacity:           0,
        animation:         "echoFadeSlideIn 0.2s ease both",
        animationDelay:    `${animDelay}ms`,
        ["--echo-fade-delay" as string]: `${animDelay}ms`,
      }}
    >
      <button
        type="button"
        id={`response-card-${item.id}`}
        role="option"
        aria-selected={selected}
        aria-label={t.responseAria(index + 1, total, typeLabel, text)}
        onClick={onSelect}
        disabled={disabled}
        style={{
          display:         "flex",
          flexDirection:   "column",
          gap:             "6px",
          width:           "100%",
          padding:         "15px 52px 15px 16px",
          minHeight:       "72px",
          borderRadius:    "12px",
          border:          selected ? `2px solid ${meta.color}` : "2px solid #E0DDD7",
          backgroundColor: selected ? "#E8F5EF" : "#FFFFFF",
          cursor:          disabled ? "not-allowed" : "pointer",
          textAlign:       "left",
          fontFamily:      "inherit",
          opacity:         disabled ? 0.6 : 1,
          transition:      "border-color 0.12s ease, background-color 0.12s ease, transform 0.1s ease",
          transform:       selected ? "scale(1.015)" : "scale(1)",
          boxSizing:       "border-box",
          outline:         "none",
        }}
        onFocus={(e)      => { if (!disabled) e.currentTarget.style.boxShadow = `0 0 0 3px ${meta.color}40`; }}
        onBlur={(e)       => { e.currentTarget.style.boxShadow = "none"; }}
        onMouseEnter={(e) => { if (!selected && !disabled) e.currentTarget.style.borderColor = `${meta.color}80`; }}
        onMouseLeave={(e) => { if (!selected) e.currentTarget.style.borderColor = "#E0DDD7"; }}
      >
        {/* Type badge row */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span
            style={{
              display:         "inline-flex",
              alignItems:      "center",
              gap:             "4px",
              padding:         "2px 8px",
              borderRadius:    "10px",
              backgroundColor: `${meta.color}18`,
              color:           meta.color,
              fontSize:        "11px",
              fontWeight:      "bold",
              whiteSpace:      "nowrap",
            }}
            aria-label={`Response type: ${typeLabel}`}
          >
            <span aria-hidden="true">{meta.icon}</span>
            {typeLabel}
          </span>
          {selected && (
            <span
              aria-hidden="true"
              style={{ color: "#2E7D50", fontSize: "14px", fontWeight: "bold", animation: "echoFadeSlideIn 0.1s ease both" }}
            >
              ✓
            </span>
          )}
        </div>

        {/* Response text */}
        <p style={{
          margin:     0,
          fontSize:   "18px",
          color:      selected ? "#1A4A2E" : "#1A1A2E",
          lineHeight: 1.45,
          fontWeight: selected ? "600" : "normal",
        }}>
          {text}
        </p>

        {/* Brief hint */}
        <p style={{ margin: 0, fontSize: "13px", color: "#7A7A96", lineHeight: 1.4 }}>
          {locale === "de" ? meta.hintDe : meta.hintEn}
        </p>
      </button>

      {/* Favorite star */}
      <button
        type="button"
        aria-label={favorited ? t.removeFav : t.addFav}
        onClick={(e) => { e.stopPropagation(); onToggleFav(); }}
        style={{
          position:        "absolute",
          top:             "12px",
          right:           "12px",
          background:      "none",
          border:          "none",
          cursor:          "pointer",
          fontSize:        "18px",
          lineHeight:      1,
          padding:         "4px",
          minWidth:        "32px",
          minHeight:       "32px",
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "center",
          borderRadius:    "6px",
          color:           favorited ? "#C08000" : "#C0B8D0",
          transition:      "color 0.12s ease",
        }}
        onFocus={(e) => { e.currentTarget.style.boxShadow = "0 0 0 2px #6B3FA040"; }}
        onBlur={(e)  => { e.currentTarget.style.boxShadow = "none"; }}
      >
        {favorited ? "★" : "☆"}
      </button>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

interface ResponseSelectorProps {
  onRespond:     (category: UserResponseCategory) => void;
  onRespondText: (text: string) => void;
  locale:        string;
  skillFocus?:   UserResponseCategory | null;
  disabled?:     boolean;
}

export default function ResponseSelector({
  onRespond,
  onRespondText,
  locale,
  skillFocus,
  disabled = false,
}: ResponseSelectorProps) {
  const t = locale === "de" ? DE : EN;

  const [selected, setSelected]       = useState<string | null>(null);
  const [showCustom, setShowCustom]   = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [favExtras, setFavExtras]     = useState<SuggestionItem[]>([]);

  const [suggestions] = useState(() => pickSuggestions(skillFocus ?? null));
  const sendBtnRef    = useRef<HTMLButtonElement>(null);
  const listRef       = useRef<HTMLDivElement>(null);

  // Load favorites on mount
  useEffect(() => {
    const favs = getFavoritesSync();
    setFavoriteIds(new Set(favs.map((f) => f.responseId)));
    // Favorite items not already in suggestions → show in favorites section
    const extras = favs
      .filter((f) => !suggestions.some((s) => s.id === f.responseId))
      .slice(0, 3)
      .map((f) => ({ id: f.responseId, category: f.category, textEn: f.textEn, textDe: f.textDe }));
    setFavExtras(extras);
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-focus send button when something is selected
  useEffect(() => {
    if (selected) sendBtnRef.current?.focus();
  }, [selected]);

  const allCards: SuggestionItem[] = [...favExtras, ...suggestions];

  // Keyboard nav
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (showCustom || disabled) return;
    const ids = allCards.map((c) => c.id);
    const currentIdx = selected ? ids.indexOf(selected) : -1;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected(ids[(currentIdx + 1) % ids.length]);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected(ids[(currentIdx - 1 + ids.length) % ids.length]);
    } else if (e.key === "Enter" && selected && document.activeElement !== sendBtnRef.current) {
      e.preventDefault();
      sendBtnRef.current?.focus();
    }
  }, [selected, showCustom, disabled, allCards]);  // eslint-disable-line react-hooks/exhaustive-deps

  function handleSelectCard(id: string) {
    if (disabled) return;
    setSelected((prev) => (prev === id ? null : id));
  }

  function handleSend() {
    if (!selected || disabled) return;
    const item = allCards.find((c) => c.id === selected);
    if (!item) return;
    if (favoriteIds.has(item.id)) {
      incrementUseCount("local", item.id);
    }
    setSelected(null);
    onRespond(item.category);
  }

  function handleToggleFavorite(item: SuggestionItem) {
    if (favoriteIds.has(item.id)) {
      removeFavorite("local", item.id);
      setFavoriteIds((prev) => { const s = new Set(prev); s.delete(item.id); return s; });
      setFavExtras((prev) => prev.filter((f) => f.id !== item.id));
    } else {
      addFavorite("local", {
        responseId: item.id,
        category:   item.category,
        textEn:     item.textEn,
        textDe:     item.textDe,
      });
      setFavoriteIds((prev) => new Set(prev).add(item.id));
    }
  }

  const hasFavSection = favExtras.length > 0;

  return (
    <div>
      {/* Keyframe injection */}
      <style>{`
        @keyframes echoFadeSlideIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes echoFadeSlideIn {
            from { opacity: 0; }
            to   { opacity: 1; }
          }
        }
      `}</style>

      <div
        style={{
          fontSize:      "12px",
          fontWeight:    "bold",
          color:         "#7A7A96",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom:  "12px",
        }}
      >
        {t.selectResponse}
      </div>

      {!showCustom && (
        <div
          ref={listRef}
          role="listbox"
          aria-label={t.selectResponse}
          aria-activedescendant={selected ? `response-card-${selected}` : undefined}
          tabIndex={selected ? -1 : 0}
          onKeyDown={handleKeyDown}
          style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px", outline: "none" }}
        >
          {hasFavSection && (
            <div
              style={{
                fontSize:      "11px",
                fontWeight:    "bold",
                color:         "#C08000",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom:  "2px",
              }}
            >
              ★ {t.yourFavorites}
            </div>
          )}

          {hasFavSection && favExtras.map((item, i) => (
            <ResponseCard
              key={item.id}
              item={item}
              index={i}
              total={allCards.length}
              selected={selected === item.id}
              favorited={favoriteIds.has(item.id)}
              locale={locale}
              disabled={disabled}
              onSelect={() => handleSelectCard(item.id)}
              onToggleFav={() => handleToggleFavorite(item)}
              animDelay={i * 50}
            />
          ))}

          {hasFavSection && (
            <div
              style={{
                fontSize:      "11px",
                fontWeight:    "bold",
                color:         "#7A7A96",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                margin:        "4px 0 2px 0",
              }}
            >
              {t.suggestions}
            </div>
          )}

          {suggestions.map((item, i) => {
            const cardIdx = favExtras.length + i;
            return (
              <ResponseCard
                key={item.id}
                item={item}
                index={cardIdx}
                total={allCards.length}
                selected={selected === item.id}
                favorited={favoriteIds.has(item.id)}
                locale={locale}
                disabled={disabled}
                onSelect={() => handleSelectCard(item.id)}
                onToggleFav={() => handleToggleFavorite(item)}
                animDelay={cardIdx * 50}
              />
            );
          })}
        </div>
      )}

      {/* Send button — appears after selection */}
      {!showCustom && selected && (
        <button
          ref={sendBtnRef}
          type="button"
          onClick={handleSend}
          disabled={disabled}
          style={{
            width:           "100%",
            padding:         "14px 28px",
            backgroundColor: "#6B3FA0",
            color:           "#FFFFFF",
            border:          "none",
            borderRadius:    "10px",
            fontSize:        "16px",
            fontWeight:      "bold",
            cursor:          disabled ? "not-allowed" : "pointer",
            minHeight:       "52px",
            fontFamily:      "inherit",
            marginBottom:    "12px",
            animation:       "echoFadeSlideIn 0.12s ease both",
            outline:         "none",
          }}
          onFocus={(e) => { e.currentTarget.style.boxShadow = "0 0 0 3px #6B3FA040"; }}
          onBlur={(e)  => { e.currentTarget.style.boxShadow = "none"; }}
        >
          {t.sendResponse}
        </button>
      )}

      {/* Write own / custom toggle */}
      {!showCustom ? (
        <button
          type="button"
          onClick={() => { setShowCustom(true); setSelected(null); }}
          style={{
            background:  "none",
            border:      "none",
            color:       "#6B3FA0",
            fontSize:    "14px",
            fontWeight:  500,
            cursor:      "pointer",
            padding:     "8px 0",
            fontFamily:  "inherit",
          }}
          onFocus={(e) => { e.currentTarget.style.textDecoration = "underline"; }}
          onBlur={(e)  => { e.currentTarget.style.textDecoration = "none"; }}
        >
          ✏️ {t.writeOwn}
        </button>
      ) : (
        <>
          <CustomResponseInput
            onSubmit={(text, category) => {
              if (category) onRespond(category);
              else onRespondText(text);
              setShowCustom(false);
            }}
            locale={locale}
          />
          <button
            type="button"
            onClick={() => setShowCustom(false)}
            style={{
              background:  "none",
              border:      "none",
              color:       "#7A7A96",
              fontSize:    "13px",
              cursor:      "pointer",
              padding:     "8px 0",
              fontFamily:  "inherit",
            }}
          >
            ← {t.cancelCustom}
          </button>
        </>
      )}

      {/* Why this response? expandable help */}
      <ResponseExplanation
        locale={locale}
        highlightCategory={
          selected
            ? (allCards.find((c) => c.id === selected)?.category ?? null)
            : null
        }
      />
    </div>
  );
}
