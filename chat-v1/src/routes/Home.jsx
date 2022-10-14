import React from 'react'
import Chat from '../components/Chat'
import Sidebar from '../components/Sidebar'

const Home = () => {

  return (
    <div className='flex items-center justify-center h-screen bg-primary bg-light bg-no-repeat bg-cover'>
        <div className='flex rounded-div w-4/5 h-4/6 text-primary rounded-lg border-none overflow-hidden'>
            <Sidebar />
            <Chat />
        </div>
    </div>
  )
}

export default Home