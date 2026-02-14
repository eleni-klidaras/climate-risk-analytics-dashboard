export type RawFinancialRiskRow = {
  climate_pathway: string;
  financial_line_item: string;
  year: string;
  financial_line_item_shock: string;
};

export type FinancialRiskRecord = {
  climatePathway: string;
  financialLineItem: string;
  year: number;
  financialLineItemShock: number;
};
