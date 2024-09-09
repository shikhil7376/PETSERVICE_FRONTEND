import React from 'react'
import UserList from './UserList'
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store';
import { useState } from 'react';
import { getchatUser } from '../../Api/User';
import { createChat,fetchChat } from '../../Api/chat';
import { useEffect } from 'react';

const ChatList = ({ setActiveChat }) => {
     
    const userData = useSelector((state: RootState) => state.user.userdata);
    const [searchItem,setSearchItem] = useState("")
    const [searchResult, setSearchResult] = useState<any[]>([]);
    const [chats, setChats] = useState<any[]>([]);


 
    

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

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>)=>{
         e.preventDefault()
         if(searchItem){
            try {
                const response = await getchatUser(userData?._id as string,searchItem)
                if(response){
                    setSearchResult(response.data.data)
                }
            } catch (error) {
                
            }
         }
    }

    const accessChat = async(userId)=>{
     try {
        const response = await createChat(userData?._id as string,userId as string)
        if (response) {
            setActiveChat(response.data); // Set active chat in parent component
          }
        
     } catch (error) {
        
     }
     
      
    }

     
    return (
        <div className='w-[30%] bg-contentgray p-4 ml-3 rounded-lg h-[90vh]'>
          <form onSubmit={handleSubmit}>
            <input
              className='bg-black border-1 border-gray-400 text-gray-400 rounded-full p-1'
              placeholder='Search'
              onChange={search}
              value={searchItem}
            />
          </form>
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
