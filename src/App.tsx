import "./App.css";
import { useEffect, useState, useMemo } from "react";
import {
  type FinancialRiskRecord,
  type FinancialLineItem,
  type Timeframe,
} from "./types/types";
import { fetchFinancialData } from "./services/fetchFinancialRiskData";
import Header from "./components/Header";
import FilterPanel from "./components/FilterPanel";
import Graph from "./components/Graph";
import { filterData, transformToChartData } from "./utils/utils";
import { InsightPanel } from "./components/InsightPanel";

export default function App() {
  const [data, setData] = useState<FinancialRiskRecord[] | null>(null);
  const [selectedLineItem, setSelectedLineItem] =
    useState<FinancialLineItem>("EBIT");
  const [selectedTimeframe, setSelectedTimeframe] = useState<Timeframe>("long");

  useEffect(() => {
    fetchFinancialData().then(setData).catch();
  }, []);

  const chartData = useMemo(() => {
    if (!data) return;

    const filteredData = filterData(data, selectedLineItem, selectedTimeframe);

    return transformToChartData(filteredData);
  }, [data, selectedLineItem, selectedTimeframe]);

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
