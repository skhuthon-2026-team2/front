import { useState, useRef, useEffect } from "react";

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];
const fmt = (y, m, d) =>
  `${y}.${String(m).padStart(2, "0")}.${String(d).padStart(2, "0")}`;

export default function DateRangePicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState({ year: 2026, month: 5 });
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const { year, month } = view;
  const firstDay = new Date(year, month - 1, 1).getDay();
  const lastDate = new Date(year, month, 0).getDate();
  const cells = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: lastDate }, (_, i) => i + 1),
  ];

  const handleDay = (day) => {
    const dateStr = fmt(year, month, day);
    if (!value?.start || value.end) {
      onChange({ start: dateStr, end: null });
    } else {
      const [start, end] = [value.start, dateStr].sort();
      onChange({ start, end });
      setOpen(false);
    }
  };

  const moveMonth = (diff) => {
    const next = new Date(year, month - 1 + diff, 1);
    setView({ year: next.getFullYear(), month: next.getMonth() + 1 });
  };

  const inRange = (dateStr) => {
    if (!value?.start) return false;
    const end = value.end ?? value.start;
    return dateStr >= value.start && dateStr <= end;
  };
  const isEdge = (dateStr) => dateStr === value?.start || dateStr === value?.end;

  const label = value?.start
    ? value.end
      ? `${value.start} ~ ${value.end}`
      : value.start
    : "";

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-xl bg-gray-100 px-4 py-3 text-left text-sm text-gray-700 outline-none transition focus:ring-2 focus:ring-modam-coral/40"
      >
        <span className={label ? "" : "text-gray-400"}>
          {label || "활동 날짜를 선택하세요"}
        </span>
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-20 mt-2 w-72 rounded-2xl border border-gray-100 bg-white p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <button type="button" onClick={() => moveMonth(-1)} className="rounded p-1 text-gray-400 hover:bg-gray-100">‹</button>
            <span className="text-sm font-bold text-gray-900">{year}.{String(month).padStart(2, "0")}</span>
            <button type="button" onClick={() => moveMonth(1)} className="rounded p-1 text-gray-400 hover:bg-gray-100">›</button>
          </div>

          <div className="mt-3 grid grid-cols-7 gap-y-1 text-center text-xs">
            {WEEKDAYS.map((d) => (
              <span key={d} className="text-gray-400">{d}</span>
            ))}
            {cells.map((day, i) => {
              if (!day) return <div key={i} />;
              const dateStr = fmt(year, month, day);
              const selected = inRange(dateStr);
              return (
                <div key={i} className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => handleDay(day)}
                    className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
                      selected
                        ? isEdge(dateStr)
                          ? "bg-modam-coral font-bold text-white"
                          : "bg-modam-coral/20 text-modam-coral"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {day}
                  </button>
                </div>
              );
            })}
          </div>

          <p className="mt-3 border-t border-gray-100 pt-2 text-center text-xs text-gray-400">
            하루는 한 번, 기간은 시작일·종료일을 선택하세요
          </p>
        </div>
      )}
    </div>
  );
}
