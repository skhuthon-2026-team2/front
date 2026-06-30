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

                        <th className="px-6 py-4 text-left">
                            멤버
                        </th>

                        <th className="text-left">
                            역할
                        </th>

                        <th className="text-left">
                            가입일
                        </th>

                        <th className="text-center">
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