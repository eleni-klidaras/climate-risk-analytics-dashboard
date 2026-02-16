import { type FinancialLineItem, type Timeframe } from "../types/types";

export const COLORS = {
  VIBRANT_GREEN: "#00D08E",
  CYAN: "#1cd6ee",
  FALLBACK: "#888888",
} as const;

export const LINE_ITEMS: FinancialLineItem[] = ["EBIT", "FCFF", "DCF"];

export const TIMEFRAMES: { label: string; value: Timeframe }[] = [
  { label: "Short-term (2025-2027)", value: "short" },
  { label: "Medium-term (2025-2030)", value: "medium" },
  { label: "Long-term (2025-2034)", value: "long" },
];

export const TIMEFRAME_RANGES: Record<
  Timeframe,
  { start: number; end: number }
> = {
  short: { start: 2025, end: 2027 },
  medium: { start: 2025, end: 2030 },
  long: { start: 2025, end: 2034 },
};
