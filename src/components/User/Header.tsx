import React from 'react'
import { useState } from 'react';
import { Button, Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUserdata } from '../../Redux/Slices/AuthSlice';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { RootState } from '../../Redux/Store';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userdata = useSelector((state:RootState) => state.user.userdata);
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

  const handleSignup = () => {
    navigate('/login');
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    dispatch(clearUserdata());
    toast.success('Logout successfully');
    navigate('/');
  };

  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleProfileView = () => {
    navigate('/profile');
  };

  const handleBookings = () => {
    navigate('/bookings');
  };


  return (
    <div className='p-2 '>
      <nav className='navbar flex justify-between items-center '>
        <div className='logo w-1/6 flex items-center justify-center'>
          <img src='pics/logo.jpg' className='w-10 h-10' alt='Logo' />
        </div>
        <div className='section w-2/3'>
          <ul className='flex justify-evenly '>
            <Link to={'/'} className='font-mono  hover:text-purple-600 hover:underline cursor-pointer transition duration-300'>
              Home
            </Link>
            <li className= 'font-mono  hover:text-purple-600 hover:underline cursor-pointer transition duration-300'>Services</li>
            <li className='font-mono hover:text-purple-600 hover:underline cursor-pointer transition duration-300'>About</li>
            <li className='font-mono hover:text-purple-600 hover:underline cursor-pointer transition duration-300'>Contact</li>
          </ul>
        </div>
        <div className='signup w-1/6 flex items-center justify-center mt-1'>
          {userdata ? (
            <Dropdown isOpen={dropdownVisible} onClose={() => setDropdownVisible(false)}>
              <DropdownTrigger>
                <Avatar
                  isBordered
                  src=""
                  onClick={handleDropdownToggle}
                  className="cursor-pointer"
                />
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem key="profile" onClick={handleProfileView}>
                  View Profile
                </DropdownItem>
                <DropdownItem key="bookings" onClick={handleBookings}>
                  Bookings
                </DropdownItem>
                <DropdownItem key="signout" onClick={handleSignOut}>
                  SignOut
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Button
              radius="full"
              className="bg-gradient-to-tr from-[#B249F8] to-[#FF1CF7] text-white shadow-lg"
              onClick={handleSignup}
            >
              SignIn
            </Button>
          )}
        </div>
      </nav>
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
