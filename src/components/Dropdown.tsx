import { useState } from "react";

type FinancialLineItem = string;

interface CustomDropdownProps {
  items: FinancialLineItem[];
  selected: FinancialLineItem;
  onSelect: (item: FinancialLineItem) => void;
  width?: string;
}

export default function Dropdown({
  items,
  selected,
  onSelect,
  width,
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative w-full" style={width ? { width } : undefined}>
      <div
        className="cursor-pointer rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 shadow-md flex justify-between items-center hover:ring-1 hover:ring-blue-500 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selected}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {isOpen && (
        <ul className="w-full  overflow-y-auto rounded-xl shadow-md px-2 py-2 mt-2 bg-white z-10 absolute">
          {items.map((item, idx) => (
            <li
              key={idx}
              value={item}
              className={`rounded-xl cursor-pointer p-2 transition-transform duration-200 transform ${
                hoveredIndex === idx
                  ? "bg-black text-white scale-105"
                  : "bg-transparent text-black dark:text-white"
              }`}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => {
                onSelect(item);
                setIsOpen(false);
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
