import React from 'react'
import { IoMdVideocam, IoMdPersonAdd, IoMdMore } from 'react-icons/io'
import Messages from './Messages'
import Input from './Input'
import { UserChat } from '../context/ChatContext';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';


const Chat = () => {
  const { data, nav, handleNav, handleAlert } = UserChat();

  if (nav) {
    return (
      // Chat Div set to relative, so that child components like Input can be set to absolute to fix to the bottom of the div
      <div className='relative basis-full md:block md:basis-2/3 flex-col bg-lightBlue'>
          <div className='flex h-14 bg-grayBlue items-center justify-between p-4'>
              <div className='flex items-center gap-2'>
                <MdOutlineArrowBackIosNew className='relative top-[1px] md:hidden cursor-pointer ease-in-out duration-300 text-white/50 hover:text-white' onClick={handleNav}/>
                <span className='text-secondary text-base font-semibold'>{data.user?.displayName}</span>
              </div>
              <div className='flex gap-4 h-6 cursor-pointer pt-1 text-lg text-white/50'>
                  <IoMdVideocam onClick={handleAlert} className='hover:scale-125 hover:text-white'/>
                  <IoMdPersonAdd onClick={handleAlert} className='hover:scale-125 hover:text-white'/>
                  <IoMdMore onClick={handleAlert} className='hover:scale-125 hover:text-white'/>
              </div>
          </div>
          <Messages />
          <Input />
      </div>
    )
  } else {
    return (
      <div className='relative hidden md:block md:basis-2/3 flex-col bg-lightBlue'>
          <div className='flex h-14 bg-grayBlue items-center justify-between p-4'>
              <div className='relative flex items-center gap-2'>
                <MdOutlineArrowBackIosNew className='relative top-[1px] md:hidden cursor-pointer ease-in-out duration-300 text-white/50 hover:text-white' onClick={handleNav}/>
                <span className='text-secondary text-base font-semibold'>{data.user?.displayName}</span>
              </div>
              <div className='flex gap-4 h-6 cursor-pointer pt-1 text-lg text-white/50'>
                  <IoMdVideocam onClick={handleAlert} className='hover:scale-125 hover:text-white'/>
                  <IoMdPersonAdd onClick={handleAlert} className='hover:scale-125 hover:text-white'/>
                  <IoMdMore onClick={handleAlert} className='hover:scale-125 hover:text-white'/>
              </div>
          </div>
          <Messages />
          <Input />
      </div>
    )
  }
}

export default Chat