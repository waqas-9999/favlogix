import PolygonCard from "@/components/global/icon/hexagon";
import Image from "next/image";
import Inbox from "./Inbox";
import Header from "@/components/global/header/header";
import Link from "next/link";

function Home() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden text-white flex items-center justify-center px-4 sm:px-6 lg:px-0">

      {/* Background Images */}
      <img
        src="/images/1-bg.png"
        alt="bg-1"
        className="
          absolute pointer-events-none select-none
          w-[1455.723px]
          top-0
          -left-131.25
          -rotate-320
          opacity-[0.55]

          /* Responsive */
          max-lg:w-250
          max-md:w-200
          max-md:-left-87.5
        "
      />

      <img
        src="/images/1-bg.png"
        alt="bg-2"
        className="
          absolute pointer-events-none select-none
          w-[1455.723px]
          -top-128.75
          left-133.5
          rotate-245

          /* Responsive */
          max-lg:w-250
          max-md:w-200
          max-md:left-50
        "
      />

      {/* Glass Blur Card */}
      <div
        className="
          relative z-10 flex flex-col
          w-[98vw] h-[96vh]

          pt-6 pr-20 pb-44.5 pl-20
          gap-13.5

          rounded-3xl
          border-2 border-white/10
          bg-white/5
          backdrop-blur-[30px]

          /* Tablet */
          max-lg:px-10
          max-lg:pb-24

          /* Mobile */
          max-md:w-full
          max-md:h-auto
          max-md:px-6
          max-md:pb-16
          max-md:gap-10
        "
      >
        <div className="flex w-full items-center max-md:flex-col max-md:h-auto max-md:gap-10">

          {/* LEFT */}
          <div className="flex-1 flex flex-col gap-10 max-md:flex-row max-md:justify-center">
            <div className="w-full flex justify-center">
              <PolygonCard size={90}>
                <Image src="/icons/ai.svg" alt="icon" width={30} height={30}
                  className="opacity-60 transition-opacity duration-300 group-hover:opacity-100" />
              </PolygonCard>
            </div>

            <div className="w-full flex justify-start relative top-7 left-12 max-md:static max-md:justify-center">
              <PolygonCard size={80}>
                <Link href="/inbox">
                  <Image src="/icons/inbox-white.svg" alt="icon" width={18} height={18}
                    className="opacity-60 transition-opacity duration-300 group-hover:opacity-100" />
                </Link>
              </PolygonCard>
            </div>

            <div className="w-full flex justify-end relative right-32 max-md:static max-md:justify-center">
              <PolygonCard size={80}>
                <Image src="/icons/person-w.svg" alt="icon" width={20} height={20}
                  className="opacity-60 transition-opacity duration-300 group-hover:opacity-100" />
              </PolygonCard>
            </div>
          </div>

          {/* CENTER */}
          <div className="text-lg flex-1.5 items-center px-6 flex gap-2 flex-col max-md:px-2">
            <img
              src="/images/0227.gif"
              alt="icon"
              className="-rotate-90 w-[288px] h-68.25 opacity-60 transition-opacity duration-300 group-hover:opacity-100 max-md:w-50 max-md:h-auto"
            />

            <h3 className="font-bold mt-4 md:text-[38px] leading-[120%] text-center z-30 max-md:text-2xl">
              Extracting Information...
            </h3>

            <p className="text-center md:text-lg z-30 leading-[120%] max-w-lg mx-auto max-md:text-xs">
              We are extracting information from the above honey combs to your system
            </p>
          </div>

          {/* RIGHT */}
          <div className="flex-1 flex flex-col gap-10 max-md:flex-row max-md:justify-center">
            <div className="w-full flex justify-end max-md:justify-center">
              <PolygonCard size={80}>
                <Image src="/icons/person-w.svg" alt="icon" width={24} height={24}
                  className="opacity-60 transition-opacity duration-300 group-hover:opacity-100" />
              </PolygonCard>
            </div>

            <div className="w-full flex justify-start relative left-12 max-md:static max-md:justify-center">
              <PolygonCard size={90}>
                <Image src="/icons/workflow.svg" alt="icon" width={30} height={30}
                  className="opacity-60 transition-opacity duration-300 group-hover:opacity-100" />
              </PolygonCard>
            </div>

            <div className="w-full flex justify-end relative right-12 max-md:static max-md:justify-center">
              <PolygonCard size={80}>
                <Image src="/icons/target.svg" alt="icon" width={20} height={20}
                  className="-rotate-90 opacity-60 transition-opacity duration-300 group-hover:opacity-100" />
              </PolygonCard>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-black bg-[#EFF0EB] p-2 rounded-xl max-md:mt-6">
          <Header />
          <Inbox />
        </div>
      </div>
    </div>
  );
}

export default Home;