import React, { useEffect, } from 'react'
import { useState,useRef } from 'react';
import { Button, Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUserdata } from '../../Redux/Slices/AuthSlice';
import { toast,Toaster } from 'react-hot-toast';
import { Link,useLocation } from 'react-router-dom';
import { RootState } from '../../Redux/Store';
import { HiMenu } from 'react-icons/hi'; // Import the menu icon from react-icons

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userdata = useSelector((state:RootState) => state.user.userdata);
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
   const [menuOpen, setMenuOpen] = useState<boolean>(false);

  
  const handleSignup = () => {
    navigate('/login');
  };

  const location = useLocation();
  const toastShown = useRef(false); // Track if toast has already been shown

  useEffect(() => {
    // Only show toast if it has not been shown already
    if (location.state?.showToast && !toastShown.current) {
      toast.error('SignIn cheyy Mwonoose 😉😉!!!', {
        style: {
          fontFamily: 'Roboto, sans-serif',
          fontSize: '16px',
          color: 'white',
          backgroundColor: '#333',
          padding: '10px',
          borderRadius: '8px',
        },
      });
      toastShown.current = true; // Set flag to true to prevent showing again
    }
  }, [location]);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    dispatch(clearUserdata());
    toast.success('Logout successfully');
    navigate('/');
  };

  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleProfileView = (userId: string) => {
    navigate(`/profile/${userId}`);;
  };

  const handleBookings = () => {
    navigate('/bookings');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className='p-2 '>
      <Toaster position='top-center'/>
      <nav className='navbar flex items-center '>
        <div className='logo w-1/6 flex items-center justify-center '>
          <img src='pics/logo.jpg' onClick={()=>navigate('/')} className='w-10 h-10'  />
        </div>
        <div className='section w-2/3  hidden sm:flex justify-evenly '>
          {/* <ul className='flex justify-evenly '> */}
            <Link to={'/'} className=' text-small font-semibold font-roboto hover:text-purple-600 hover:underline cursor-pointer transition duration-300'>
              Home
            </Link>
            <Link to={'/#services'} className= 'text-small font-semibold font-roboto hover:text-purple-600 hover:underline cursor-pointer transition duration-300'>Services</Link>
            <Link to={'/#features'} className='text-small font-semibold font-roboto hover:text-purple-600 hover:underline cursor-pointer transition duration-300'>Features</Link>
            {/* <Link to={''} className='text-small font-semibold font-roboto hover:text-purple-600 hover:underline cursor-pointer transition duration-300'>Contact</Link> */}
          {/* </ul> */}
        </div>
        <div className="sm:hidden flex-1 flex justify-end mr-5 ">
         <HiMenu className="text-2xl cursor-pointer" onClick={toggleMenu} />
        </div>

       
        <div className='signup w-1/6 flex items-center justify-center mt-1 '>
   
          {userdata ? (
            <Dropdown isOpen={dropdownVisible} onClose={() => setDropdownVisible(false)} className=''>
              <DropdownTrigger>
                <Avatar
                  isBordered
                  src={userdata.image}
                  onClick={handleDropdownToggle}
                  className="cursor-pointer"
                />
              </DropdownTrigger>
              <DropdownMenu className=''>
                <DropdownItem key="profile" onClick={()=>handleProfileView(userdata._id)} className='text-small font-bold'>
                <p className='text-small font-roboto text-gray-500'>view profile</p>
                </DropdownItem>
                <DropdownItem key="bookings" onClick={handleBookings} className='text-small font-bold  w-[100px] ' >
                <p className='text-small font-roboto text-gray-500'>bookings</p>
                </DropdownItem>
                <DropdownItem key="bookings"  className='text-small font-bold  w-[100px] '>
                <p className='text-small font-roboto text-gray-500'>Wallet: ${userdata.wallet}</p>
                </DropdownItem>
                <DropdownItem key="signout" onClick={handleSignOut} className='text-small font-bold  w-[100px] '>
                <p className='text-small font-roboto text-gray-500'>signout</p>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <button
              className="bg-gradient-to-tr p-2 rounded-md from-[#B249F8] to-[#FF1CF7] text-white shadow-lg font-roboto text-sm mr-4"
              onClick={handleSignup}
            >
              SignIn
            </button>
          )}
        </div>
      </nav>
      {menuOpen && (
  <div className="fixed top-0 left-0  w-full h-full bg-black bg-opacity-50 z-50 flex justify-end">
    <div
      className="w-[150px] h-[250px] mt-10 bg-white shadow-lg p-4 slide-in-right rounded-lg"
    >
      <button
        className="text-white hover:text-gray-800 text-md mb-4 bg-red-500 p-1 rounded-md font-roboto "
        onClick={toggleMenu}
      >
        Close
      </button>
      <Link
        to={'/'}
        className="block  text-sm font-roboto py-2 hover:text-purple-600 hover:underline cursor-pointer"
        onClick={toggleMenu}
      >
        Home
      </Link>
      <Link
        to={'/#services'}
        className="block text-sm py-2 font-roboto hover:text-purple-600 hover:underline cursor-pointer"
        onClick={toggleMenu}
      >
        Services
      </Link>
      <Link
        to={'/#features'}
        className="block text-sm py-2 font-roboto hover:text-purple-600 hover:underline cursor-pointer"
        onClick={toggleMenu}
      >
        Features
      </Link>
    </div>
  </div>
)}
      <div
        className="navbar-line bg-slate-300"
        style={{
          width: 'calc(100% - 25rem)',
          height: '1px',
         
          margin: '0 auto',
        }}
      ></div>
    </div>
  )
}

export default Header
