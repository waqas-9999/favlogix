import Sidebar from "@/components/home/Sidebar";
import Conversations from "@/components/home/Conversations";
import Chat from "@/components/home/Chat";
import Details from "@/components/home/Details";

export default function Home() {
  return (
    <div className="pt-[7.75px] flex gap-[7.75px]">
      <div className="flex">
        <Sidebar />
        <Conversations />
      </div>
      <Chat />
      <Details/>
    </div>
  );
}
