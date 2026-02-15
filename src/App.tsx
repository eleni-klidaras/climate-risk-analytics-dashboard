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
import { Alert } from "@mui/material";

export default function App() {
  const [data, setData] = useState<FinancialRiskRecord[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedLineItem, setSelectedLineItem] =
    useState<FinancialLineItem>("EBIT");
  const [selectedTimeframe, setSelectedTimeframe] = useState<Timeframe>("long");

  useEffect(() => {
    fetchFinancialData()
      .then(setData)
      .catch((err) => setError(err.message || "Failed to load financial data"));
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
        {error && (
          <Alert severity="error" className="mx-6 mt-4">
            {error}
          </Alert>
        )}
        {chartData && <Graph {...{ chartData }} />}
      </div>
    </>
  );
}
