import React from 'react'
import Sidebar from '../../components/Socialmedia/Sidebar'
import Content from '../../components/Socialmedia/Content'
import ThirdSection from '../../components/Socialmedia/ThirdSection'

const SocialmediaLayout = () => {
  return (
    <div className="flex bg-black  min-h-screen ">
    <Sidebar />
      <Content />
      <ThirdSection />
   
  </div>
  )
}

export default SocialmediaLayout
