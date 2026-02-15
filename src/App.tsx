import "./App.css";
import { useEffect, useState, useMemo } from "react";
import { fetchFinancialData } from "./services/fetchFinancialRiskData";
import {
  type FinancialRiskRecord,
  type FinancialLineItem,
  type Timeframe,
} from "./types/types";
import Header from "./components/Header";
import FilterPanel from "./components/FilterPanel";
import Graph from "./components/Graph";
import { filterData, transformToChartData } from "./utils/utils";

export default function App() {
  const [data, setData] = useState<FinancialRiskRecord[] | null>(null);
  const [selectedLineItem, setSelectedLineItem] =
    useState<FinancialLineItem>("EBIT");
  const [selectedTimeframe, setSelectedTimeframe] =
    useState<Timeframe>("short");

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedData: FinancialRiskRecord[] = await fetchFinancialData();
        if (fetchedData.length) setData(fetchedData);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    }
    fetchData();
  }, []);

  const yDomain = useMemo<[number, number] | undefined>(() => {
    if (!data) return;
    const shocks = data.map((d) => d.financialLineItemShock);
    return [Math.min(...shocks), Math.max(...shocks)];
  }, [data]);

  const chartData = useMemo(() => {
    if (!data) return;
    const filteredData = filterData(data, selectedLineItem, selectedTimeframe);
    return transformToChartData(filteredData);
  }, [data, selectedLineItem, selectedTimeframe]);

  console.log(chartData);
  return (
    <>
      <div>
        <Header />
        <FilterPanel
          {...{
            selectedLineItem,
            setSelectedLineItem,
            selectedTimeframe,
            setSelectedTimeframe,
          }}
        />
        {chartData && <Graph chartData={chartData} yDomain={yDomain} />}
      </div>
    </>
  );
}
