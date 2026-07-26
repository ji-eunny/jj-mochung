import MobileFrame from "@/components/layout/MobileFrame";
import Section01Cover from "@/components/sections/Section01Cover";
import Section02Greeting from "@/components/sections/Section02Greeting";
import Section03Gallery from "@/components/sections/Section03Gallery";
import Section04Timeline from "@/components/sections/Section04Timeline";
import Section05Calendar from "@/components/sections/Section05Calendar";
import Section06Map from "@/components/sections/Section06Map";
import Section07Heart from "@/components/sections/Section07Heart";
import Section08Closing from "@/components/sections/Section08Closing";

export default function Home() {
  return (
    <MobileFrame>
      <Section01Cover />
      <Section02Greeting />
      <Section05Calendar />
      <Section06Map />
      <Section03Gallery />
      <Section04Timeline />
      <Section07Heart />
      <Section08Closing />
    </MobileFrame>
  );
}
