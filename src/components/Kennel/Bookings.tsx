import React, { useEffect, useState } from 'react'
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
import { getAllBookings } from '../../Api/Kennel';
import errorHandle from '../../Api/Error';
import { booking } from '../../Interface/DatatypeInterface';

const Bookings = () => {
    const [booking,setBooking] = useState<booking[]>([])
   console.log(booking);
   
    const fetchData = async()=>{
        try{
            const response = await getAllBookings()
               setBooking(response?.data)
            
        }catch(error){
            errorHandle(error)
        }
    }

    useEffect(()=>{
        fetchData()
    },[])

  return (
    <div className='display flex justify-center'>
       <Table aria-label="Example static collection table" className='w-[95%]'>
    <TableHeader>
      <TableColumn>Kennelname</TableColumn>
      <TableColumn>username</TableColumn>
      <TableColumn>Phone</TableColumn>
      <TableColumn>fromdate</TableColumn>
      <TableColumn>todate</TableColumn>
      <TableColumn>total days</TableColumn>
      <TableColumn>total amount</TableColumn>
      <TableColumn>status</TableColumn>

    </TableHeader>
    <TableBody>
        {
            booking.map((data,index)=>(           
      <TableRow key={index} >
        <TableCell><p className='text-xs text-gray-400 font-semibold'>{data.kennelname}</p></TableCell>
        <TableCell><p className='text-xs text-gray-400 font-semibold'>{data.username}</p></TableCell>
        <TableCell><p className='text-xs text-gray-400 font-semibold'>{data.phone}</p></TableCell>
        <TableCell><p className='text-xs text-gray-400 font-semibold'>{data.fromdate}</p></TableCell>
        <TableCell><p className='text-xs text-gray-400 font-semibold'>{data.todate}</p></TableCell>
        <TableCell><p className='text-xs text-gray-400 font-semibold'>{data.totaldays}</p></TableCell>
        <TableCell><p className='text-xs text-gray-400 font-semibold'>{data.totalamount}</p></TableCell>
        <TableCell><p
    className={`text-xs font-semibold ${
      data.status === 'booked' ? 'text-green-500' : data.status === 'cancelled' ? 'text-red-500' : 'text-gray-400'
    }`}
  >
    {data.status}
  </p></TableCell>

      </TableRow>
       )) }
    </TableBody>
  </Table>
    </div>
  )
}

export default Bookings
