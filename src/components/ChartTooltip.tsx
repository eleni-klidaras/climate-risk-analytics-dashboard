import { type TooltipPayloadEntry } from "recharts";
import { type PathwayConfig } from "../types/types";

type ChartTooltipProps = {
  active?: boolean;
  payload?: ReadonlyArray<TooltipPayloadEntry<number, string>>;
  label?: string;
  pathways: PathwayConfig[];
};

export default function ChartTooltip({
  active,
  payload,
  label,
  pathways,
}: ChartTooltipProps) {
  if (!active || !payload) return null;

  const ordered = pathways
    .filter((p) => payload.some((entry) => entry.dataKey === p.key))
    .map((p) => ({
      ...p,
      value: payload.find((entry) => entry.dataKey === p.key)?.value,
    }));

  return (
    <div className="bg-white border border-gray-300 rounded-lg px-3 py-2">
      <p className="m-0 font-semibold">{label}</p>
      {ordered.map((item) => (
        <p
          key={item.key}
          className="my-1 text-[13px]"
          style={{ color: item.color }}
        >
          {item.key}: {Number(item.value ?? 0).toFixed(2)}
        </p>
      ))}
    </div>
  );
}
