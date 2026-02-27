"use client";

import Image from 'next/image';
import { useInbox } from "@/store/inboxStoreV2";
import { useConversations } from "@/hooks/useConversations";
import { useEffect, useState } from 'react';
import * as userService from '@/services/userService';

function Details() {
    const { state } = useInbox();
    const { conversations } = useConversations("all");
    
    const activeConv = conversations.find(c => c.id === state.activeConversationId);
    const [fullUser, setFullUser] = useState<any | null>(null);

    useEffect(() => {
        let mounted = true;
        if (activeConv) {
            const id = activeConv.id;
            userService.getUserById(Number(id))
                .then((u) => {
                    if (mounted) setFullUser(u);
                })
                .catch(() => {
                    if (mounted) setFullUser(null);
                });
        } else {
            setFullUser(null);
        }
        return () => { mounted = false };
    }, [activeConv]);

    if (!activeConv) {
        return (
            <div className="min-w-[294.03px] flex-1 bg-[#FAFAF8] rounded-[11.23px] h-[90vh] flex items-center justify-center">
                <p className="text-gray-500">Select a conversation</p>
            </div>
        );
    }

    const CHAT_DATA_ITEMS = [
        { label: 'Assignee', value: activeConv.assignee?.name || 'Unassigned', withIcon: true },
        { label: 'Team', value: activeConv.team === 'sales' ? 'Sales Team' : 'Customer Support Team', withIcon: true },
    ] as const

    const CONTACT_DATA_ITEMS = [
        { label: 'Name', value: fullUser?.name || activeConv.contactName },
        { label: 'Email', value: fullUser?.email || activeConv.contactName + '@example.com' },
        { label: 'Phone', value: fullUser?.phone || 'N/A' },
    ] as const

    const CONTACT_LABELS = activeConv.label ? [activeConv.label, activeConv.channel] : [activeConv.channel] as const

    return (
        <div className="min-w-[294.03px] flex-1 bg-[#FAFAF8] rounded-[11.23px] h-[90vh]">

            {/* Header */}
            <div className="px-[11.23px] py-[5.61px] border-b border-[#D8DEE4] flex justify-between w-full items-center h-[42.11px]">
                <div className="flex gap-[8.42px] items-center">

                    <span className="text-[12.63px] font-[656]">
                        Details
                    </span>
                </div>
                <button>
                    <Image src="/icons/tab.svg" alt="tab" width={22} height={22} />
                </button>
            </div>
            <div className='flex flex-col gap-[5.61px]'>
                <div className='px-[11.23px] py-[5.61px]'>
                    <div className="flex justify-between h-8 w-full items-center">
                        <div className="flex justify-between items-center w-full">
                            <span className="text-[9.82px] font-[656]">Chat Data</span>
                            <Image src="/icons/down.svg" alt="down" width={14} height={14} />
                        </div>
                    </div>
                    <div className='flex flex-col gap-[2.81px]'>
                        {CHAT_DATA_ITEMS.map(({ label, value, withIcon }) => (
                            <div key={label} className="flex justify-between h-[26.67px] w-full items-center">
                                <div className="flex justify-between items-center w-full">
                                    <span className="text-[9.82px] text-[#909090] font-[457] flex-1">{label}</span>
                                    <div className='flex gap-[5.61px] items-center flex-1'>
                                        {withIcon && <Image src="/icons/unassigned.svg" alt="unassigned" width={16} height={16} />}
                                        <span className="text-[9.82px] font-[457]">{value}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='border-t border-[#D8DEE4] px-[11.23px] py-[5.61px] flex flex-col gap-[2.81px]'>
                    <div className="flex justify-between h-8 w-full items-center">
                        <div className="flex justify-between items-center w-full">
                            <span className="text-[9.82px] font-[656]">Contact Data</span>
                            <Image src="/icons/down.svg" alt="down" width={14} height={14} />
                        </div>
                    </div>
                    {CONTACT_DATA_ITEMS.map(({ label, value }) => (
                        <div key={label} className="flex justify-between h-[26.67px] w-full items-center">
                            <div className="flex justify-between items-center w-full">
                                <span className="text-[9.82px] text-[#909090] font-[457] flex-1">{label}</span>
                                <div className='flex gap-[5.61px] items-center flex-1'>
                                    <span className="text-[9.82px] font-[556]">{value}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-between h-[26.67px] w-full items-center">
                        <div className="flex justify-between items-center w-full">
                            <span className="text-[9.82px] text-[#000000] font-[656] flex-1">See all</span>

                        </div>
                    </div>
                </div>
                <div className='border-t border-[#D8DEE4] px-[11.23px] py-[5.61px] flex flex-col gap-[2.81px]'>
                    <div className="flex justify-between h-8 w-full items-center">
                        <div className="flex justify-between items-center w-full">
                            <span className="text-[9.82px] font-[656]">Contact Labels</span>
                            <Image src="/icons/down.svg" alt="down" width={14} height={14} />
                        </div>
                    </div>
                    <div className='flex gap-[4.21px]'>
                        {CONTACT_LABELS.map((label, i) => (
                            <div
                                key={label}
                                className={`border-2 border-[#007AEC] rounded-full text-[#007AEC] text-[8.42px] font-[656] flex items-center self-start gap-[3.61px] px-[3.61px] h-[19.65px] ${i === 0 ? 'w-[75.07px]' : ''}`}
                            >
                                <Image src="/icons/tag.svg" alt="tag" width={11} height={11} />
                                {label}
                            </div>
                        ))}
                        <div className='w-[19.09px] h-[19.09px] rounded-full border-2 border-[#007AEC] flex items-center justify-center'>
                            <Image src="/icons/add.svg" alt="add" width={9} height={9} />
                        </div>
                    </div>
                </div>
                <div className='border-t border-[#D8DEE4] px-[11.23px] py-[5.61px] flex flex-col gap-[2.81px]'>
                    <div className="flex justify-between h-8 w-full items-center">
                        <div className="flex justify-between items-center w-full">
                            <span className="text-[9.82px] font-[656]">Notes</span>
                            <Image src="/icons/down.svg" alt="down" width={14} height={14} />
                        </div>
                    </div>
                    <div className='flex flex-col gap-[4.21px]'>
                        <div className='bg-[#F5E096] rounded-[5.61px] text-[#007AEC] text-[8.42px] font-[656] flex items-center gap-[3.61px] px-[7.02px] w-full h-[25.26px]'>
                            <input className='placeholder:text-[#00000066] bg-transparent outline-none' placeholder="Add a note" />
                        </div>
                        <div className='bg-[#F5E096] rounded-[5.61px] text-[#000000] text-[8.42px] font-[457] flex items-center gap-[3.61px] px-[7.02px] w-full h-[25.26px]'>Strong potential for future upgrades </div>

                    </div>
                </div>
                <div className='border-t border-[#D8DEE4] px-[11.23px] py-[5.61px] flex flex-col gap-[2.81px]'>
                    <div className="flex justify-between h-8 w-full items-center">
                        <div className="flex justify-between items-center w-full">
                            <span className="text-[9.82px] font-[656]">Other Chats</span>
                            <Image src="/icons/down.svg" alt="down" width={14} height={14} />
                        </div>
                    </div>
                    <div className='flex w-full h-[43.64px] gap-[4.21px]'>

                        <div>
                            <Image src="/icons/insta.svg" alt="down" width={17} height={17} />
                        </div>
                        <div className='flex flex-col w-full'>
                            <div className='flex justify-between items-center w-full'>
                                <span className="text-[9.82px] font-medium">Fit4LIfe</span>
                                <span className="text-[8.42px] font-[656]">08/08/25</span>
                            </div>
                            <span className='text-[8.42px] text-[#00000080] font-[457]'>On my way!</span>
                        </div>


                    </div>
                </div>
            </div>

        </div>
    )
}

export default Details
