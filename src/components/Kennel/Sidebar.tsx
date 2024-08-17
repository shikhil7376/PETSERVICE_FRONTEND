 import React from 'react'
 import { Sidebar } from "flowbite-react";
 import { HiChartPie, HiUser, HiLibrary } from "react-icons/hi";


 const KennelSidebar = () => {
   return (
    <div className='mt-8  h-screen '>
    <Sidebar aria-label="Default sidebar example" className='w-[230px] rounded-2xl'>
      <Sidebar.Items className="mt-5 font-serif ">
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/kennel/dashboard" icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item href="/kennel/profile" icon={HiUser}>
            Profile
          </Sidebar.Item>
          <Sidebar.Item href="/kennel/addkennel" icon={HiLibrary} labelColor="dark">
            Add Kennels
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  </div>
   )
 }
 
 export default KennelSidebar
 