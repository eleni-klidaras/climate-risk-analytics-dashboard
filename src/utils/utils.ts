import { type FinancialRiskRecord, type Timeframe } from "../types/types";
import { TIMEFRAME_RANGES } from "../constants/constants";

export const filterData = (
  data: FinancialRiskRecord[],
  selectedLineItem: string,
  timeframe: Timeframe,
) => {
  const { start, end } = TIMEFRAME_RANGES[timeframe];

  return data.filter(
    (d) =>
      d.financialLineItem === selectedLineItem &&
      d.year >= start &&
      d.year <= end,
  );
};

// Transform data from one pathway per year to one object per year
export const transformToChartData = (filteredData: FinancialRiskRecord[]) => {
  const grouped = filteredData.reduce(
    (acc, curr) => {
      if (!acc[curr.year]) {
        acc[curr.year] = { year: curr.year };
      }

      acc[curr.year][curr.climatePathway] = curr.financialLineItemShock;
      return acc;
    },
    {} as Record<number, Record<string, number>>,
  );

  return Object.values(grouped).sort((a, b) => a.year - b.year);
};
