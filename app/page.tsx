import Sidebar from "@/components/home/Sidebar";
import Conversations from "@/components/home/Conversations";

export default function Home() {
  return (
   <div className="pt-[7.75px] flex">
    <Sidebar/>
    <Conversations />
   </div>
  );
}
