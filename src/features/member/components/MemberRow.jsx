export default function MemberRow({ member }) {
    const badgeStyle = {
        회장: "bg-red-100 text-red-500",
        일반회원: "bg-gray-100 text-gray-600",
    };

    return (
        <tr className="border-t border-gray-100 hover:bg-gray-50 transition">
            <td className="py-4">
                <div className="flex items-center gap-3">
                    <img
                        src={member.avatar}
                        alt={member.name}
                        className="h-11 w-11 rounded-full object-cover"
                    />

                    <div>
                        <p className="font-semibold text-gray-900">
                            {member.name}
                        </p>

                        <p className="text-sm text-gray-400">
                            {member.email}
                        </p>
                    </div>
                </div>
            </td>

            <td>
                <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeStyle[member.role]}`}
                >
                    {member.role}
                </span>
            </td>

            <td className="text-gray-500">
                {member.joinedAt}
            </td>

            <td>
                {member.role === "회장" ? (
                    <span className="text-sm text-gray-400">
                        내 정보
                    </span>
                ) : (
                    <button
                        onClick={() => onKick(member.id)}
                        className="rounded-lg bg-red-50 px-4 py-2 text-red-500 hover:bg-red-100"
                    >
                        내보내기
                    </button>
                )}
            </td>
        </tr>
    );
}