import React from 'react'
import Header from './Header'
import ChatList from './ChatList'
import ChatBox from './ChatBox'
import { useState } from 'react'
const ChatPage = () => {

    const [activeChat, setActiveChat] = useState(null); // Active chat state


    console.log('activechat',activeChat);
    
  return (
    <div className=' bg-black h-screen'>
      <Header/>
      <div className='flex justify '>
      <ChatList setActiveChat={setActiveChat}/>
      <ChatBox activeChat={activeChat}/>
      </div>
    </div>
  )
}

export default ChatPage
