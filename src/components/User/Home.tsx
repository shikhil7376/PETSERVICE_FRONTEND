import React from 'react'
import { Button } from "@nextui-org/react";
import { motion } from 'framer-motion';
import { Image } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate()

  return (
    <div className=''>
      <div className='mt-5 flex sm:flex-nowrap flex-wrap'>
        <div className='w-full sm:w-[50%] flex flex-col justify-center items-center '>
          <motion.h1
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, x: { type: "spring", stiffness: 60 }, opacity: { duration: 1 }, ease: "easeIn", duration: 1 }}
            className=' text-2xl sm:text-2xl md:text-4xl font-semibold  mb-4 text-center font-roboto '>
            Welcome to<br />
            <span className='text-2xl sm:text-2xl md:text-4xl text-gradient font-roboto'>Pet Zone</span>
          </motion.h1>
          <motion.p
  initial={{ x: -100, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ delay: 0.2, x: { type: "spring", stiffness: 60 }, opacity: { duration: 0.6 }, ease: "easeIn", duration: 1 }}
  className='text-sm sm:text-base md:text-md lg:text-md xl:text-md text-gray-400 text-center  font-roboto '>
  "Your Trusted Partner For Pet Boarding And Adoption"
</motion.p>
          <Button radius="full" className="bg-gradient-to-tr from-[#B249F8] to-[#FF1CF7] text-white shadow-lg mt-3 font-semibold hidden sm:block">
            Get Started
          </Button>
        </div>
        <div className='w-full sm:w-[50%] flex items-start justify-center '>
          <motion.img
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, x: { type: "spring", stiffness: 60 }, opacity: { duration: 1 }, ease: "easeIn", duration: 1 }}
            src='pics/fffff-min.jpg ' className='rounded-3xl w-[90%] sm:w-[90%] mx-auto' />
        </div>
      </div>
      <div className='display mt-10'>
        <div className='flex justify-center p-5 font-roboto font-semibold text-xl'>OUR SERVICES</div>
        <div className='display flex justify-center'>
        <div className='bg-lightwhite p-5 w-full sm:w-[60%] flex flex-col sm:flex-row justify-evenly items-center rounded-md'>
        <div className='card h-[250px] w-[70%] sm:w-[180px] bg-white flex flex-col justify-center items-center rounded-2xl border-1 drop-shadow-xl mb-4 sm:mb-0'>
        <Image
                isBlurred
                width={100}
                height={100}
                src="pics/boarding.jpg"
                alt="NextUI Album Cover"
                className=""
              />
              <p className='font-semibold mt-2 font-roboto'>BOARDING</p>
              <Button className="bg-gradient-to-tr from-[#B249F8] to-[#FF1CF7] text-white font-roboto font-semibold shadow-lg mt-10" onClick={() => navigate('/get-kennels')}>
                Explore
              </Button>
            </div>
            <div className='card h-[250px] w-[70%] sm:w-[180px] bg-white flex flex-col justify-center items-center rounded-2xl border-1 drop-shadow-xl'>
            <Image
                isBlurred
                width={100}
                height={100}
                src="pics/signin.jpg"
                alt="NextUI Album Cover"
                className=""
              />
              <p className='font-semibold font-roboto mt-2'>ADOPTION</p>
              <Button className="bg-gradient-to-tr from-[#B249F8] to-[#FF1CF7] font-semibold font-roboto text-white shadow-lg mt-10" onClick={()=>navigate('/adoption')}>
                Explore
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className=' display flex flex-wrap mt-10'>
        <div className=' w-full sm:w-[50%] '></div>
        <div className='w-full sm:w-[50%] bg-slate-30  '>
          <div className='flex justify-center '>
            <div className='bg-white h-[100px] w-[100px] sm:h-[150px] sm:w-[150px] rounded-full text-center justify-center items-center overflow-hidden drop-shadow-md'>
              <img src='pics/retriever.png' className='h-full w-full object-cover' /></div>
          </div>
          <div className='display flex justify-evenly '>
            <div className='bg-lightwhite h-[100px] w-[100px] sm:h-[150px] sm:w-[150px]  rounded-full text-center justify-center items-center overflow-hidden drop-shadow-md'>
              <img src='pics/beagle.jpg' className='h-full w-full object-cover' />
            </div>
            <div className='bg-lightwhite h-[100px] w-[100px] sm:h-[150px] sm:w-[150px]  rounded-full text-center justify-center items-center overflow-hidden drop-shadow-md'>
              <img src='pics/rottt.jpg' className='h-full w-full object-cover' />
            </div>
          </div>
          <div className='flex justify-center'>
            <div className='bg-lightwhite h-[100px] w-[100px] sm:h-[150px] sm:w-[150px]  rounded-full text-center justify-center items-center  overflow-hidden drop-shadow-md'>
              <img src='pics/cane.png' className='h-full w-full object-cover' />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Home
