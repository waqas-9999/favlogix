import Sidebar from "@/components/home/Sidebar";
import Conversations from "@/components/home/Conversations";
import Chat from "@/components/home/Chat";
import Details from "@/components/home/Details";

export default function Home() {
  return (
    <>
      {/* Desktop (1188px and up): exact original layout — do not change */}
      <div className="hidden min-[1188px]:flex pt-[7.75px] gap-[7.75px]">
        <div className="flex">
          <Sidebar />
          <Conversations />
        </div>
        <Chat />
        <Details />
      </div>

      {/* Mobile & tablet (under 1188px): stacked layout only */}
      <div className="flex flex-col gap-[7.75px] pt-[7.75px] min-[1188px]:hidden">
        <div className="h-auto lg:h-[70vh] min-h-[280px] w-full overflow-auto shrink-0">
          <Sidebar />
        </div>
        <div className="h-auto lg:h-[70vh] min-h-[280px] w-full overflow-auto shrink-0">
          <Conversations />
        </div>
        <div className="h-auto lg:h-[70vh] min-h-[320px] w-full overflow-auto shrink-0 flex-1">
          <Chat />
        </div>
        <div className="h-auto lg:h-[70vh] min-h-[280px] w-full overflow-auto shrink-0">
          <Details />
        </div>
      </div>
    </>
  );
}
