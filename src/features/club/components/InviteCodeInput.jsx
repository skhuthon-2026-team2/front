import { useRef, useState } from "react";

const LENGTH = 6;

export default function InviteCodeInput({ onChange }) {
  const [chars, setChars] = useState(Array(LENGTH).fill(""));
  const inputsRef = useRef([]);

  // 내부에선 6칸 배열로 관리하고, 부모에는 합친 문자열만 넘긴다
  const update = (next) => {
    setChars(next);
    onChange(next.join(""));
  };

  const handleChange = (index, e) => {
    const char = e.target.value.slice(-1).toUpperCase();
    if (char && !/[A-Z0-9]/.test(char)) return; // 영문 대문자·숫자만 허용
    const next = [...chars];
    next[index] = char;
    update(next);
    if (char && index < LENGTH - 1) inputsRef.current[index + 1]?.focus();
  };

  // 빈 칸에서 백스페이스 → 이전 칸으로 포커스 이동
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !chars[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, LENGTH);
    const next = Array(LENGTH).fill("");
    pasted.split("").forEach((c, i) => (next[i] = c));
    update(next);
    inputsRef.current[Math.min(pasted.length, LENGTH - 1)]?.focus();
  };

  return (
    <div className="flex justify-center gap-2" onPaste={handlePaste}>
      {chars.map((char, index) => (
        <input
          key={index}
          ref={(el) => (inputsRef.current[index] = el)}
          value={char}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          maxLength={1}
          placeholder="-"
          className={`h-12 w-12 rounded-lg border text-center text-lg font-bold outline-none transition-colors placeholder-gray-300 ${
            char ? "border-modam-coral text-modam-coral" : "border-gray-200 text-gray-400"
          } focus:border-modam-coral`}
        />
      ))}
    </div>
  );
}
