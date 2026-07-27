import Section from "@/components/layout/Section";
import FadeInUp from "@/components/ui/FadeInUp";
import { MapPinIcon, TrainIcon, CarIcon } from "@/components/ui/icons";
import { assetPath } from "@/lib/asset";

/** 섹션 6: 오시는 길 */
export default function Section06Map() {
  return (
    <Section bgImage="/images/back6.jpg">
      <FadeInUp delay={0.1}>
        <div className="text-center text-3xl mt-12 font-bold">오시는 길</div>
        <img
        src={assetPath("/images/star.png")}
        alt="star"
        width={30}
        height={30}
        className="absolute -top-5 right-32"
        style={{ rotate: "-15deg" }}
      />
      </FadeInUp>
      <div className="mt-88">
        <FadeInUp delay={0.2}>
          <div className="ml-12 flex gap-4 align-center">
            <div className="mt-1"><MapPinIcon size={30} color="#000000" /></div>
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-2xl">까사그랑데</p>
              <p className="text-xl">서울특별시 광진구 능동로 87</p>
              <p className="text-xl">건대입구역 자이엘라 6층</p>
            </div>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.35}>
          <div className="ml-12 flex gap-4 align-center mt-8">
            <div className="mt-1"><TrainIcon size={30} color="#000000" /></div>
            <div className="flex flex-col gap-1">
              <p className="text-xl">지하철</p>
              <p className="text-lg">2호선 <span className="text-sm">·</span> 7호선 건대입구역 5번출구 도보 1분</p>
            </div>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.5}>
          <div className="ml-12 flex gap-4 align-center mt-8">
            <div className="mt-1"><CarIcon size={30} color="#000000" /></div>
            <div className="flex flex-col gap-1">
              <p className="text-xl">주차안내</p>
              <p className="text-lg">건물 내 B2~B5 / 외부 주차장</p>
            </div>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.6}>
          <div className="mt-10 flex flex-col gap-1.5 text-center">
            <p className="text-xl">기계식 주차로 인해 주차가 다소 불편할 수 있으니</p>
            <p className="text-xl font-bold">가급적 대중교통 이용을 권장드립니다.</p>
          </div>
        </FadeInUp>
      </div>

      <FadeInUp delay={0.7}>
        <div className="mt-8 flex justify-center gap-10">
          <a
            href="https://map.naver.com/p/search/서울특별시%20광진구%20능동로%2087"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4"
            style={{ backgroundImage: `url(${assetPath("/images/tape.png")})`, backgroundSize: "100% 100%", backgroundRepeat: "no-repeat" }}
          >
            <MapPinIcon size={24} color="#2DB400" />
            <span>네이버 지도</span>
          </a>
          <a
            href="https://map.kakao.com/?q=서울특별시%20광진구%20능동로%2087"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4"
            style={{ backgroundImage: `url(${assetPath("/images/tape.png")})`, backgroundSize: "100% 100%", backgroundRepeat: "no-repeat" }}
          >
            <MapPinIcon size={24} color="#FFE300" />
            <span>카카오 지도</span>
          </a>
        </div>
      </FadeInUp>
    </Section>
  );
}
