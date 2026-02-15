import { type FinancialLineItem, type Timeframe } from "../types/types";
import { LINE_ITEMS, TIMEFRAMES } from "../constants/constants";
import Dropdown from "./Dropdown";

type FilterPanelProps = {
  selectedLineItem: FinancialLineItem;
  setSelectedLineItem: (value: FinancialLineItem) => void;
  selectedTimeframe: Timeframe;
  setSelectedTimeframe: (value: Timeframe) => void;
};

export default function FilterPanel({
  selectedLineItem,
  setSelectedLineItem,
  selectedTimeframe,
  setSelectedTimeframe,
}: FilterPanelProps) {
  return (
    <div className="flex gap-4 px-6 py-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">
          Financial Metric
        </label>

        <Dropdown
          items={LINE_ITEMS}
          selected={selectedLineItem}
          onSelect={(item) => setSelectedLineItem(item as FinancialLineItem)}
          width="200px"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">
          Timeframe
        </label>
        <Dropdown
          items={TIMEFRAMES.map((tf) => tf.label)}
          selected={
            TIMEFRAMES.find((tf) => tf.value === selectedTimeframe)?.label ?? ""
          }
          onSelect={(label) => {
            const match = TIMEFRAMES.find((tf) => tf.label === label);
            if (match) setSelectedTimeframe(match.value);
          }}
          width="300px"
        />
      </div>
    </div>
  );
}
