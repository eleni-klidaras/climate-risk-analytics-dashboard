export type RawFinancialRiskRow = {
  climate_pathway: string;
  financial_line_item: string;
  year: string;
  financial_line_item_shock: string;
};

export type FinancialRiskRecord = {
  climatePathway: string;
  financialLineItem: FinancialLineItem;
  year: number;
  financialLineItemShock: number;
};

export type FinancialLineItem = "EBIT" | "FCFF" | "DCF";

export type Timeframe = "short" | "medium" | "long";

export const TIMEFRAME_RANGES: Record<
  Timeframe,
  { start: number; end: number }
> = {
  short: { start: 2025, end: 2027 },
  medium: { start: 2025, end: 2030 },
  long: { start: 2025, end: 2034 },
};
