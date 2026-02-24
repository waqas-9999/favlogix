import Image from 'next/image'

function Header() {
  return (
    <div className='px-[11.23px] py-[7.02px] bg-white rounded-[11.23px] flex justify-between w-full min-h-[39.3px]'>
      <div className='flex items-center gap-[5.61px]'>
        <Image
          src="/images/Logo.svg"
          alt="Logo"
          width={81}
          height={22}
        />
        <button className='bg-[#EFF2F2] text-[9.82px] font-[556] w-[59.61px] h-5.75 items-center flex rounded-[5.61px] border-[0.7px] border-[#D8DEE4] gap-[5.61px] px-[7.02px]'>
          <Image src="/icons/inbox.svg" alt="Inbox" width={14} height={14} />
          Inbox
        </button>
        <button className='text-[9.82px] font-[556] h-5.75 items-center flex rounded-[5.61px] gap-[5.61px] px-[7.02px]'>
          <Image src="/icons/contact.svg" alt="Contacts" width={14} height={14} />
          Contacts
        </button>
        <button className='text-[9.82px] font-[556] h-5.75 items-center flex rounded-[5.61px] gap-[5.61px] px-[7.02px]'>
          <Image src="/icons/ai.svg" alt="ai" width={14} height={14} />
          AI Employees
        </button>
        <button className='text-[9.82px] font-[556] h-5.75 items-center flex rounded-[5.61px] gap-[5.61px] px-[7.02px]'>
          <Image src="/icons/workflow.svg" alt="Workflows" width={14} height={14} />
          Workflows
        </button>
        <button className='text-[9.82px] font-[556] h-5.75 items-center flex rounded-[5.61px] gap-[5.61px] px-[7.02px]'>
          <Image src="/icons/campaign.svg" alt="Campaigns" width={14} height={14} />
          Campaigns
        </button>
      </div>
      <div className='flex items-center'>
        <button className='w-7.25 h-6.25'><Image src="/icons/settings.svg" alt="Settings" width={14} height={14} /></button>
        <div className='flex items-center gap-[5.61px] px-[8.42px]'>
          <button className='bg-[#FE3265] rounded-full w-4.75 h-4.75 text-white font-[656] text-[9.56px]'>M</button>
          <span className='font-semibold text-[9.82px] '>Michael Johnson</span>
        </div>
      </div>
    </div>
  )
}

export default Header