import "./App.css";
import { useEffect, useState } from "react";
import { fetchFinancialData } from "./services/fetchFinancialRiskData";
import { type FinancialRiskRecord } from "./types/types";

export default function App() {
  const [data, setData] = useState<FinancialRiskRecord[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedData: FinancialRiskRecord[] = await fetchFinancialData();
        if (fetchedData.length) setData(fetchedData);
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    }
    fetchData();
  }, []);
  return <>{console.log(data)}</>;
}
