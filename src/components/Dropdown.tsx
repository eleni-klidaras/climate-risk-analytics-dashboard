import { useState } from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { COLORS } from "../constants/constants";

type Props<T extends string> = {
  items: T[];
  selected: T;
  onSelect: (item: T) => void;
  width?: string;
  id?: string;
};

export default function Dropdown<T extends string>({ items, selected, onSelect, width, id }: Props<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <ClickAwayListener onClickAway={() => setIsOpen(false)}>
      <div className="relative w-full" style={width ? { width } : undefined}>
        <div
          id={id}
          role="button"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          className="cursor-pointer border border-gray-300 bg-white px-4 py-2 shadow-md flex justify-between items-center hover:ring-1 hover:ring-blue-500 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{selected}</span>
          <svg
            aria-hidden="true"
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
          <ul role="listbox" className="w-full overflow-y-auto shadow-md px-2 py-2 mt-2 bg-white z-10 absolute">
            {items.map((item, idx) => (
              <li
                key={idx}
                role="option"
                aria-selected={item === selected}
                className="cursor-pointer p-2 transition-all duration-200 text-black"
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
