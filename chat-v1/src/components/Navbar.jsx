import React from 'react'
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router'
import { BsCircleFill, BsSoundwave } from 'react-icons/bs'


const Navbar = () => {
  const navigate = useNavigate()
  const {logOut, user} = UserAuth()

  const handleSignOut = async () => {

    try {
      await logOut();
      navigate('/');
    } catch(error) {
      console.log(error.message)
    }
  }

  return (
    <div className='relative flex flex-col md:flex-row items-center bg-darkBlue h-24 md:h-14 p-2.5 justify-around md:justify-between text-white'>
      <div className='relative flex items-center gap-2 text-xl px-2 font-bold'><BsSoundwave className='relative top-[1px]'/>
        <span className='md:hidden lg:block'>WaveText</span>
      </div>
      <div className='flex flex-col mx-4 md:flex-row items-center justify-between'>
        <BsCircleFill className={`hidden mr-2 md:block md:relative md:top-[2px] md:ml-[-6px] w-2 text-white animate-pulse ${user ? null : "hidden"}`}/>
        <span className={`italic text-sm text-white/60 md:hidden animate-pulse ${user ? null : "hidden"}`}><BsCircleFill className='inline mx-2 w-2'/>online</span>
        <div className='flex items-center sm:justify-evenly gap-2.5 md:px-0'>
          <img src={user?.photoURL ? user?.photoURL : "https://bit.ly/3r8UFcS"} alt="/" className='bg-lightBlue h-[24px] w-[24px] min-w-[24px] min-h-[24px] rounded-[50%] object-cover'/>
          <span className='mr-2 ml-[-4px]'>{user?.displayName}</span>
          <button onClick={handleSignOut} className='border border-black/10 bg-darkBlue px-2 py-1 min-w-[80px] rounded-lg shadow-md 
            text-secondary text-sm hover:bg-blue hover:shadow-sm hover:scale-95 active:shadow-sm active:scale-95'>Sign Out</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar