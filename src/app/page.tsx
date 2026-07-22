import MobileFrame from "@/components/layout/MobileFrame";
import Section01Cover from "@/components/sections/Section01Cover";
import Section02Greeting from "@/components/sections/Section02Greeting";
import Section03Gallery from "@/components/sections/Section03Gallery";
import Section04Timeline from "@/components/sections/Section04Timeline";
import Section05Map from "@/components/sections/Section05Map";
import Section06Heart from "@/components/sections/Section06Heart";
import Section07Closing from "@/components/sections/Section07Closing";

export default function Home() {
  return (
    <MobileFrame>
      <Section01Cover />
      <Section02Greeting />
      <Section03Gallery />
      <Section04Timeline />
      <Section05Map />
      <Section06Heart />
      <Section07Closing />
    </MobileFrame>
  );
}
