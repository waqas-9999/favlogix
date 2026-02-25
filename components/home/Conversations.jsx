import Image from "next/image"

function Conversations() {
  return (
    <div className="w-62.25 bg-[#FAFAF8] rounded-tr-[11.23px] rounded-br-[11.23px] h-screen">
      <div className="px-[11.23px] py-[5.61px] border-b border-[#D8DEE4] flex justify-between w-full items-center h-[42.11px]">
        <div className="flex gap-[8.42px] items-center">
            <button><Image src="/icons/tab.svg" alt="tab" width={22} height={22} /></button>
        <span className="text-[12.63px] font-[656]">Michael Johnson</span>
        </div>
        <button><Image src="/icons/edit.svg" alt="edit" width={22} height={22} /></button>
      </div>
      <div className="px-[11.23px] py-[5.61px] border-b border-[#D8DEE4] flex justify-between w-full items-center h-[42.11px]">
        <div className="flex gap-[8.42px] items-center">
            <button><Image src="/icons/search.svg" alt="search" width={10} height={10} /></button>
        <input placeholder="Search Chat" className="text-[9.82px] placeholder:text-[#000000]/30 font-[556]"/>
        </div>
        <button><Image src="/icons/filter.svg" alt="filter" width={14} height={14} /></button>
      </div>
    </div>
  )
}

export default Conversations
