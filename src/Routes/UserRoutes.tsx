import React from 'react'
import { Suspense,lazy } from 'react'
import { Route,Routes } from 'react-router-dom'
import UserLayout from '../Layout/UserLayout/UserLayout'
const UserRoutes = () => {
    const Home=lazy(()=>import('../components/User/Home'))
    const SignUp = lazy(()=>import('../Pages/User/SignUp'))
    const OTP = lazy(()=>import('../Pages/User/Otp'))
    const Login = lazy(()=>import('../Pages/User/Login'))
    const ListKennels = lazy(()=>import('../components/User/KennelList'))
    const ViewDetails = lazy(()=>import('../components/User/ViewDetails'))
    const Checkout = lazy(()=>import('../components/User/Checkout'))
    const Bookings = lazy(()=>import('../components/User/Bookings'))
  return (
   <Suspense>
    <Routes>
       <Route element={<UserLayout/>}>
       <Route index element={<Home/>}/>
       <Route path='/get-kennels' element={<ListKennels/>}/>
       <Route path='/view-details/:cageid/:fromdate/:todate' element={<ViewDetails/>}/>
       <Route path='/booking/:cageid/:fromdate/:todate' element={<Checkout/>}/>
        <Route path='/bookings' element={<Bookings/>}/>
       </Route>
       <Route path='register' element={<SignUp/>}/>
       <Route path='Otp' element={<OTP/>}/>
       <Route path='login' element={<Login/> }/>
    </Routes>
   </Suspense>
  )
}

export default UserRoutes
