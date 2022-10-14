import Navbar from './Navbar'
import Search from './Search'
import Chats from './Chats'
import { UserChat } from '../context/ChatContext'


const Sidebar = () => {
  const { nav } = UserChat();

  if(nav) {
    return (
      <div className='hidden bg-blue md:block md:basis-1/3'>
          <Navbar />
          <div className='overflow-y-auto max-h-[80%]'>
            <Search />
            <Chats />
          </div>
      </div>
      )
  } else {
    return (
      <div className='basis-full bg-blue md:basis-1/3'>
          <Navbar />
          <div className='overflow-y-auto max-h-[80%]'>
            <Search />
            <Chats />
          </div>
      </div>
    )
  }
}

export default Sidebar