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
import { useNavigate } from 'react-router-dom';
import { postdetails } from '../../Interface/DatatypeInterface';
import AddPost from '../../components/Socialmedia/AddPost';
import PacmanLoader from "react-spinners/PacmanLoader";
import errorHandle from '../../Api/Error';

const SocialmediaLayout = () => {
  const [posts, setPosts] = useState<postdetails[]>([]);
  const [data, setData] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState<postdetails[]>([]); // Posts filtered based on search
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [loading,setLoading] = useState(false)

   const [isOpen, setIsOpen] = useState(false);
      const onOpen = () => setIsOpen(true);
      const onClose = () => setIsOpen(false);

const navigate = useNavigate()
  const userData = useSelector((state: RootState) => state.user.userdata);

  const fetchNotFollowData = async () => {
    const response = await userNotFollow(userData?._id as string);
    if (response) {
      setData(response.data);
    }
  };

  const fetchData = async () => {
     try {
      setLoading(true)
      const response = await getPosts();
      if (response) {
        setPosts(response.data.data);
        setFilteredPosts(response.data.data); 
      }
     } catch (error) {
        errorHandle(error)
     }finally{
        setLoading(false)
     }
  };

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredPosts(posts); 
    } else {
      const filtered = posts.filter(post =>
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.user?.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  }, [searchQuery, posts]);

  
  useEffect(() => {
    fetchData();
  }, []);

 


  return (
    <div className="flex bg-black h-screen ">
       {
        loading?(
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <PacmanLoader size={40} color="#ffffff" />
        </div>
        ):(
         <>
          <div className='h-screen p-5 md:w-1/5 hidden sm:block'>
        <Sidebar fetchData={fetchData} setSearchQuery={setSearchQuery}/>
      </div>
      <div className='fixed z-50 bottom-0 p-2 w-full md:hidden'>
        <div className='flex items-center justify-between  rounded-md p-2'> 
          <IoMdHome size={20} className='text-gray-500'/>
          <IoSearchOutline size={20} className='text-gray-500' />
          <PiSquaresFourBold size={20} className='text-gray-500' onClick={onOpen}/>
          < LuMessagesSquare size={20} className='text-gray-500'  onClick={()=>navigate('/message')}/>
          <FaUser size={20} className='text-gray-500' onClick={ ()=>navigate(`/profile/${userData?._id}`)}/>
        </div>
      </div>
      <Content posts={filteredPosts} fetchData={fetchData} fetchNotFollowData={fetchNotFollowData}  />
      <ThirdSection fetchNotFollowData={fetchNotFollowData} data={data} fetchData={fetchData} />  
     
      <AddPost fetchData={fetchData} isOpen={isOpen} onClose={onClose} />
         </>
        )
       }
     
       
 
    </div>
  )
}

export default SocialmediaLayout
