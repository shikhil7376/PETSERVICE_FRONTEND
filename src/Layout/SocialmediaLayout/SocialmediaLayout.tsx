import React from 'react'
import Sidebar from '../../components/Socialmedia/Sidebar'
import Content from '../../components/Socialmedia/Content'
import ThirdSection from '../../components/Socialmedia/ThirdSection'
import { LuMessagesSquare } from "react-icons/lu";
import { IoMdHome } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { PiSquaresFourBold } from "react-icons/pi";
import { TfiVideoClapper } from "react-icons/tfi";
import { FaUser } from "react-icons/fa";
import { getPosts ,userNotFollow} from '../../Api/User';
import { useState,useEffect } from 'react';
import { RootState } from '../../Redux/Store';
import { useSelector } from 'react-redux';

const SocialmediaLayout = () => {
  const [posts, setPosts] = useState([]);
  const [data, setData] = useState([]);

  const userData = useSelector((state: RootState) => state.user.userdata);

  const fetchNotFollowData = async () => {
    const response = await userNotFollow(userData?._id as string);
    if (response) {
      setData(response.data);
    }
  };

  const fetchData = async () => {
    const response = await getPosts();
    if (response) {
      setPosts(response.data.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className="flex bg-black h-screen ">
      <div className='h-screen p-5 md:w-1/5 hidden sm:block'>
        <Sidebar fetchData={fetchData}/>
      </div>
      <div className='fixed z-50 bottom-0 p-2 w-full md:hidden'>
        <div className='flex items-center justify-between  rounded-md p-2'> 
          <IoMdHome size={20} className='text-gray-500'/>
          <IoSearchOutline size={20} className='text-gray-500' />
          <PiSquaresFourBold size={20} className='text-gray-500'/>
          <TfiVideoClapper size={20} className='text-gray-500'/>
          <FaUser size={20} className='text-gray-500'/>
        </div>
      </div>
      <Content posts={posts} fetchData={fetchData} fetchNotFollowData={fetchNotFollowData}  />
      <ThirdSection fetchNotFollowData={fetchNotFollowData} data={data} />

    </div>
  )
}

export default SocialmediaLayout
