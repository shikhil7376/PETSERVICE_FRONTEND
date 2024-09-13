import React from 'react'
import Header from './Header'
import ChatList from './ChatList'
import ChatBox from './ChatBox'
import { useState } from 'react'
const ChatPage = () => {

    const [activeChat, setActiveChat] = useState(null); 
    const [notification,setNotification] = useState([])

    
  return (
    <div className=' bg-black h-screen'>
      <Header/>
      <div className='flex justify '>
      <ChatList setActiveChat={setActiveChat} notification ={notification} setNotification={setNotification}/>
      <ChatBox activeChat={activeChat} notification ={notification} setNotification={setNotification}/>
      </div>
    </div>
  )
}

export default ChatPage
