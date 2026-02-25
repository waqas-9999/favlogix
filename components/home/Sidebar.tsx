import Image from "next/image";

type Item = {
  label: string;
  icon: string;
  count?: number;
  active?: boolean;
};

const inboxItems: Item[] = [
  { label: "My Inbox", icon: "/icons/profile.svg" },
  { label: "All", icon: "/icons/profiles.svg", count: 28 },
  { label: "Unassigned", icon: "/icons/unassigned.svg", count: 5 },
];

const teamItems: Item[] = [
  { label: "Sales", icon: "/icons/user.svg", count: 7 },
  { label: "Customer Support", icon: "/icons/user.svg", count: 16 },
];

const userItems: Item[] = [
  { label: "Sarah Williams", icon: "/icons/user.svg", count: 7 },
  {
    label: "Michael Johnson",
    icon: "/icons/user.svg",
    count: 16,
    active: true,
  },
  { label: "Emily Davis", icon: "/icons/user.svg" },
];

const channelItems: Item[] = [
  { label: "Fit4Life", icon: "/icons/whatsapp.svg" },
  { label: "Fit4Life", icon: "/icons/insta.svg" },
];

function Sidebar() {
  return (
    <div className="min-w-42 w-full bg-[#FAFAF8] rounded-tl-[11.23px] border-r border-[#0000003D] rounded-bl-[11.23px] h-[90vh]">
      <div className="px-[11.23px] py-[5.61px] flex justify-start items-center h-[42.11px]">
        <span className="text-[12.63px] font-[790]">Inbox</span>
      </div>

      <div className="flex flex-col gap-2 px-[7.02px]">

        {/* Inbox */}
        <div className="flex flex-col gap-0.5 mr-0.5">
          {inboxItems.map((item, index) => {
            if (!item.count) {
              return (
                <button key={index} className="text-[9.82px] font-[556] h-6.5">
                  <div className="items-center flex rounded-[5.61px] gap-[5.61px] px-[7.02px] text-[10.73px] font-[457]">
                    <Image src={item.icon} alt={item.label} width={14} height={14} />
                    {item.label}
                  </div>
                </button>
              );
            }

            return (
              <button
                key={index}
                className="text-[9.82px] font-[556] h-6.5 flex justify-between w-full items-center px-[7.02px]"
              >
                <div className="items-center flex rounded-[5.61px] gap-[5.61px] text-[10.73px] font-[457]">
                  <Image src={item.icon} alt={item.label} width={14} height={14} />
                  {item.label}
                </div>
                <div className="text-[#222222] font-[457] text-[8.42px] px-1 h-[11.23px]">
                  {item.count}
                </div>
              </button>
            );
          })}
        </div>

        {/* Teams Title */}
        <div className="flex justify-between items-center w-full px-[7.02px]">
          <span className="text-[9.82px] font-[556]">Teams</span>
          <Image src="/icons/down.svg" alt="down" width={14} height={14} />
        </div>

        {/* Teams */}
        <div className="flex flex-col gap-0.5">
          {teamItems.map((item, index) => (
            <button
              key={index}
              className="text-[9.82px] font-[556] h-6.5 flex justify-between w-full items-center px-[7.02px]"
            >
              <div className="items-center flex rounded-[5.61px] gap-[5.61px] text-[9.82px] font-[457]">
                <Image src={item.icon} alt={item.label} width={14} height={14} />
                {item.label}
              </div>
              <div className="text-[#222222] font-[457] text-[8.42px] h-[11.23px] px-1">
                {item.count}
              </div>
            </button>
          ))}
        </div>

        {/* Users Title */}
        <div className="flex justify-between items-center w-full px-[7.02px]">
          <span className="text-[9.82px] font-[556]">Users</span>
          <Image src="/icons/down.svg" alt="down" width={14} height={14} />
        </div>

        {/* Users */}
        <div className="flex flex-col gap-0.5">
          {userItems.map((item, index) => (
            <button
              key={index}
              className={`text-[9.82px] font-[556] h-6.5 flex justify-between w-full items-center px-[7.02px] ${
                item.active
                  ? "rounded-[5.61px] border-[0.7px] border-[#D8DEE4] bg-white shadow-[0px_1.4px_8.42px_0px_#E7EBEC]"
                  : ""
              }`}
            >
              <div className="items-center flex rounded-[5.61px] gap-[5.61px] text-[9.82px] font-[457]">
                <Image src={item.icon} alt={item.label} width={14} height={14} />
                {item.label}
              </div>

              <div className="text-[#222222] font-[457] text-[8.42px] h-[11.23px] px-1">
                {item.count ?? ""}
              </div>
            </button>
          ))}
        </div>

        {/* Channels Title */}
        <div className="flex justify-between items-center w-full px-[7.02px]">
          <span className="text-[9.82px] font-[556]">Channels</span>
          <Image src="/icons/down.svg" alt="down" width={14} height={14} />
        </div>

        {/* Channels */}
        <div className="flex flex-col gap-0.5">
          {channelItems.map((item, index) => (
            <button
              key={index}
              className="text-[9.82px] font-[556] h-6.5 flex justify-between w-full items-center px-[7.02px]"
            >
              <div className="items-center flex rounded-[5.61px] gap-[5.61px] text-[9.82px] font-[457]">
                <Image src={item.icon} alt={item.label} width={14} height={14} />
                {item.label}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;