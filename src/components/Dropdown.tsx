import { useState } from "react";
import { COLORS } from "../constants/constants";
import ClickAwayListener from "@mui/material/ClickAwayListener";

type Props = {
  items: string[];
  selected: string;
  onSelect: (item: string) => void;
  width?: string;
};

export default function Dropdown({ items, selected, onSelect, width }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <ClickAwayListener onClickAway={() => setIsOpen(false)}>
      <div className="relative w-full" style={width ? { width } : undefined}>
        <div
          className="cursor-pointer border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 shadow-md flex justify-between items-center hover:ring-1 hover:ring-blue-500 transition"
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
          <ul className="w-full  overflow-y-auto shadow-md px-2 py-2 mt-2 bg-white z-10 absolute">
            {items.map((item, idx) => (
              <li
                key={idx}
                value={item}
                className="cursor-pointer p-2 transition-all duration-200 text-black dark:text-white"
                style={
                  hoveredIndex === idx
                    ? {
                        borderBottomStyle: "solid",
                        borderBottomWidth: 3,
                        borderColor: COLORS.VIBRANT_GREEN,
                      }
                    : { borderBottomWidth: 3, borderColor: "transparent" }
                }
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => {
                  setHoveredIndex(null);
                }}
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
    </ClickAwayListener>
  );
}
