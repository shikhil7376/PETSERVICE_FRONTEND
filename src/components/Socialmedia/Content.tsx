import React, { useEffect, useState } from 'react'
import ContentCard from '../Common/content/ContentCard'
import { getPosts } from '../../Api/User'
import { toast } from 'react-toastify'
// import '../Socialmedia/Content.css'
import { postdetails } from '../../Interface/DatatypeInterface'

const Content = () => {

  const [posts,setPosts] = useState<postdetails[]>([])  
  
  const fetchData = async()=>{
    const response = await getPosts()
    if(response){
      setPosts(response.data.data)
      // toast.success(response.data.message)
    }
  }

  useEffect(()=>{
   fetchData()
  },[])

  return (
<div className=" md:p-5 sm:w-3/5  ">
<div className="bg-contentgray rounded-lg p-2 md:p-5 flex flex-col items-center gap-5 shadow-md overflow-y-auto h-[93vh] scrollbar-hidden">
      {
        posts.map((post)=>(
     
   <ContentCard key={post.id} post={post} />

        ))
      }
      </div>
    </div>
  )
}

export default Content
