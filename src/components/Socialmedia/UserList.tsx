import React from 'react'
import { Avatar} from "@nextui-org/react";


const UserList = ({user,handlefunction,onlineUsers}) => {    

  
 
    
  return (
    <div className='display flex p-2 items-center' onClick={handlefunction} >
      <div className='flex gap-1'>
      <Avatar isBordered radius="full" size="md" src={user.image} />
      { onlineUsers.includes(user._id) ? (
          <span className="online-indicator "></span>
        ) : (
          <span className="offline-indicator"></span>
        )} 
      </div>
      <div className='pl-2 '>
        <p className=' text-gray-400 text-sm '>{user.name}</p>
        {/* <p className=' text-gray-400 text-sm '>{user.email}</p> */}
      </div>
    </div>
  )
}

export default UserList
