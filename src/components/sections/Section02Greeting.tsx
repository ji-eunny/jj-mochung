import Section from "@/components/layout/Section";
import FadeInUp from "@/components/ui/FadeInUp";

/** 섹션 2: 인사말 */
export default function Section02Greeting() {
  return (
    <Section bgImage="/images/back2.jpg">
      <FadeInUp delay={0.1}>
        <div className="text-center text-3xl mt-14 font-bold">초대장</div>
      </FadeInUp>

      <FadeInUp delay={0.3}>
        <div className="text-center mt-22 flex flex-col gap-3 text-xl">
          <p>풋풋했던 스무살의 시작</p>
          <p>서로의 첫사랑이 된 우리는</p>
          <p className="font-semibold">아홉 번의 사계절을 지나</p>
          <p className="font-semibold">이제 평생을 함께하려 합니다.</p>
        </div>
      </FadeInUp>

      <FadeInUp delay={0.5}>
        <div className="text-center mt-14 flex flex-col gap-3 text-xl">
          <p>저희의 가장 특별한 날에</p>
          <p>함께 축복해 주시면 감사하겠습니다.</p>
        </div>
      </FadeInUp>

      <FadeInUp delay={0.7}>
        <div className="text-center mt-30 flex flex-col gap-5 text-2xl">
          <p>장석균 <span className="text-sm">·</span> 유상아의 <span className="font-semibold">장남</span> <span className="font-semibold text-3xl">재훈</span></p>
          <p>김동기 <span className="text-sm">·</span> 현경희의 <span className="font-semibold">장녀</span> <span className="font-semibold text-3xl">지은</span></p>
        </div>
      </FadeInUp>
    </Section>
  );
}
