import MobileFrame from "@/components/layout/MobileFrame";
import Section01Cover from "@/components/sections/Section01Cover";
import Section02Greeting from "@/components/sections/Section02Greeting";
import Section03Date from "@/components/sections/Section03Date";
import Section04Gallery from "@/components/sections/Section04Gallery";
import Section05Map from "@/components/sections/Section05Map";
import Section06Closing from "@/components/sections/Section06Closing";

export default function Home() {
  return (
    <MobileFrame>
      <Section01Cover />
      <Section02Greeting />
      <Section03Date />
      <Section04Gallery />
      <Section05Map />
      <Section06Closing />
    </MobileFrame>
  );
}
