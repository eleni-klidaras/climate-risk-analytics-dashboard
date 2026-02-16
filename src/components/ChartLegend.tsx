import { type PathwayConfig } from "./Graph";

type ChartLegendProps = {
  pathways: PathwayConfig[];
};

export default function ChartLegend({ pathways }: ChartLegendProps) {
  return (
    <ul className="list-none m-0 p-0">
      {pathways.map((pathway) => (
        <li key={pathway.key} className="flex items-center mb-1">
          <span
            className="w-3.5 h-[3px] inline-block mr-2"
            style={{ backgroundColor: pathway.color }}
          />
          <span className="text-sm">{pathway.key}</span>
        </li>
      ))}
    </ul>
  );
}
