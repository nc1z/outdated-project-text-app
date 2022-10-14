import React from 'react'
import { BsCircleFill } from 'react-icons/bs'

const Notifications = ({chat}) => {

  return (
    <div>
        <BsCircleFill className={`md:relative md:top-[2px] md:mr-4 md:ml-[-2px] w-2 h-2 text-sm text-white animate-pulse ${chat[1].notificationStatus?.notification === 'yes' ? "block" : "hidden"}`}/>
    </div>
  )
}

export default Notifications