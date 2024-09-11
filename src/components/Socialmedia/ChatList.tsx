import React from 'react'
import UserList from './UserList'
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store';
import { useState } from 'react';
import { getchatUser } from '../../Api/User';
import { createChat,fetchChat } from '../../Api/chat';
import { useEffect } from 'react';
import { IoIosNotifications } from "react-icons/io";
import { user } from '@nextui-org/theme';
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import errorHandle from '../../Api/Error';



const ChatList = ({ setActiveChat,notification,setNotification }) => {
     
    const userData = useSelector((state: RootState) => state.user.userdata);
    const [searchItem,setSearchItem] = useState("")
    const [searchResult, setSearchResult] = useState<any[]>([]);
    const [chats, setChats] = useState<any[]>([]);
    const [showDropdown, setShowDropdown] = useState(false); // State to control dropdown visibility


    useEffect(() => {
        if (userData) {
          fetchUserChats();
        }
      }, [userData]);
    
    const fetchUserChats = async () => {
        if (!userData || !userData._id) {
          console.error("User data is not available.");
          return; // Exit the function if userData is null or doesn't have _id
        }
      
        try {
          const response = await fetchChat(userData._id as string); // Make sure to check userData before this
          
          if (response) {
            setChats(response.data.data); // Store the fetched chats
          }
        } catch (error) {
          console.error("Error fetching chats", error);
        }
      };
    
 
    function search(e:React.ChangeEvent<HTMLInputElement>){
        setSearchItem(e.target.value)
    }

    function getsender(currentUser, users){
       return users[0]._id === currentUser._id? users[1].name:users[0].name
    }

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>)=>{
         e.preventDefault()
         if(searchItem){
            try {
                const response = await getchatUser(userData?._id as string,searchItem)
                if(response){
                setSearchResult(response.data.data)
                }
            } catch (error) {
                errorHandle(error)
            }
         }
    }

    const accessChat = async(userId)=>{
     try {
        const response = await createChat(userData?._id as string,userId as string)    
        if(response){
          setSearchItem("")
          fetchUserChats()
        }    
        // if (response) {
        //     setActiveChat(response.data); // Set active chat in parent component
        //   }
        
     } catch (error) {
        errorHandle(error)
     }
      
    }

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
      };
    

     
    return (
        <div className='w-[30%] bg-contentgray p-4 ml-3 rounded-lg h-[90vh]'>
            <div className='flex items-center gap-4'>
          <form onSubmit={handleSubmit}>
            <input
              className='bg-black border-1 border-gray-400 text-gray-400 rounded-full p-1'
              placeholder='Search'
              onChange={search}
              value={searchItem}
            />
          </form>
          <div className='relative'>
          <IoIosNotifications color='gray' size={20} onClick={toggleDropdown} className="cursor-pointer" />
          <NotificationBadge count={notification.length} effect ={Effect.SCALE}/>
          {showDropdown && (
            <div className='absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg p-4 z-10'>
              {notification.length > 0 ? (
                notification.map((notif, index) => (
                    <div
                    key={index}
                    className="p-2 border-b border-gray-300"
                    onClick={() => {
                      setActiveChat(notif.chat); // Set the active chat
                      setNotification(notification.filter((n) => n !== notif)); // Remove the notification
                    }}
                  >
                    <p className="text-sm font-semibold">
                      New message from {getsender(userData, notif.chat.users)}
                    </p>
                  </div>
                  
                ))
              ) : (
                <p className='text-gray-500 text-sm'>No new messages</p>
              )}
            </div>
          )}
        </div>
          </div>
          <p className='text-gray-500 font-semibold p-2'>CHATS</p>
          
          {searchItem ? (
            // Show search results when a search term is present
            searchResult.map((user) => (
              <UserList 
                key={user._id} 
                user={user} 
                handlefunction={() => accessChat(user._id)} 
              />
            ))
          ) : (
            chats.map((chat) => {
              const otherUser = chat.users.find((u) => u._id !== userData?._id);
              return (
                <UserList 
                  key={chat._id} 
                  user={otherUser} 
                  handlefunction={() => setActiveChat(chat)} 
                />
              );
            })
          )}
        </div>
      );
}

export default ChatList
