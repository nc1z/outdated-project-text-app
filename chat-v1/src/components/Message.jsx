import { Timestamp } from 'firebase/firestore';
import React from 'react'
import { UserAuth } from '../context/AuthContext'
import { UserChat } from '../context/ChatContext';

const Message = ({message}) => {

  const { user } = UserAuth();
  const { data } = UserChat();

  // Convert Unix Timestamp (Retrieved from Firestore) to Date format
  const timestamp = message?.date;
  const date_val = new Date(timestamp * 1000);
  // Retrieve current date to compare message date, to show "today" or "MM-DD"
  const date_now = new Date(Timestamp.now() * 1000)

  if (message.senderId === user?.uid) {
  return ( 
    <div className='flex flex-row-reverse gap-5 mb-4'>
      {/* Message Info */}
      <div className='flex flex-col items-end'>
        <img src={message.senderId === user?.uid 
          ? user?.photoURL 
          : data.user.photoURL} alt="/" className='bg-lightBlue h-6 w-6 rounded-[50%] object-cover'/>
      </div>
      {/* Message Content */}
      <div className='flex flex-col items-end max-w-[80%] gap-2'>
        <p className='chat-bubble-right'>{message?.content}</p>
        <span className='mt-[-5px] pr-2 text-white/60 text-[0.6rem]'>
        {(date_val.getDate() === date_now.getDate()) && (date_val.getMonth() === date_now.getMonth()) ? "Today" : `${date_val.getMonth()+1}-${date_val.getDate()}`} at {date_val.getHours() < 10 ? `0${date_val.getHours()}` : date_val.getHours()}:{date_val.getMinutes() < 10 ? `0${date_val.getMinutes()}` : date_val.getMinutes()}
        </span>
        {message?.img 
        ? <img src={message?.img} alt="/" className='rounded-lg'/>
        : null}
      </div>
    </div>
    
  )} else {
  return ( 
    <div className='flex gap-5 mb-4'>
      {/* Message Info */}
      <div className='flex flex-col items-start'>
        <img src={message.senderId === user?.uid 
          ? user?.photoURL 
          : data.user.photoURL} alt="/" className='bg-lightBlue h-6 w-6 rounded-[50%] object-cover'/>
      </div>
      {/* Message Content */}
      <div className='flex flex-col max-w-[80%] gap-2'>
        <p className='chat-bubble-left'>{message?.content}</p>
        <span className='mt-[-5px] pl-2 text-white/60 text-[0.6rem]'>
        {(date_val.getDate() === date_now.getDate()) && (date_val.getMonth() === date_now.getMonth()) ? "Today" : `${date_val.getMonth()+1}-${date_val.getDate()}`} at {date_val.getHours() < 10 ? `0${date_val.getHours()}` : date_val.getHours()}:{date_val.getMinutes() < 10 ? `0${date_val.getMinutes()}` : date_val.getMinutes()}
        </span>
        {message?.img 
        ? <img src={message?.img} alt="/" className='rounded-lg'/>
        : null}
      </div>
    </div>
  )
  }
}

export default Message