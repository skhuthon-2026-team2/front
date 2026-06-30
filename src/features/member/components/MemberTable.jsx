import MemberRow from "./MemberRow";

export default function MemberTable({
    members,
    onKick,
}) {
    return (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <table className="w-full">

                <thead className="bg-gray-50">
                    <tr>
                        <th className="w-[45%] px-8 py-5 text-left text-sm font-semibold text-gray-700">
                            멤버
                        </th>

                        <th className="w-[20%] text-center text-sm font-semibold text-gray-700">
                            역할
                        </th>

                        <th className="w-[20%] text-center text-sm font-semibold text-gray-700">
                            가입일
                        </th>

                        <th className="w-[15%] text-center text-sm font-semibold text-gray-700">
                            관리
                        </th>
                    </tr>
                </thead>

                <tbody>

                    {members.map((member) => (

                        <MemberRow
                            key={member.id}
                            member={member}
                            onKick={onKick}
                        />

                    ))}

                </tbody>

            </table>
        </div>
    );
}