import { ArrowIcon } from "./icons";

export default function ActionCard({ icon, title, description, accent, onClick }) {
  const accentStyle =
    accent === "coral"
      ? "bg-modam-coral/10 text-modam-coral"
      : "bg-modam-lime/20 text-modam-lime";

  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex flex-col rounded-2xl border border-gray-100 bg-white p-6 text-left transition-all hover:border-gray-200 hover:shadow-md"
    >
      <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${accentStyle}`}>
        {icon}
      </span>
      <h3 className="mt-4 font-bold text-gray-900">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-gray-500">{description}</p>
      <span className="absolute right-5 top-5 text-gray-300 transition-colors group-hover:text-gray-400">
        <ArrowIcon />
      </span>
    </button>
  );
}
