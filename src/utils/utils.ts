import {
  type FinancialRiskRecord,
  type Timeframe,
  TIMEFRAME_RANGES,
} from "../types/types";

export const filterData = (
  data: FinancialRiskRecord[],
  selectedMetric: string,
  timeframe: Timeframe,
) => {
  const { start, end } = TIMEFRAME_RANGES[timeframe];

  return data.filter(
    (d) =>
      d.financialLineItem === selectedMetric &&
      d.year >= start &&
      d.year <= end,
  );
};

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
