 import React from 'react'
 import { Sidebar } from "flowbite-react";
 import { HiChartPie, HiUser, HiLibrary } from "react-icons/hi";


 const KennelSidebar = () => {
   return (
    <div className='mt-8  h-screen '>
    <Sidebar aria-label="Default sidebar example" className='w-[230px] rounded-2xl'>
      <Sidebar.Items className="mt-5  ">
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/kennel/dashboard" icon={HiChartPie}>
          <p className='text-small font-semibold'> Dashboard</p>
          </Sidebar.Item>
          <Sidebar.Item href="/kennel/profile" icon={HiUser}>
          <p className='text-small font-semibold'> PROFILE</p>
          </Sidebar.Item>
          <Sidebar.Item href="/kennel/addkennel" icon={HiLibrary} labelColor="dark">
          <p className='text-small font-semibold'> ADD KENNELS</p>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  </div>
   )
 }
 
 export default KennelSidebar
 