import React from 'react'
import { getMessages,sendMessage } from '../../Api/chat';
import { useState,useEffect } from 'react';
import { RootState } from '../../Redux/Store';
import { useSelector } from 'react-redux';
import io from 'socket.io-client'

interface Message {
    id: string;
    content: string;
    sender:{
        _id:string
    } ;
    timestamp: string; // Adjust properties as needed
  }

  const ENDPOINT = "http://localhost:8000"

  var socket,selectedChatCompare

const ChatBox = ( {activeChat }) => {
  
    const userData = useSelector((state: RootState) => state.user.userdata);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [socketConnected,setSocketConnected] = useState(false)

  
    useEffect(()=>{
        socket = io(ENDPOINT)
        socket.emit("setup",userData)
        socket.on("connection",()=>setSocketConnected(true))
     },[])

    useEffect(() => {
        if (activeChat) {
          fetchMessages();
          selectedChatCompare = activeChat
        }
      }, [activeChat]);

      useEffect(()=>{
         socket.on("messagerecieved",(newMessageRecieved)=>{
            if(!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id){
                //give notification
            }else{
                setMessages([...messages,newMessageRecieved])
            }
         }) 
      })

    

    const fetchMessages = async () => {
        try {
          const response = await getMessages(activeChat._id);
          setMessages(response?.data);
          console.log('Fetched Messages:', response?.data); // Log fetched messages for debugging
        socket.emit('joinchat',activeChat._id)
        } catch (error) {
          console.error('Error fetching messages', error);
        }
      };

      const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim() && activeChat) {
          try {
            if(userData){
                const response = await sendMessage(userData?._id, newMessage, activeChat._id);
                socket.emit('newmessage',response?.data.data)
                
                fetchMessages()
                setNewMessage(''); 
            }
          } catch (error) {
            console.error('Error sending message', error);
          }
        }
      };
    
  return (
    <div className='bg-contentgray ml-3 rounded-lg h-[90vh] w-full'>
      {activeChat ? (
        <div className='p-4'>
          <div className='h-[80vh] overflow-y-auto scrollbar-hide'>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex mb-2 ${
                  message.sender?._id === userData?._id ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`p-2 rounded-lg ${
                    message?.sender._id  === userData?._id
                      ? 'bg-green-500 text-white max-w-[70%] text-right'
                      : 'bg-gray-600 text-white max-w-[70%] text-left'
                  }`}
                >
                  <span>{message.content}</span>
                </div>
              </div>
            ))}
          </div>
          <div className=''>
            <form onSubmit={handleSendMessage} className=''>
              <input
                type='text'
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className='w-full  rounded bg-gray-700 text-white'
                placeholder='Type a message...'
              />
            </form>
          </div>
        </div>
      ) : (
        <p className='text-center text-gray-500'>Select a chat to start messaging</p>
      )}
    </div>
  )
}

export default ChatBox
