export default function ClubCard({ club }) {
  return (
    <button
      type="button"
      className="group overflow-hidden rounded-2xl border border-gray-100 bg-white text-left transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={club.image}
          alt={club.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {club.role && (
          <span className="absolute right-2 top-2 rounded-full bg-modam-coral px-2.5 py-1 text-xs font-medium text-white">
            {club.role}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-900">{club.name}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-gray-500">{club.description}</p>
      </div>
    </button>
  );
}
