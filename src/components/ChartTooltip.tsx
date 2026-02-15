import { type PathwayConfig } from "./Graph";

type ChartTooltipProps = {
  active?: boolean;
  payload?: readonly { dataKey?: string | number; value?: number }[];
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
    <div
      style={{
        backgroundColor: "white",
        border: "1px solid #ccc",
        borderRadius: 8,
        padding: "8px 12px",
      }}
    >
      <p style={{ margin: 0, fontWeight: 600 }}>{label}</p>
      {ordered.map((item) => (
        <p
          key={item.key}
          style={{
            margin: "4px 0",
            color: item.color,
            fontSize: 13,
          }}
        >
          {item.key}: {Number(item.value ?? 0).toFixed(2)}
        </p>
      ))}
    </div>
  );
}
