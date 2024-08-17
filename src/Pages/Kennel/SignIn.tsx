import React from 'react'
import validator from 'validator';
import { login } from '../../Api/Kennel';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setKennelCredential } from '../../Redux/Slices/KennelSlice';
import { useState,useEffect } from 'react';
import { RootState } from '../../Redux/Store';

const SignIn = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    const kennelOwnerData = useSelector((state:RootState) => state.kennel.kennelOwnerData);
    const check = ()=>{
       if(kennelOwnerData){
        navigate('/kennel/dashboard')
       }
    }
    useEffect(()=>{
        check()
     },[])
     const [email, setEmail] = useState<string>('');
     const [password, setPassword] = useState<string>('');
     const [errors,setErrors] = useState<Errrors>({})

     interface Errrors{
        email?:string;
        password?:string;
     }
   
    const validateForm = ()=>{
     const newErrors:Errrors ={}
     if(!email.trim() || !validator.isEmail(email)){
        newErrors.email = 'valid email is required'
     }
     if(!password.trim()){
       newErrors.password='password is required'
      }else if(password.length <6){
       newErrors.password = 'password must contain at least 6 characters'
      }
      setErrors(newErrors)
      return Object.keys(newErrors).length ===0
    }
    const submitHandler = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const isValid = validateForm()
        if(isValid){
           const data = {
            email:email,
            password:password
           }  
           const response = await login(data);
           if(response?.data){
            localStorage.setItem('token',response.data.token)
            dispatch(setKennelCredential(response.data.message))
            navigate('/kennel/dashboard')
           }
        }
       }
  return (
    <div className="card shadow-md display-flex">  
    <form onSubmit={submitHandler}>
        <div className='w-[50%] bg-slate-200'>
    <h2>Welcome</h2>
    <h3>Let's create your username</h3>
    <div className="w-[280px] ml-10">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
        Email
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}

    </div>

    <div className="mt-1 w-[280px] ml-10">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
        Password
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="password"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
    </div>
    
    <div className='flex justify-center'>
      <button className='p-2 mt-5 w-[150px] rounded-md'type='submit'>
        Sign In
      </button>
      </div>
    </div>
    </form>
  </div>
  )
}

export default SignIn
