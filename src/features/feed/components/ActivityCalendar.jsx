const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

const fmt = (year, month, day) =>
  `${year}.${String(month).padStart(2, "0")}.${String(day).padStart(2, "0")}`;

export default function ActivityCalendar({
  year = 2026,
  month = 5,
  postedDays = [],
  range,
  onSelect,
}) {
  const firstDay = new Date(year, month - 1, 1).getDay();
  const lastDate = new Date(year, month, 0).getDate();
  const postedSet = new Set(postedDays);

  const cells = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: lastDate }, (_, i) => i + 1),
  ];

  // range: { start, end } 형태의 날짜 문자열. 선택 여부 판단용.
  const inRange = (dateStr) => {
    if (!range?.start) return false;
    const end = range.end ?? range.start;
    return dateStr >= range.start && dateStr <= end;
  };
  const isEdge = (dateStr) =>
    dateStr === range?.start || dateStr === range?.end;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-900">활동 달력</h3>
        <span className="text-xs text-modam-coral">
          {year}.{String(month).padStart(2, "0")}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-y-1.5 text-center text-xs">
        {WEEKDAYS.map((d) => (
          <span key={d} className="text-gray-400">{d}</span>
        ))}
        {cells.map((date, i) => {
          if (!date) return <div key={i} />;
          const dateStr = fmt(year, month, date);
          const posted = postedSet.has(dateStr);
          const selected = inRange(dateStr);

          return (
            <div key={i} className="flex justify-center">
              <button
                type="button"
                onClick={() => onSelect(dateStr)}
                className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
                  selected
                    ? isEdge(dateStr)
                      ? "bg-modam-coral font-bold text-white"
                      : "bg-modam-coral/20 text-modam-coral"
                    : posted
                    ? "font-bold text-modam-coral hover:bg-modam-coral/10"
                    : "text-gray-300 hover:bg-gray-50"
                }`}
              >
                {date}
              </button>
            </div>
          );
        })}
      </div>

      {range?.start && (
        <button
          type="button"
          onClick={() => onSelect(null)}
          className="mt-4 w-full border-t border-gray-100 pt-3 text-xs text-gray-400 transition-colors hover:text-gray-600"
        >
          전체 보기로 돌아가기
        </button>
      )}
    </div>
  );
}
