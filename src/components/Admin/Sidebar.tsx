import React from 'react'
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiUser, HiLibrary  } from "react-icons/hi";

const AdminSidebar = () => {
  return (
    <div className='mt-8  h-screen '>
    <Sidebar aria-label="Default sidebar example">
   <Sidebar.Items className="mt-8 font-serif ">
     <Sidebar.ItemGroup>
       <Sidebar.Item href="/admin/dashboard" icon={HiChartPie}>
         Dashboard
       </Sidebar.Item>
       <Sidebar.Item href="/admin/users" icon={HiUser}>
         Users
       </Sidebar.Item>
       <Sidebar.Item href="/admin/kennelapproval" icon={ HiLibrary } labelColor="dark">
         Kennel Approval
       </Sidebar.Item>
       <Sidebar.Item href="/admin/verifiedKennelOwner" icon={HiArrowSmRight}>
         Kennel Owner
       </Sidebar.Item>
     </Sidebar.ItemGroup>
   </Sidebar.Items>
 </Sidebar>
 </div>
  )
}

export default AdminSidebar
