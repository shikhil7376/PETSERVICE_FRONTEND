import React from 'react'
import { Avatar} from "@nextui-org/react";


const UserList = ({user,handlefunction}) => {    

    
  return (
    <div className='display flex p-2' onClick={handlefunction} >
      <div>
      <Avatar isBordered radius="full" size="md" src={user.image} />
      </div>
      <div className='pl-2'>
        <p className=' text-gray-400 text-sm '>{user.name}</p>
        <p className=' text-gray-400 text-sm '>{user.email}</p>
      </div>
    </div>
  )
}

export default UserList
