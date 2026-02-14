import { type FinancialRiskRecord } from "../types/types";

export const filterByLineItem = (
  data: FinancialRiskRecord[],
  lineItem: string,
) => {
  return data.filter((d) => d.financialLineItem === lineItem);
};
