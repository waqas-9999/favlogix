"use client";

import Image from "next/image";
import React from "react";

const Line = ({ w, h = 8 }: { w: string; h?: number }) => (
  <div
    className="bg-[#D9D9D9] animate-pulse rounded"
    style={{ width: w, height: h }}
  />
);

export default function SkeletonDetailsPanel() {
  return (
    <div className="flex flex-col gap-[5.61px]">

      {/* HEADER */}
      <div>
        <div className="px-[11.23px] py-[5.61px] border-b border-[#D8DEE4] flex justify-between items-center h-[42.11px]">
          <span className="text-[12.63px] font-[656]">
            Details
          </span>
          <Image src="/icons/tab.svg" alt="tab" width={22} height={22} />
        </div>

        {/* CHAT DATA */}
        <div className="px-[11.23px] py-[5.61px]">
          <div className="flex justify-between items-center h-8">
            <Line w="40px" h={6} />
            <Image src="/icons/down-s.svg" alt="person" width={14} height={14} />
          </div>

          <div className="flex flex-col gap-[2.81px] mt-[2.81px]">
            {[1, 2].map((i) => (
              <div key={i} className="flex justify-between items-center h-[26.67px]">
                <div className="flex-1"><Line w="40px" h={6} /></div>
                <div className="flex items-center flex-1 gap-[5.61px]">
                  {/* <div className="w-[16px] h-[16px] rounded-full bg-[#D9D9D9] animate-pulse" /> */}
                  <Image src="/icons/person-g.svg" alt="person" width={16} height={16} />
                  <Line w="40px" h={6} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CONTACT DATA */}
      <div className="border-t border-[#D8DEE4] px-[11.23px] py-[5.61px] flex flex-col gap-[2.81px]">
        <div className="flex justify-between items-center h-8">
          <Line w="40px" h={6} />
          <Image src="/icons/down-s.svg" alt="person" width={14} height={14} />
        </div>
        <div className="flex justify-between items-center h-8">
          <div className="flex-1"><Line w="40px" h={6} /></div>
          <div className="flex-1"><Line w="40px" h={6} /></div>
        </div>

        {[1, 2].map((i) => (
          <div key={i} className="flex justify-between items-center h-[26.67px]">
            <div className="flex-1"><Line w="40px" h={6} /></div>
            <div className="flex-1"><Line w="40px" h={6} /></div>
          </div>
        ))}

        <div className="flex items-center h-[26.67px]">
          <span className="text-[9.82px] text-[#000000] font-[656] flex-1">See all</span>
        </div>
      </div>

      {/* CONTACT LABELS */}
      <div className="border-t border-[#D8DEE4] px-[11.23px] py-[5.61px] flex flex-col gap-[2.81px]">
        <div className="flex justify-between items-center h-8">
          <Line w="40px" h={6} />
          <Image src="/icons/down-s.svg" alt="person" width={14} height={14} />
        </div>

        <div className="flex gap-[4.21px]">
          <div className="h-[19.65px] w-[68.5px] border border-[#D0D0D0] rounded-full bg-[#F0F1EF] animate-pulse flex items-center px-1 gap-1" >
            <Image src="/icons/tag-w.svg" alt="tag-w" width={9} height={9} />
            <Line w="40px" h={6} />
          </div>
          <div className="h-[19.65px] w-[68.5px] border border-[#D0D0D0] rounded-full bg-[#F0F1EF] animate-pulse flex items-center px-1 gap-1" >
            <Image src="/icons/tag-w.svg" alt="tag-w" width={9} height={9} />
            <Line w="40px" h={6} />
          </div>
          <div className="w-[19.09px] h-[19.09px] border border-[#D0D0D0] rounded-full bg-[#F0F1EF] animate-pulse flex justify-center items-center" >
            <Image src="/icons/add-w.svg" alt="add-w" width={9} height={9} />
          </div>
        </div>
      </div>

      {/* NOTES */}
      <div className="border-t border-[#D8DEE4] px-[11.23px] py-[5.61px] flex flex-col gap-[2.81px]">
        <div className="flex justify-between items-center w-full">
          <span className="text-[9.82px] font-[656]">Notes</span>
          <Image src="/icons/down.svg" alt="down" width={14} height={14} />
        </div>

        <div className="flex flex-col mt-2 gap-[4.21px]">
          <div className="h-[25.26px] p-[7px] rounded-[5.61px] bg-[#F0F1EF] animate-pulse" >
            <Line w="40px" h={6} />
          </div>
          <div className="h-[25.26px] p-[7px] rounded-[5.61px] bg-[#F0F1EF] animate-pulse" >
            <Line w="165px" h={6} />
          </div>
        </div>
      </div>

      {/* OTHER CHATS */}
      <div className="border-t border-[#D8DEE4] px-[11.23px] py-[5.61px] flex flex-col gap-[2.81px]">
        <div className="flex justify-between items-center h-5">
          <Line w="40px" h={6} />
          <Image src="/icons/down-s.svg" alt="person" width={14} height={14} />
        </div>

        <div className="flex w-full h-[43.64px] gap-[4.21px] items-center">
          <div className="w-[17px] h-[17px] rounded-full bg-[#D9D9D9] animate-pulse" />
          <div className="flex flex-col w-full gap-[4px]">
            <div className="flex justify-between w-full">
              <Line w="40px" h={6} />
              <Line w="52px" />
            </div>
            <Line w="52px" h={6}/>
          </div>
        </div>
      </div>

    </div>
  );
}