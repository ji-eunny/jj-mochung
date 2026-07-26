import Section from "@/components/layout/Section";
import FadeInUp from "@/components/ui/FadeInUp";
import TapeToggle from "@/components/ui/TapeToggle";

const GROOM_ACCOUNTS = [
  { name: "장재훈", bank: "카카오뱅크", account: "3333165452792" },
  { label: "아버지", name: "장석균", bank: "카카오뱅크", account: "3333165452792" },
  { label: "어머니", name: "유상아", bank: "카카오뱅크", account: "3333165452792" },
];

const BRIDE_ACCOUNTS = [
  { name: "김지은", bank: "카카오뱅크", account: "0000000000000" },
  { label: "아버지", name: "김동기", bank: "카카오뱅크", account: "0000000000000" },
  { label: "어머니", name: "현경희", bank: "카카오뱅크", account: "0000000000000" },
];

/** 섹션 7: 마음 전하는 곳 */
export default function Section07Heart() {
  return (
    <Section bgImage="/images/back7.jpg">
      <FadeInUp delay={0.1}>
        <div className="text-center text-3xl mt-21 font-bold">마음 전하는 곳</div>
      </FadeInUp>

      <FadeInUp delay={0.3}>
        <div className="text-center mt-10 flex flex-col gap-2 text-lg">
          <p>따뜻한 축하를 보내주셔서</p>
          <p>진심으로 감사합니다.</p>
        </div>
      </FadeInUp>

      <FadeInUp delay={0.5}>
        <div className="text-center mt-4 flex flex-col gap-2 text-lg">
          <p>보내주신 마음 오래도록 소중히 간직하며</p>
          <p>행복하게 살아가겠습니다.</p>
        </div>
      </FadeInUp>

      <FadeInUp delay={0.7}>
        <div className="mt-14 flex flex-col gap-3 px-6">
          <TapeToggle label="신랑 측" accounts={GROOM_ACCOUNTS} />
          <TapeToggle label="신부 측" accounts={BRIDE_ACCOUNTS} />
        </div>
      </FadeInUp>
    </Section>
  );
}
