"use client";

import Image from "next/image";
import { useState } from "react";

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="relative">
      <div className="px-[11.23px] py-[7.02px] bg-white rounded-[11.23px] flex justify-between items-center w-full min-h-[39.3px] gap-2">
        {/* Mobile hamburger */}
        <button
            type="button"
            onClick={() => setMobileMenuOpen((o) => !o)}
            className="md:hidden p-2 rounded-[5.61px] hover:bg-[#EFF2F2] flex items-center justify-center"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg width={20} height={20} viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
              </svg>
            ) : (
              <svg width={20} height={20} viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M2 5h16M2 10h16M2 15h16" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
              </svg>
            )}
          </button>
        {/* Left: Logo + desktop nav / mobile hamburger */}
        <div className="flex items-center gap-[5.61px] min-w-0 flex-1">
          <Image
            src="/images/Logo.svg"
            alt="Logo"
            width={81}
            height={22}
            className="shrink-0"
          />
          {/* Desktop nav — same as original */}
          <nav className="hidden md:flex items-center gap-[5.61px] flex-wrap">
            <button className="bg-[#EFF2F2] text-[9.82px] font-[556] w-[59.61px] h-5.75 items-center flex rounded-[5.61px] border-[0.7px] border-[#D8DEE4] gap-[5.61px] px-[7.02px]">
              <Image src="/icons/inbox.svg" alt="Inbox" width={14} height={14} />
              Inbox
            </button>
            <button className="text-[9.82px] font-[556] h-5.75 items-center flex rounded-[5.61px] gap-[5.61px] px-[7.02px]">
              <Image src="/icons/contact.svg" alt="Contacts" width={14} height={14} />
              Contacts
            </button>
            <button className="text-[9.82px] font-[556] h-5.75 items-center flex rounded-[5.61px] gap-[5.61px] px-[7.02px]">
              <Image src="/icons/ai.svg" alt="ai" width={14} height={14} />
              AI Employees
            </button>
            <button className="text-[9.82px] font-[556] h-5.75 items-center flex rounded-[5.61px] gap-[5.61px] px-[7.02px]">
              <Image src="/icons/workflow.svg" alt="Workflows" width={14} height={14} />
              Workflows
            </button>
            <button className="text-[9.82px] font-[556] h-5.75 items-center flex rounded-[5.61px] gap-[5.61px] px-[7.02px]">
              <Image src="/icons/campaign.svg" alt="Campaigns" width={14} height={14} />
              Campaigns
            </button>
          </nav>
        </div>

        {/* Right: Settings + user — responsive */}
        <div className="flex gap-2 items-center shrink-0">
          <button className="w-7.25 h-6.25 flex items-center justify-center" aria-label="Settings">
            <Image src="/icons/settings.svg" alt="Settings" width={14} height={14} />
          </button>
          <div className="flex items-center gap-[5.61px] pl-[5.61px] md:pl-[8.42px] md:px-[8.42px]">
            <button className="bg-[#FE3265] rounded-full w-4.75 h-4.75 text-white font-[656] text-[9.56px] shrink-0">
              M
            </button>
            <span className="font-semibold text-[9.82px] hidden sm:inline truncate max-w-[120px] md:max-w-none">
              Michael Johnson
            </span>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20 md:hidden"
            aria-hidden
            onClick={() => setMobileMenuOpen(false)}
          />
          <nav
            className="absolute top-full left-[11.23px] right-[11.23px] mt-1 z-50 md:hidden bg-white rounded-[11.23px] shadow-lg border border-[#D8DEE4] py-2 overflow-auto max-h-[70vh]"
            role="dialog"
            aria-label="Navigation menu"
          >
            <button
              className="w-full text-left text-[9.82px] font-[556] h-10 px-4 flex items-center gap-[5.61px] hover:bg-[#EFF2F2] rounded-[5.61px] mx-1 bg-[#EFF2F2] border-[0.7px] border-[#D8DEE4]"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Image src="/icons/inbox.svg" alt="" width={14} height={14} />
              Inbox
            </button>
            <button className="w-full text-left text-[9.82px] font-[556] h-10 px-4 flex items-center gap-[5.61px] hover:bg-[#EFF2F2] rounded-[5.61px] mx-1">
              <Image src="/icons/contact.svg" alt="" width={14} height={14} />
              Contacts
            </button>
            <button className="w-full text-left text-[9.82px] font-[556] h-10 px-4 flex items-center gap-[5.61px] hover:bg-[#EFF2F2] rounded-[5.61px] mx-1">
              <Image src="/icons/ai.svg" alt="" width={14} height={14} />
              AI Employees
            </button>
            <button className="w-full text-left text-[9.82px] font-[556] h-10 px-4 flex items-center gap-[5.61px] hover:bg-[#EFF2F2] rounded-[5.61px] mx-1">
              <Image src="/icons/workflow.svg" alt="" width={14} height={14} />
              Workflows
            </button>
            <button className="w-full text-left text-[9.82px] font-[556] h-10 px-4 flex items-center gap-[5.61px] hover:bg-[#EFF2F2] rounded-[5.61px] mx-1">
              <Image src="/icons/campaign.svg" alt="" width={14} height={14} />
              Campaigns
            </button>
          </nav>
        </>
      )}
    </header>
  );
}

export default Header;
