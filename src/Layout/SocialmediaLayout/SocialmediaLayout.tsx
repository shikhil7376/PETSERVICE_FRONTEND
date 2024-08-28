import React from 'react'
import Sidebar from '../../components/Socialmedia/Sidebar'
import Content from '../../components/Socialmedia/Content'
import ThirdSection from '../../components/Socialmedia/ThirdSection'

const SocialmediaLayout = () => {
  return (
    <div className="flex bg-black min-h-screen ">
    <Sidebar />
    <div className="flex flex-1 ">
      <Content />
      <ThirdSection />
    </div>
  </div>
  )
}

export default SocialmediaLayout
