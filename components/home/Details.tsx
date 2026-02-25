import Image from 'next/image'

function Details() {
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
                        <div className="flex justify-between h-[26.67px] w-full items-center">
                            <div className="flex justify-between items-center w-full">
                                <span className="text-[9.82px] text-[#909090] font-[457] flex-1">Assignee</span>
                                <div className='flex gap-[5.61px] items-center flex-1'>
                                    <Image src="/icons/unassigned.svg" alt="unassigned" width={16} height={16} />
                                    <span className="text-[9.82px] font-[457]">Assignee</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between h-[26.67px] w-full items-center">
                            <div className="flex justify-between items-center w-full">
                                <span className="text-[9.82px] text-[#909090] font-[457] flex-1">Team</span>
                                <div className='flex gap-[5.61px] items-center flex-1'>
                                    <Image src="/icons/unassigned.svg" alt="unassigned" width={16} height={16} />
                                    <span className="text-[9.82px] font-[457]">Sales Team</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='border-t border-[#D8DEE4] px-[11.23px] py-[5.61px] flex flex-col gap-[2.81px]'>
                    <div className="flex justify-between h-8 w-full items-center">
                        <div className="flex justify-between items-center w-full">
                            <span className="text-[9.82px] font-[656]">Contact Data</span>
                            <Image src="/icons/down.svg" alt="down" width={14} height={14} />
                        </div>
                    </div>
                    <div className="flex justify-between h-[26.67px] w-full items-center">
                        <div className="flex justify-between items-center w-full">
                            <span className="text-[9.82px] text-[#909090] font-[457] flex-1">First Name</span>
                            <div className='flex gap-[5.61px] items-center flex-1'>
                                <span className="text-[9.82px] font-[556]">Olivia</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between h-[26.67px] w-full items-center">
                        <div className="flex justify-between items-center w-full">
                            <span className="text-[9.82px] text-[#909090] font-[457] flex-1">Last Name</span>
                            <div className='flex gap-[5.61px] items-center flex-1'>
                                <span className="text-[9.82px] font-[556]">Mckinsey</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between h-[26.67px] w-full items-center">
                        <div className="flex justify-between items-center w-full">
                            <span className="text-[9.82px] text-[#909090] font-[457] flex-1">Phone number</span>
                            <div className='flex gap-[5.61px] items-center flex-1'>
                                <span className="text-[9.82px] font-[556]">+1 (312) 555-0134</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between h-[26.67px] w-full items-center">
                        <div className="flex justify-between items-center w-full">
                            <span className="text-[9.82px] text-[#909090] font-[457] flex-1">Email</span>
                            <div className='flex gap-[5.61px] items-center flex-1'>
                                <span className="text-[9.82px] font-[556]">olivia.Mckinsey@gmail.com</span>
                            </div>
                        </div>
                    </div>
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
                        <div className='border-2 border-[#007AEC] rounded-full text-[#007AEC] text-[8.42px] font-[656] flex items-center self-start gap-[3.61px] px-[3.61px] w-[75.07px] h-[19.65px]'><Image src="/icons/tag.svg" alt="tag" width={11} height={11} />Closed Won</div>
                        <div className='border-2 border-[#007AEC] rounded-full text-[#007AEC] text-[8.42px] font-[656] flex items-center self-start gap-[3.61px] px-[3.61px] h-[19.65px]'><Image src="/icons/tag.svg" alt="tag" width={11} height={11} />Chicago</div>
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
                            <input className='placeholder:text-[#00000066]' placeholder="Add a note" />
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