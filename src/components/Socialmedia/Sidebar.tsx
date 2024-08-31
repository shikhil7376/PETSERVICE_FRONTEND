import React from 'react'
import { Listbox, ListboxItem } from "@nextui-org/react";
import { ListboxWrapper } from '../Common/ListboxWrapper';
import { IoMdHome } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { PiSquaresFourBold } from "react-icons/pi";
import { TfiVideoClapper } from "react-icons/tfi";
import { FaUser } from "react-icons/fa";
import AddPost from './AddPost';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);

    const navigate = useNavigate();

    return (
        <div className="fixed top-0 left-0 mt-1 h-full w-64 p-5 md:w-1/5">
            <div className="h-full flex flex-col items-center bg-contentgray  rounded-lg shadow-lg border-">

                <ListboxWrapper >
                    <Listbox
                        aria-label="Actions"
                    >
                        <ListboxItem key="new" className="text-gray-500" color="secondary" onClick={()=>navigate('/')}>
                            <div className="flex items-center">
                                <p className="font-semibold  font-roboto mr-2">Home</p>
                                <IoMdHome size={20}/>
                            </div>
                        </ListboxItem>
                        <ListboxItem key="new" className="text-gray-500" color="secondary">
                            <div className="flex items-center">
                                <p className="font-semibold font-roboto mr-2">Search</p>
                                <IoSearchOutline size={20}/>

                            </div>
                        </ListboxItem>
                        <ListboxItem key="new" className="text-gray-500" color="secondary"  onClick={onOpen}>
                            <div className="flex items-center">
                                <p className="font-semibold font-roboto mr-2">Post</p>
                                <PiSquaresFourBold  size={20}/>
                            </div>
                        </ListboxItem>
                        <ListboxItem key="new" className="text-gray-500" color="secondary">
                            <div className="flex items-center">
                                <p className="font-semibold font-roboto mr-2">Reels</p>
                                <TfiVideoClapper size={20} />
                            </div>
                        </ListboxItem>
                        <ListboxItem key="new" className="text-gray-500" color="secondary" onClick={()=>navigate('/profile')} >
                            <div className="flex items-center">
                                <p className="font-semibold font-roboto mr-2">Profile</p>
                                <FaUser size={20} />
                            </div>
                        </ListboxItem>

                    </Listbox>
                </ListboxWrapper>
            </div>
            <AddPost isOpen={isOpen} onClose={onClose} />

        </div>
    )
}

export default Sidebar
