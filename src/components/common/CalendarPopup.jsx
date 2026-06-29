export default function CalendarPopup({ value, onChange }) {
  return (
    <input
      type="date"
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
    />
  );
}
