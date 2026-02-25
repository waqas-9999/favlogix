"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type Message = {
    id: number;
    text: string;
    time: string;
    sender: "user" | "bot";
};

const messages: Message[] = [
    {
        id: 1,
        text: "Hi, I recently joined Fit4Life and I’m trying to access my workout plan, but I can’t login. Can you help?",
        time: "23:08",
        sender: "user",
    },
    {
        id: 2,
        text: "Hello Olivia 👋 I’m Michael, your AI customer support assistant. Let’s fix this quickly. Could you confirm the email address?",
        time: "23:08",
        sender: "bot",
    },
    {
        id: 3,
        text: "Yes, it’s olivia.Mckinsey@gmail.com",
        time: "23:16",
        sender: "user",
    },
    {
        id: 4,
        text: "Thanks! Looks like your reset wasn’t completed. I’ve sent a new link - please check your inbox.",
        time: "23:16",
        sender: "bot",
    },
    {
        id: 5,
        text: "I see it. resetting now…",
        time: "23:17",
        sender: "user",
    },
    {
        id: 6,
        text: "Done! I’m logged in. Thanks!",
        time: "23:20",
        sender: "user",
    },
    {
        id: 7,
        text: "Perfect 🎉 Your plan is ready under “My Programs”. Since you’re starting out, I suggest our Premium Guide - it boosts results and is 20% off here 👉 www.Fit4Life.com/Premium",
        time: "23:20",
        sender: "bot",
    },
    {
        id: 8,
        text: "Oh my god 😍 I’ll try it ASAP, thank you so much!!",
        time: "23:23",
        sender: "user",
    },
];

function Chat() {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    return (
        <div className="min-w-116 w-full bg-[#FAFAF8] rounded-[8.42px] shadow-[0px_4px_24px_0px_#E7EBEC] h-[90vh] flex flex-col relative">

            {/* Header */}
            <div className="px-[11.23px] py-[5.61px] border-b border-[#D8DEE4] flex justify-between w-full items-center h-[42.11px] shrink-0">
                <div className="flex gap-[8.42px] items-center">
                    <span className="text-[12.63px] font-[790] p-[7.02px]">
                        Olivia Mckinsey
                    </span>
                </div>

                <div className="flex gap-[5.61px]">
                    <button className="bg-[#EBEBEB] rounded-[5.61px] w-[22.46px] h-[22.46px] flex justify-center items-center">
                        <Image src="/icons/menu-dots.svg" alt="menu-dots" width={14} height={14} />
                    </button>
                    <button className="bg-[#EBEBEB] rounded-[5.61px] w-[22.46px] h-[22.46px] flex justify-center items-center">
                        <Image src="/icons/sleep.svg" alt="sleep" width={14} height={14} />
                    </button>
                    <button className="bg-[#000000] rounded-[5.61px] w-[22.46px] h-[22.46px] flex justify-center items-center">
                        <Image src="/icons/archive.svg" alt="archive" width={14} height={14} />
                    </button>
                </div>
            </div>

            {/* Scrollable Messages */}
            <div className="flex-1 overflow-y-auto px-[11.23px] pt-[9.12px] pb-25 flex flex-col gap-[9.12px]">

                {messages.map((msg) => {
                    const isUser = msg.sender === "user";

                    return (
                        <div
                            key={msg.id}
                            className={`flex gap-[5.61px] ${!isUser ? "justify-end" : ""}`}
                        >
                            {isUser && (
                                <>
                                    <div className="bg-[#EFF2F2] rounded-[8.42px] p-[5.61px] font-[457] text-[9.82px] leading-[14.04px] max-w-1/2">
                                        {msg.text}
                                    </div>
                                    <span className="text-[7.02px] font-[457] text-[#000000]">
                                        {msg.time}
                                    </span>
                                </>
                            )}

                            {!isUser && (
                                <>
                                    <div className="flex flex-col">
                                        <span className="text-[7.02px] font-[457] text-[#000000]">
                                            {msg.time}
                                        </span>
                                        <Image
                                            src="/icons/double-tick.svg"
                                            alt="double-tick"
                                            width={11}
                                            height={11}
                                        />
                                    </div>

                                    <div className="bg-[#EDE3FD] rounded-[8.42px] p-[5.61px] font-[457] text-[9.82px] leading-[14.04px] max-w-1/2">
                                        {msg.text}
                                    </div>
                                </>
                            )}
                        </div>
                    );
                })}

                <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="absolute left-[11.23px] right-[11.23px] bottom-[11.23px] border-[0.7px] border-[#D8DEE4] shadow-[0px_4.91px_20.35px_0px_#E7EBEC] flex flex-col justify-between min-h-[81.40px] p-[5.61px] rounded-[5.61px] bg-white">
                <input
                    placeholder="Type something...."
                    className="w-full h-full text-[9.82px] font-[457] placeholder:text-[#ADADAD] px-[11.23px] py-[8.42px] outline-none bg-transparent min-h-[33.6px]"
                />
                <div className="flex justify-between w-full items-center">
                    <div className="flex items-center gap-0.5">
                        <div className="w-[22.45px] h-[22.45px] flex justify-center items-center"><Image src="/icons/img.svg" alt="img" width={14} height={14} /></div>
                        <div className="w-[22.45px] h-[22.45px] flex justify-center items-center"><Image src="/icons/video.svg" alt="video" width={14} height={14} /></div>
                        <div className="w-[22.45px] h-[22.45px] flex justify-center items-center"><Image src="/icons/docs.svg" alt="docs" width={14} height={14} /></div>
                        <div className="w-[22.45px] h-[22.45px] flex justify-center items-center"><Image src="/icons/emoji.svg" alt="emoji" width={14} height={14} /></div>
                        <div className="w-[22.45px] h-[22.45px] flex justify-center items-center"><Image src="/icons/share.svg" alt="share" width={14} height={14} /></div>
                    </div>
                    <div className="flex items-center gap-0.5">
                        <div className="w-[22.45px] h-[22.45px] flex justify-center items-center"><Image src="/icons/connect.svg" alt="connects" width={14} height={14} /></div>
                        <div className="w-[22.45px] h-[22.45px] flex justify-center items-center"><Image src="/icons/mic.svg" alt="mic" width={14} height={14} /></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;