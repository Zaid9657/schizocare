"use client";

import * as Accordion from "@radix-ui/react-accordion";

interface FaqItemProps {
  question: string;
  answer: string;
  value: string;
}

export function FaqItem({ question, answer, value }: FaqItemProps) {
  return (
    <Accordion.Item value={value} style={{ borderBottom: "1px solid #EEECE8" }}>
      <Accordion.Header>
        <Accordion.Trigger
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            padding: "16px 8px",
            minHeight: "56px",
            textAlign: "left",
            fontWeight: "bold",
            color: "#1A1A2E",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
            fontFamily: "inherit",
          }}
        >
          <span>{question}</span>
          <span
            style={{
              flexShrink: 0,
              width: "32px",
              height: "32px",
              borderRadius: "9999px",
              backgroundColor: "#E8F5F2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0B7B6F",
              fontSize: "12px",
              transition: "transform 0.15s",
            }}
            aria-hidden="true"
          >
            ▼
          </span>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content style={{ overflow: "hidden" }}>
        <p style={{ padding: "0 8px 16px 8px", color: "#4A4A68", lineHeight: 1.7, margin: 0, maxWidth: "65ch" }}>{answer}</p>
      </Accordion.Content>
    </Accordion.Item>
  );
}
