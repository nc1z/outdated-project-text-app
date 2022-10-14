import { doc, onSnapshot } from 'firebase/firestore';
import React, { useRef } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { UserChat } from '../context/ChatContext';
import { db } from '../firebase';
import Message from './Message'


const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = UserChat();

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data?.chatId), (doc)=>{
      doc.exists() && setMessages(doc.data().messages)
    })

    return () => {
      unSub()
    }
  }, [data?.chatId])

  // Scroll into view with every new message
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({behavior:"smooth"});
  }, [messages]);

  return (
    <div className='relative h-[calc(100%_-_100px)] p-4 overflow-auto'>
        {messages.map(message =>(
          <Message key={message.id} message={message}/>
        ))}
        <div ref={ref}></div>
    </div>
  )
}

export default Messages

