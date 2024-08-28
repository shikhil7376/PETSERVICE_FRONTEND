import React from 'react'
import ContentCard from '../Common/content/ContentCard'
// import '../Socialmedia/Content.css'
const Content = () => {
  return (
<div className="w-full ml-0 mt-1 p-5 md:w-3/5 md:ml-[20%] ">
<div className="bg-contentgray rounded-lg p-5 flex flex-col gap-5 shadow-md ">
      <ContentCard/>
       <ContentCard/>
       <ContentCard/>
       <ContentCard/>
       <ContentCard/>
       <ContentCard/>
      </div>
    </div>
  )
}

export default Content
