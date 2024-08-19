import React from 'react'
import { Button } from "@nextui-org/react";
import { motion } from 'framer-motion';
import { Image } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate()

  return (
    <div >
      <div className='mt-5 flex'>
        <div className='w-1/2 flex flex-col justify-center items-center '>
          <motion.h1
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, x: { type: "spring", stiffness: 60 }, opacity: { duration: 1 }, ease: "easeIn", duration: 1 }}
            className='text-4xl  mb-4 text-center '>
            Welcome to<br />
            <span className='text-gradient '>Pet Zone</span>
          </motion.h1>
          <motion.p
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, x: { type: "spring", stiffness: 60 }, opacity: { duration: 0.6 }, ease: "easeIn", duration: 1 }}
            className='text-gray-400 text-center font-semibold'>"Your Trusted Partner For Pet Boarding And Adoption"</motion.p>
          <Button radius="full" className="bg-gradient-to-tr from-[#B249F8] to-[#FF1CF7] text-white shadow-lg mt-3 font-semibold">
            Get Started
          </Button>
        </div>
        <div className='w-1/2 mr-3 '>
          <motion.img
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, x: { type: "spring", stiffness: 60 }, opacity: { duration: 1 }, ease: "easeIn", duration: 1 }}
            src='pics/fffff-min.jpg ' className='rounded-3xl ' />
        </div>
      </div>
      <div className='display mt-10'>
        <div className='bg-white flex justify-center p-5 font-semibold text-xl'>OUR SERVICES</div>
        <div className='display flex justify-center'>
          <div className='bg-lightwhite h-[300px] w-[60%] flex justify-evenly items-center rounded-md'>
            <div className='card h-[250px] w-[180px] bg-white flex flex-col justify-center items-center rounded-2xl border-1 drop-shadow-xl'>
              <Image
                isBlurred
                width={100}
                height={100}
                src="pics/boarding.jpg"
                alt="NextUI Album Cover"
                className=""
              />
              <p className='font-semibold mt-2 '>BOARDING</p>
              <Button className="bg-gradient-to-tr from-[#B249F8] to-[#FF1CF7] text-white font-semibold shadow-lg mt-10" onClick={() => navigate('/get-kennels')}>
                Explore
              </Button>
            </div>
            <div className='card h-[250px] w-[180px] bg-white flex flex-col justify-center items-center rounded-2xl border-1 drop-shadow-xl'>
              <Image
                isBlurred
                width={100}
                height={100}
                src="pics/signin.jpg"
                alt="NextUI Album Cover"
                className=""
              />
              <p className='font-semibold mt-2'>ADOPTION</p>
              <Button className="bg-gradient-to-tr from-[#B249F8] to-[#FF1CF7] font-semibold text-white shadow-lg mt-10">
                Explore
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className=' display flex mt-10'>
        <div className='w-[50%]'></div>
        <div className='w-[50%] '>
          <div className='flex justify-center'>
            <div className='bg-white h-[150px] w-[150px] rounded-full text-center justify-center items-center overflow-hidden drop-shadow-md'>
              <img src='pics/retriever.png' className='h-full w-full object-cover' /></div>
          </div>
          <div className='display flex justify-evenly '>
            <div className='bg-lightwhite h-[150px] w-[150px] rounded-full text-center justify-center items-center overflow-hidden drop-shadow-md'>
              <img src='pics/beagle.jpg' className='h-full w-full object-cover' />
            </div>
            <div className='bg-lightwhite h-[150px] w-[150px] rounded-full text-center justify-center items-center overflow-hidden drop-shadow-md'>
              <img src='pics/rottt.jpg' className='h-full w-full object-cover' />
            </div>
          </div>
          <div className='flex justify-center'>
            <div className='bg-lightwhite h-[150px] w-[150px] rounded-full text-center justify-center items-center  overflow-hidden drop-shadow-md'>
              <img src='pics/cane.png' className='h-full w-full object-cover' />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Home
