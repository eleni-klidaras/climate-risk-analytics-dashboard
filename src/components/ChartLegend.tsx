import { type PathwayConfig } from "./Graph";

type ChartLegendProps = {
  pathways: PathwayConfig[];
};

export default function ChartLegend({ pathways }: ChartLegendProps) {
  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
      {pathways.map((pathway) => (
        <li
          key={pathway.key}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 4,
          }}
        >
          <span
            style={{
              width: 14,
              height: 3,
              backgroundColor: pathway.color,
              display: "inline-block",
              marginRight: 8,
            }}
          />
          <span style={{ fontSize: 14 }}>{pathway.key}</span>
        </li>
      ))}
    </ul>
  );
}
