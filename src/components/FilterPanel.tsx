import { type FinancialLineItem } from "../types/types";

type FilterPanelProps = {
  lineItem: FinancialLineItem;
  onLineItemChange: (value: FinancialLineItem) => void;
  timeframe: string;
  onTimeframeChange: (value: string) => void;
};

const LINE_ITEMS: FinancialLineItem[] = ["EBIT", "FCFF", "DCF"];

const TIMEFRAMES = [
  { label: "Short-term (2025-2027)", value: "short" },
  { label: "Medium-term (2025-2030)", value: "medium" },
  { label: "Long-term (2025-2034)", value: "long" },
];

export default function FilterPanel({
  lineItem,
  onLineItemChange,
  timeframe,
  onTimeframeChange,
}: FilterPanelProps) {
  return (
    <div className="flex gap-4 px-6 py-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="line-item" className="text-sm font-medium">
          Financial Metric
        </label>
        <select
          id="line-item"
          value={lineItem}
          onChange={(e) => onLineItemChange(e.target.value as FinancialLineItem)}
          className="rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
        >
          {LINE_ITEMS.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="timeframe" className="text-sm font-medium">
          Timeframe
        </label>
        <select
          id="timeframe"
          value={timeframe}
          onChange={(e) => onTimeframeChange(e.target.value)}
          className="rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
        >
          {TIMEFRAMES.map((tf) => (
            <option key={tf.value} value={tf.value}>
              {tf.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
