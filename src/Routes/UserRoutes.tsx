import React from 'react'
import { Suspense,lazy } from 'react'
import { Route,Routes } from 'react-router-dom'
import UserLayout from '../Layout/UserLayout/UserLayout'
import Error404 from '../Pages/User/Error404'

const UserRoutes = () => { 
    const Home=lazy(()=>import('../components/User/Home'))
    const SignUp = lazy(()=>import('../Pages/User/SignUp'))
    const OTP = lazy(()=>import('../Pages/User/Otp'))
    const Login = lazy(()=>import('../Pages/User/Login'))
    const ListKennels = lazy(()=>import('../components/User/KennelList'))
    const ViewDetails = lazy(()=>import('../components/User/ViewDetails'))
    const Checkout = lazy(()=>import('../components/User/Checkout'))
    const Bookings = lazy(()=>import('../components/User/Bookings'))
    const SucessPage = lazy(()=>import('../components/User/SuccessPage'))
    const Profile = lazy(()=>import('../Pages/User/Profile'))
    const ProtectedRoute = lazy(()=>import('../Protected/ProtectedRoute'))
    const SocialMedia = lazy(()=>import('../Layout/SocialmediaLayout/SocialmediaLayout'))
    const Message = lazy(()=>import('../components/Socialmedia/ChatPage'))
  return (
   <Suspense>
    <Routes>
      <Route></Route>
       <Route element={<UserLayout/>}>
       <Route index element={<Home/>}/>
       <Route path='/get-kennels' element={<ListKennels/>}/>
       <Route path='/view-details/:cageid/:fromdate/:todate' element={<ViewDetails/>}/>
       <Route element={<ProtectedRoute/>}>
       <Route path='/booking/:cageid/:fromdate/:todate' element={<Checkout/>}/>
        <Route path='/bookings' element={<Bookings/>}/>
        <Route path='/profile' element={<Profile/>}/>
       </Route>
       </Route>
       <Route path='/success' element={<SucessPage/>}/>
       <Route path='register' element={<SignUp/>}/>
       <Route path='Otp' element={<OTP/>}/>
       <Route path='login' element={<Login/> }/>
       <Route path='*' element={<Error404/>}/>
       <Route path='/adoption' element={<SocialMedia/>}/>
       <Route path='/message' element={<Message/>}/>
    </Routes>
   </Suspense>
  )
}

export default UserRoutes
