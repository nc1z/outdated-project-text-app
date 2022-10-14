import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import { BsImage } from 'react-icons/bs'
import { FiPaperclip } from 'react-icons/fi'
import { IoIosSend } from 'react-icons/io'
import { db, storage } from '../firebase'
import { v4 as uuid } from "uuid";
import { UserAuth } from '../context/AuthContext'
import { UserChat } from '../context/ChatContext'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'


const Input = () => {
    const [content, setContent] = useState('')
    const [img, setImg] = useState(null);
    const { user } = UserAuth();
    const { data, handleAlert } = UserChat();

    const handleSend = async () => {

        // If there's image, upload the image and store downloadURL in img prop.
        // Else store text content. UUID is for random identifier for each msg
        setContent('');
        setImg(null);
        if(img) {
            const storageRef = ref(storage, uuid());

            const uploadTask = uploadBytesResumable(storageRef, img);

            uploadTask.on(
                (error) => {
                console.log(error.message)
                },
                () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    await updateDoc(doc(db, "chats", data.chatId), {
                    messages: arrayUnion({
                        id: uuid(),
                        content,
                        senderId: user?.uid,
                        date: Timestamp.now(),
                        img: downloadURL,
                    }),
                    });
                });
                }
            );
        
        } else {
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    content,
                    senderId: user?.uid,
                    date: Timestamp.now(),
                })
            })

        }

        // UPDATE CURRENT USER'S SIDEBAR CHATS
        await updateDoc(doc(db, "userChats", user?.uid), {
            [data.chatId + ".lastMessage"]:{
                content,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });

        // UPDATE TARGET USER'S SIDEBAR CHATS
        await updateDoc(doc(db, "userChats", data.user?.uid), {
            [data.chatId + ".lastMessage"]:{
                content,
            },
            [data.chatId + ".notificationStatus"]:{
                notification: "yes",
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });

    };

    const handleKey = (e) => {
        e.code === "Enter" && handleSend();
    };

  return (
    <div className='absolute bottom-0 w-full flex items-center justify-between h-12 px-1 pr-4 bg-grayBlue'>
        <input type="text" placeholder='Message' onChange={(e) => setContent(e.target.value)} value={content} onKeyDown={handleKey} className="w-full py-1 mr-2 focus:outline-none pl-1 bg-lightBlue rounded-lg pl-2 mx-2 text-secondary"/>
        <div className='flex gap-2 items-center'>
            <FiPaperclip onClick={handleAlert} className='text-white/50 cursor-pointer hover:text-white hover:scale-125'/>
            <input type="file" className='hidden' id='file' onChange={(e) => setImg(e.target.files[0])}/>
            <label htmlFor="file" className='cursor-pointer hover:scale-125'>
                <BsImage className='text-white/50 hover:text-white'/>
            </label>
            {img ? (<span className='text-white'>{img.type}</span>) : null}
            {content || img 
            ? (<button onClick={handleSend} className='relative h-6 w-6 rounded-[50%] bg-white animate-bounce hover:bg-emerald-400'><IoIosSend className='relative left-[3px] text-primary'/></button>) 
            : null}
        </div>
    </div>
  )
}

export default Input