import { useEffect, useState } from "react";
import Modal from "../../../components/common/Modal";

const CAPACITY_OPTIONS = [10, 20, 30, 40, 50, 100];

export default function CapacityCard({
    current = 12,
    capacity,
    setCapacity,
}) {
    const [open, setOpen] = useState(false);
    const [tempCapacity, setTempCapacity] = useState(capacity);

    useEffect(() => {
        setTempCapacity(capacity);
    }, [capacity]);

    const handleConfirm = () => {
        setCapacity(tempCapacity);

        // TODO : 최대 인원 변경 API 호출

        setOpen(false);
    };

    return (
        <>
            <div className="w-[260px] rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <p className="text-sm font-medium text-gray-400">
                    현재 인원 / 최대 인원
                </p>

                <div className="mt-4 flex items-center justify-between">
                    <p className="text-3xl font-bold">
                        {current}
                        <span className="mx-2 text-gray-400">/</span>

                        <span className="text-modam-coral">
                            {capacity}
                        </span>
                        명
                    </p>

                    <button
                        onClick={() => setOpen(true)}
                        className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800"
                    >
                        변경
                    </button>
                </div>
            </div>

            <Modal
                open={open}
                title="최대 인원 변경"
                confirmText="변경하기"
                cancelText="취소"
                onClose={() => {
                    setTempCapacity(capacity);
                    setOpen(false);
                }}
                onConfirm={handleConfirm}
            >
                <div className="mt-2">
                    <p className="mb-4 text-sm text-gray-500">
                        변경할 최대 인원을 선택해주세요.
                    </p>

                    <div className="relative">
                        <select
                            value={tempCapacity}
                            onChange={(e) =>
                                setTempCapacity(Number(e.target.value))
                            }
                            className="w-full appearance-none rounded-xl bg-gray-100 px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-modam-coral/40"
                        >
                            {CAPACITY_OPTIONS.map((n) => (
                                <option key={n} value={n}>
                                    {n}명
                                </option>
                            ))}
                        </select>

                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                            ▼
                        </span>
                    </div>
                </div>
            </Modal>
        </>
    );
}