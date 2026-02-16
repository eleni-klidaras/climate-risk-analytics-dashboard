import data from "../data/transformed_mock_data.json";
import { type FinancialRiskRecord } from "../types/types";

// Simulate API call
export const fetchFinancialData = async (): Promise<FinancialRiskRecord[]> => {
  return data as FinancialRiskRecord[];
};
