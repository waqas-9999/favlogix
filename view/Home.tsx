import PolygonCard from "@/components/global/icon/hexagon";
import Image from "next/image";
import Inbox from "./Inbox";
import Header from "@/components/global/header/header";
import Link from "next/link";

function Home() {
    return (
        <div className="relative min-h-screen bg-black overflow-hidden text-white flex items-center justify-center">

            {/* Background Images */}
            <img
                src="/images/1-bg.png"
                alt="bg-1"
                className="absolute pointer-events-none select-none"
                style={{
                    width: "1455.723px",
                    top: "0px",
                    left: "-525px",
                    transform: "rotate(-320deg)",
                    opacity: 0.55,
                }}
            />

            <img
                src="/images/1-bg.png"
                alt="bg-2"
                className="absolute pointer-events-none select-none"
                style={{
                    width: "1455.723px",
                    top: "-515px",
                    left: "534px",
                    transform: "rotate(245deg)",
                }}
            />

            {/* Glass Blur Card */}
            <div
                className="relative z-10 flex flex-col"
                style={{
                    width: "98vw",
                    height: "96vh",
                    paddingTop: "24px",
                    paddingRight: "80px",
                    paddingBottom: "178px",
                    paddingLeft: "80px",
                    gap: "54px",
                    borderRadius: "24px",
                    border: "2px solid rgba(255,255,255,0.10)",
                    background: "rgba(255,255,255,0.04)",
                    backdropFilter: "blur(30px)",
                }}
            >
                <div className="h-[50vh] flex w-full items-center">

                    {/* Text Content */}
                    <div className="flex-1 flex flex-col gap-10">
                        <div className="w-full flex justify-center">
                            <PolygonCard size={90}>
                                <Image
                                    src="/icons/ai.svg"
                                    alt="icon"
                                    width={30}
                                    height={30}
                                    className=" opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                                />
                            </PolygonCard>
                        </div>
                        <div className="w-full flex justify-start relative top-7 left-12">
                            <PolygonCard size={80}>
                                <Link href="/inbox">
                                <Image
                                    src="/icons/inbox-white.svg"
                                    alt="icon"
                                    width={18}
                                    height={18}
                                    className="opacity-60 text-white transition-opacity duration-300 group-hover:opacity-100"
                                />
                                </Link>
                            </PolygonCard>
                        </div>
                        <div className="w-full flex justify-end relative right-32">
                            <PolygonCard size={80}>
                                <Image
                                    src="/icons/person-w.svg"
                                    alt="icon"
                                    width={20}
                                    height={20}
                                    className="opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                                />
                            </PolygonCard>
                        </div>
                    </div>

                    <div className="text-lg flex-2 items-center px-6 flex gap-2 flex-col">
                        <img
                            src="/images/center-img.gif"
                            alt="icon"
                            className="-rotate-90 w-[288px] h-68.25 opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                        />
                        <h3 style={{fontWeight:'700'}} className="font-(--font-roboto) text-[38px] leading-[120%] text-center z-30">Extracting Information...</h3>
                        <p className="text-center text-lg z-30 leading-[120%] max-w-lg mx-auto">We are extracting information from the above honey combs to your system</p>
                    </div>

                    {/* Polygon Section */}
                    <div className="flex-1 flex flex-col gap-10">
                        <div className="w-full flex justify-end">
                            <PolygonCard size={80}>
                                <Image
                                    src="/icons/person-w.svg"
                                    alt="icon"
                                    width={24}
                                    height={24}
                                    className=" opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                                />
                            </PolygonCard>
                        </div>
                        <div className="w-full flex justify-start relative left-12">
                            <PolygonCard size={90}>
                                <Image
                                    src="/icons/workflow.svg"
                                    alt="icon"
                                    width={30}
                                    height={30}
                                    className="opacity-60 text-white transition-opacity duration-300 group-hover:opacity-100"
                                />
                            </PolygonCard>
                        </div>
                        <div className="w-full flex justify-end relative right-12">
                            <PolygonCard size={80}>
                                <Image
                                    src="/icons/target.svg"
                                    alt="icon"
                                    width={20}
                                    height={20}
                                    className="-rotate-90 opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                                />
                            </PolygonCard>
                        </div>
                    </div>

                </div>
                <div className="text-black bg-[#EFF0EB] p-2">
                    <Header/>
                    <Inbox/>
                </div>
            </div>

        </div>
    );
}

export default Home;