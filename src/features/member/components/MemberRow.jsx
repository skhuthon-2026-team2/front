export default function MemberRow({ member, onKick }) {
    const badgeStyle = {
        회장: "bg-modam-coral text-white",
        일반회원: "bg-gray-100 text-gray-600",
    };

    return (
        <tr className="border-t border-gray-100 transition hover:bg-gray-50">

            <td className="px-8 py-5">
                <div className="flex items-center gap-4">
                    <img
                        src={member.avatar}
                        alt={member.name}
                        className="h-12 w-12 rounded-full object-cover"
                    />

                    <div>
                        <p className="font-semibold text-gray-900">
                            {member.name}
                        </p>

                        <p className="mt-1 text-sm text-gray-400">
                            {member.email}
                        </p>
                    </div>
                </div>
            </td>

            <td className="text-center">
                <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badgeStyle[member.role]}`}
                >
                    {member.role}
                </span>
            </td>

            <td className="text-center text-gray-500">
                {member.joinedAt}
            </td>

            <td className="text-center">
                {member.role !== "회장" && (
                    <button
                        onClick={() => onKick(member.id)}
                        className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-500 transition hover:bg-red-100"
                    >
                        내보내기
                    </button>
                )}
            </td>

        </tr>
    );
}