"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Copy, Check } from "lucide-react";
import { assetPath } from "@/lib/asset";

interface AccountItem {
  label?: string; // "아버지" | "어머니" 등 표시용 텍스트
  name: string;
  bank: string;
  account: string;
}

interface TapeToggleProps {
  label: string;
  accounts: AccountItem[];
}

/** 계좌 한 줄 - 복사 버튼 포함 */
function AccountRow({ label, name, bank, account }: AccountItem) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`${name} ${bank} ${account}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-between py-1.5 border-b border-black/10 last:border-none">
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-1.5">
          {label && <span className="font-semibold">{label}</span>}
          <span className="font-semibold">{name}</span>
        </div>
        <span className="text-sm text-black/60">{bank} {account}</span>
      </div>
      <button
        onClick={handleCopy}
        className="ml-4 flex-shrink-0 text-black/40 hover:text-black transition-colors"
        aria-label="계좌번호 복사"
      >
        {copied ? <Check size={18} /> : <Copy size={18} />}
      </button>
    </div>
  );
}

/** tape 배경 토글 컴포넌트 */
export default function TapeToggle({ label, accounts }: TapeToggleProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      {/* 헤더 - tape 배경 */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between px-6 py-3"
        style={{
          backgroundImage: `url(${assetPath("/images/tape.png")})`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <span className="text-lg font-semibold">{label}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {/* 펼쳐지는 계좌 목록 */}
      {isOpen && (
        <div className="px-4 pt-2 pb-1">
          {accounts.map((acc, idx) => (
            <AccountRow key={`${acc.name}-${idx}`} {...acc} />
          ))}
        </div>
      )}
    </div>
  );
}
