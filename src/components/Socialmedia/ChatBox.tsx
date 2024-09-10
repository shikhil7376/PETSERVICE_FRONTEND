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

    
    let getusername =''
   if(activeChat){
    if(activeChat.users[0]._id ==userData?._id){
     getusername = activeChat.users[1].name
   }else{
    getusername = activeChat.users[0].name
   }
}

 console.log('suser',getusername);
 
   
    
  
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
        // Log fetched messages for debugging
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
                console.log('just res',response?.data.data);
                
                socket.emit('newmessage',response?.data.data)
                setMessages([...messages,response?.data.data])
                // fetchMessages()
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
        <div className=''>
            <div className='flex justify-center p-1 '>
             <h2 className='text-gray-500 font-semibold' >{getusername}</h2>
                </div>
          <div className='h-[77vh] overflow-y-auto scrollbar-hide p-2'>
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
          <div className='fixed bg-green-300 w-[700px] ml-2 rounded-lg'>
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
        <p className='text-center text-gray-500 font-semibold'>Select a chat to start messaging</p>
      )}
    </div>
  )
}

export default ChatBox
