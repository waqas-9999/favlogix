import Image from "next/image";

type ConversationItem = {
  id: number;
  name: string;
  time: string;
  message: string;
  avatarLetter: string;
  avatarColor: string;
  active?: boolean;
};

const conversations: ConversationItem[] = [
  {
    id: 1,
    name: "Olivia Mckinsey",
    time: "23:23",
    message: "Oh my god 😍 I’ll try it ASAP, thank..",
    avatarLetter: "O",
    avatarColor: "#A592F5",
    active: true,
  },
  {
    id: 2,
    name: "Sara Williams",
    time: "23:16",
    message: "Good Evening, Emily! Hope you are..",
    avatarLetter: "E",
    avatarColor: "#FBD966",
  },
  {
    id: 3,
    name: "Frank Thompson",
    time: "22:28",
    message: "Thank you for signing up Frank! If t..",
    avatarLetter: "E",
    avatarColor: "#99BBF6",
  },
];

function Conversations() {
  return (
    <div className="min-w-62.25 w-full bg-[#FAFAF8] rounded-tr-[11.23px] rounded-br-[11.23px] h-auto lg:h-[90vh]">
      
      {/* Header */}
      <div className="px-[11.23px] py-[5.61px] border-b border-[#D8DEE4] flex justify-between w-full items-center h-[42.11px]">
        <div className="flex gap-[8.42px] items-center">
          <button>
            <Image src="/icons/tab.svg" alt="tab" width={22} height={22} />
          </button>
          <span className="text-[12.63px] font-[656]">
            Michael Johnson
          </span>
        </div>
        <button>
          <Image src="/icons/edit.svg" alt="edit" width={22} height={22} />
        </button>
      </div>

      <div className="px-[8.42px] py-[5.61px]">
        
        {/* Search */}
        <div className="px-[11.23px] py-[5.61px] flex justify-between w-full items-center h-[42.11px]">
          <div className="flex gap-[8.42px] items-center">
            <button>
              <Image src="/icons/search.svg" alt="search" width={10} height={10} />
            </button>
            <input
              placeholder="Search Chat"
              className="text-[9.82px] placeholder:text-[#000000]/30 font-[556]"
            />
          </div>
          <button>
            <Image src="/icons/filter.svg" alt="filter" width={14} height={14} />
          </button>
        </div>

        {/* Filters */}
        <div className="flex justify-between h-8 w-full items-center">
          <div className="flex items-center w-full px-[7.02px]">
            <span className="text-[9.82px] font-[656]">Open</span>
            <Image src="/icons/down.svg" alt="down" width={14} height={14} />
          </div>
          <div className="flex items-center justify-end w-full px-[7.02px]">
            <span className="text-[9.82px] font-[656]">Newest</span>
            <Image src="/icons/down.svg" alt="down" width={14} height={14} />
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex flex-col gap-[2.81px]">
          {conversations.map((item) => (
            <div
              key={item.id}
              className={`${
                item.active
                  ? "border-[0.7px] border-[#0000001F] shadow-[0px_2.81px_8.42px_0px_#E7EBEC]"
                  : ""
              } bg-[#FFFFFF] rounded-[5.61px] h-12.5 px-[8.42px] py-[5.61px] flex items-center gap-[8.42px] w-full`}
            >
              <div
                className="w-[19.65px] h-[19.65px] rounded-full flex justify-center items-center text-[9.82px] font-[556]"
                style={{ backgroundColor: item.avatarColor }}
              >
                {item.avatarLetter}
              </div>

              <div className="flex flex-col w-full">
                <div className="flex w-full items-start justify-between">
                  <span className="text-[9.82px] font-[656]">
                    {item.name}
                  </span>
                  <span className="text-[7.72px] text-[#000000CC] font-[556]">
                    {item.time}
                  </span>
                </div>

                <span className="text-[9.82px] font-[457] text-[#00000080]">
                  {item.message}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Conversations;