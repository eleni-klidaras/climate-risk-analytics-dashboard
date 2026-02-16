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

export type PathwayConfig = {
  key: string;
  color: string;
  severity: number;
};
