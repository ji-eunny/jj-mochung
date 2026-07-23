import Section from "@/components/layout/Section";
import Typewriter from "@/components/ui/Typewriter";

/** 섹션 4: 우리의 이야기 */
export default function Section04Timeline() {
  return (
    <Section pdfUrl="/pdf/back4.pdf">
      <div className="text-center text-3xl mt-10 font-bold">우리의 이야기</div>
      <div className="mt-6 text-right p-14 pr-26  w-full">
        <p className="font-semibold">2018.05.26</p>
        <p>
          <Typewriter text="'우리'가 된 첫날" delay={100} startDelay={300} />
        </p>
      </div>
      <div className="text-left p-12 w-full">
        <p className="font-semibold">2018.05.26</p>
        <p>
          <Typewriter text="'우리'가 된 첫날" delay={100} startDelay={300} />
        </p>
      </div>
      <div className="text-right p-12 w-full">
        <p className="font-semibold">2018.05.26</p>
        <p>
          <Typewriter text="'우리'가 된 첫날" delay={100} startDelay={300} />
        </p>
      </div>
    </Section>
  );
}
