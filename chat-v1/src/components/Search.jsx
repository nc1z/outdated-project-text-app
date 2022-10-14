import React from 'react'
import { useState } from 'react'
import { collection, getDocs, setDoc, updateDoc, serverTimestamp, getDoc, doc } from "firebase/firestore";
import { db } from '../firebase';
import { useEffect } from 'react';
import { UserAuth } from '../context/AuthContext';

const Search = () => {
  const [searchtext, setSearchText] = useState('')
  const [allUsers, setAllUsers] = useState([])
  const { user } = UserAuth()

  // PRELOAD USER DATA - Init & store in allUsers state (not scalable but temp measure)
  useEffect(() => {
    try {
    const colref = collection(db, 'users')
    getDocs(colref).then((snapshot) => {
      let datalist = []
      snapshot.docs.forEach((doc)=>{
        datalist.push({ ...doc.data() })
      })
      setAllUsers(datalist)
    })} catch(error) {
      console.log(error.message)
    }
  }, [])

  // CHAT SELECTION OR CREATION
  const handleSelect = async (users) => {
    // Check if chat exists between user and target user in firestore, else create
    const combinedId = user?.uid > users?.uid 
    ? user?.uid + users?.uid 
    : users?.uid + user?.uid

    try {
      const response = await getDoc(doc(db, "chats", combinedId))

      if(!response.exists()) {
        // Clear Searched Users and Search field. Target User data has already been sent
        setSearchText('')

        // CREATE CHAT in "chats"
        await setDoc(doc(db, "chats", combinedId),{ messages: [] });

        // UPDATE userChats for USER
        await updateDoc(doc(db, "userChats", user?.uid), {
          [combinedId + ".userInfo"]: {
            uid:users?.uid,
            displayName: users?.displayName,
            photoURL: users?.photoURL
          },
          [combinedId+".date"]: serverTimestamp()
        })

        // UPDATE userChats for TARGET USER
        await updateDoc(doc(db, "userChats", users?.uid), {
          [combinedId + ".userInfo"]: {
            uid:user?.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          },
          [combinedId+".date"]: serverTimestamp()
        })

      }
    } catch(error) {
      console.log(error.message)
    }
  };

  return (
    <div className='border-b border-darkBlue overflow-auto'>
      <div>
        <input onChange={(e) => setSearchText(e.target.value)} value={searchtext} type="text" className='bg-transparent text-secondary p-2 px-4 w-full focus:outline-none 
        placeholder:text-white/60 placeholder:pl-2' placeholder='Search users'/>
      </div>
      {searchtext 
      ? (allUsers
      .filter((users) => {
        if (searchtext==='') {
          return users
        } else if (users.displayName.toLowerCase().includes(searchtext.toLowerCase())) {
          return users
        } else {
          return null
        }
      })
      .map((users) => (
        <div users={users} onClick={() => handleSelect(users)} key={users?.uid} className='flex items-center gap-4 cursor-pointer p-4 hover:bg-darkBlue'>
          <img src={users?.photoURL} alt="/" className='w-12 h-12 rounded-[50%] object-cover bg-lightBlue'/>
          <div>
            <span className='text-secondary'>{users?.displayName}</span>
          </div>
        </div>
      ))
      )
      : null}
    </div>
  )
}

export default Search
