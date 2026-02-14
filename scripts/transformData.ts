import fs from "fs";
import Papa from "papaparse";
import {
  type RawFinancialRiskRow,
  type FinancialRiskRecord,
} from "../src/types/types";

const INPUT_FILE = "./src/data/mock_data.csv";
const OUTPUT_FILE = "./src/data/transformed_mock_data.json";

function transformData(): void {
  try {
    const csvText: string = fs.readFileSync(INPUT_FILE, "utf8");
    const parsed = Papa.parse<RawFinancialRiskRow>(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    const transformedData: FinancialRiskRecord[] = parsed.data.map(
      (row: RawFinancialRiskRow) => ({
        climatePathway: row.climate_pathway,
        financialLineItem: row.financial_line_item,
        year: Number(row.year),
        financialLineItemShock: Number(row.financial_line_item_shock),
      }),
    );

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(transformedData, null, 2));

    console.log(" ✅ Successfully transformed data");
  } catch (error) {
    console.error("❌ Error during transformation: " + error);
  }
}
transformData();
