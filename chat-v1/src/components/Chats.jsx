import { doc, onSnapshot, updateDoc } from 'firebase/firestore'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { UserAuth } from '../context/AuthContext'
import { UserChat } from '../context/ChatContext'
import { db } from '../firebase'
import Notifications from './Notifications'

const Chats = () => {

  const [chats, setChats] = useState([]);
  const { dispatch, handleNav, data } = UserChat();
  const { user } = UserAuth();

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", user?.uid), (doc) => {
        setChats(doc.data());
       });
      return () => {
        unsub();
      };
    }

    user?.uid && getChats()
  }, [user?.uid])

  const handleSelect = (u, c) => {
    // Dispatch action to change user in "Data" ChatContext
    dispatch({type:"CHANGE_USER", payload: u});

    // Side-Menu status open/close
    handleNav();

    // UPDATE CURRENT USER'S SIDEBAR CHATS - NOTIFICATIONS TO "NO"
    // Current bug: updateDoc happens before dispatch update is completed.
    // Solved unncessary null/undefined userChats from creating. But still need 2 clicks to trigger.
    if (Object.entries(chats).flat().includes(data?.chatId)) {
      try {
         updateDoc(doc(db, "userChats", user?.uid), {
          [data?.chatId + ".notificationStatus"]:{
              notification: "no",
          },
        });
      } catch(error) {
        console.log(error.message)
      }
    } else {
      console.log("Error. Please Try Again")
    }
  }

  // Object.entries makes the object an array, so we can access the combinedID and nested property easily
  // Sorting based on date
  return (
    <div>
      {Object.entries(chats)?.sort((a,b) => b[1].date - a[1].date).filter(each => each[0] !== "null" && !each[0].includes("undefined") && each[1].userInfo).map((chat, idx)=>(

      <div id={idx} key={chat[0]} onClick={() => handleSelect(chat[1].userInfo, chat[1])} className='relative flex items-center gap-4 cursor-pointer p-3 px-4 hover:bg-darkBlue focus:active:bg-darkBlue'>
        <div className='w-[48px] h-[48px] object-cover'>
        <img src={chat[1].userInfo?.photoURL} alt="/" className='w-[48px] h-[48px] min-w-[48px] min-h-[48px] rounded-[50%] object-cover bg-lightBlue'/>
        </div>
        <div>
          <span className='text-secondary text-base font-semibold'>{chat[1].userInfo?.displayName}</span>
          <p className='text-sm text-white/40'>{chat[1].lastMessage?.content.substring(0,30)}{chat[1].lastMessage?.content.substring(0,30).length > 28 ? "..." : null}</p>
        </div>
        <Notifications chat={chat}/>
      </div>

      ))}
    </div>
  )
}

export default Chats