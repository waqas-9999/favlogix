"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useInbox } from "@/store/inboxStoreV2";
import { useChat } from "@/hooks/useChat";
import { SkeletonLoader, ErrorMessage } from "@/components/ui";
import SkeletonMessageBubble from "@/components/ui/SkeletonMessageBubble";

function Chat() {
    const { state } = useInbox();
    const conversationId = state.activeConversationId;

    if (!conversationId) {
        return (
            <div className="lg:min-w-116 w-full bg-[#FAFAF8] rounded-[8.42px] shadow-[0px_4px_24px_0px_#E7EBEC] h-[90vh] flex items-center justify-center">
                <p className="text-gray-500">Select a conversation to start chatting</p>
            </div>
        );
    }

    return <ChatContent conversationId={conversationId} />;
}

function ChatContent({ conversationId }: { conversationId: string }) {
    const { messages, sendMessage, isAITyping, loading, error } = useChat(conversationId);
    const bottomRef = useRef<HTMLDivElement>(null);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async () => {
        const trimmed = inputValue.trim();
        if (!trimmed) return;
        setInputValue("");
        await sendMessage(trimmed);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    if (loading)
        return (
            <div className="lg:min-w-116 w-full bg-[#FAFAF8] rounded-[8.42px] shadow-[0px_4px_24px_0px_#E7EBEC] h-[90vh] flex flex-col">
                <div className="px-[11.23px] py-[5.61px] border-b border-[#D8DEE4] flex justify-between w-full items-center h-[42.11px] shrink-0">
                    <div className="flex gap-[8.42px] items-center">
                        <span className="text-[12.63px] font-[790] p-[7.02px]">Chat</span>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto px-[11.23px] pt-[9.12px] pb-25 flex flex-col gap-[9.12px]">
                    <SkeletonMessageBubble align="left" width="60%" />
                    <SkeletonMessageBubble align="right" width="40%" />
                    <SkeletonMessageBubble align="left" width="70%" />
                    <SkeletonMessageBubble align="right" width="50%" />
                </div>
            </div>
        );
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="lg:min-w-116 w-full bg-[#FAFAF8] rounded-[8.42px] shadow-[0px_4px_24px_0px_#E7EBEC] h-[90vh] flex flex-col relative">

            {/* Header */}
            <div className="px-[11.23px] py-[5.61px] border-b border-[#D8DEE4] flex justify-between w-full items-center h-[42.11px] shrink-0">
                <div className="flex gap-[8.42px] items-center">
                    <span className="text-[12.63px] font-[790] p-[7.02px]">
                        Chat
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
                    const isUser = msg.sender === "customer";

                    return (
                        <div
                            key={msg.id}
                            className={`flex gap-[5.61px] ${!isUser ? "justify-end" : ""}`}
                        >
                            {isUser && (
                                <>
                                    <div className="bg-[#EFF2F2] rounded-[8.42px] p-[5.61px] font-[457] text-[9.82px] leading-[14.04px] max-w-1/2">
                                        {msg.content}
                                    </div>
                                    <span className="text-[7.02px] font-[457] text-[#000000]">
                                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                    </span>
                                </>
                            )}

                            {!isUser && (
                                <>
                                    <div className="flex flex-col">
                                        <span className="text-[7.02px] font-[457] text-[#000000]">
                                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                        </span>
                                        <Image
                                            src="/icons/double-tick.svg"
                                            alt="double-tick"
                                            width={11}
                                            height={11}
                                        />
                                    </div>

                                    <div className="bg-[#EDE3FD] rounded-[8.42px] p-[5.61px] font-[457] text-[9.82px] leading-[14.04px] max-w-1/2">
                                        {msg.content}
                                    </div>
                                </>
                            )}
                        </div>
                    );
                })}

                {isAITyping && (
                    <div className="flex gap-[5.61px]">
                        <div className="flex flex-col">
                            <span className="text-[7.02px] font-[457] text-[#000000]">
                                {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </span>
                        </div>
                        <div className="bg-[#EDE3FD] rounded-[8.42px] p-[5.61px] flex gap-1">
                            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
                        </div>
                    </div>
                )}

                <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="absolute left-[11.23px] right-[11.23px] bottom-[11.23px] border-[0.7px] border-[#D8DEE4] shadow-[0px_4.91px_20.35px_0px_#E7EBEC] flex flex-col justify-between min-h-[81.40px] p-[5.61px] rounded-[5.61px] bg-white">
                <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type something...."
                    className="w-full h-full text-[9.82px] font-[457] placeholder:text-[#ADADAD] px-[11.23px] py-[8.42px] outline-none bg-transparent min-h-[33.6px] resize-none"
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
                        <div className={`w-[22.45px] h-[22.45px] flex justify-center items-center transition-opacity ${inputValue.trim() ? 'opacity-100' : 'opacity-0'}`}>
                            <Image src="/icons/connect.svg" alt="connects" width={14} height={14} />
                        </div>
                        {inputValue.trim() && (
                            <button
                                onClick={handleSend}
                                disabled={isAITyping}
                                className="w-[22.45px] h-[22.45px] flex justify-center items-center disabled:opacity-50 animate-fadeIn"
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="22" y1="2" x2="11" y2="13"></line>
                                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                </svg>
                            </button>
                        )}
                        {!inputValue.trim() && (
                            <button className="w-[22.45px] h-[22.45px] flex justify-center items-center">
                                <Image src="/icons/mic.svg" alt="mic" width={14} height={14} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;
