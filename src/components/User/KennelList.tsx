import React from 'react'
import { Image } from "@nextui-org/react";
import { useEffect, useState } from 'react';
import { Button } from "@nextui-org/react";
import { DateRangePicker } from "@nextui-org/date-picker";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { getCage } from '../../Api/Kennel';
import { CageData } from '../../Interface/DatatypeInterface';
import { today } from '@internationalized/date';
import { Input } from "../../components/ui/input";
import errorHandle from '../../Api/Error';


const KennelList = () => {
  const navigate = useNavigate()
  const [cages, setCages] = useState<CageData[]>([])
  const [fromdate, setfromdate] = useState<string | null>()
  const [todate, settodate] = useState<string | null>()
  const [duplicatecages, setduplicatecages] = useState<CageData[]>([]);

  const fetchCage = async () => {
    try {
      const response = await getCage()
      setCages(response?.data.data || [])
      setduplicatecages(response?.data.data || [])
    } catch (error) {
     errorHandle(error)
    }
  }

  useEffect(() => {
    fetchCage()
  }, [])

  const filterByDate = (dates: { start: { year: number; month: number; day: number }; end: { year: number; month: number; day: number } }) => {
    if (dates && dates.start && dates.end) {

      const startDate = moment({
        year: dates.start.year,
        month: dates.start.month - 1,
        day: dates.start.day,
      }).format('DD-MM-YYYY');

      setfromdate(startDate);

      const endDate = moment({
        year: dates.end.year,
        month: dates.end.month - 1,
        day: dates.end.day,
      }).format('DD-MM-YYYY');

      settodate(endDate);

      let tempcages: CageData[] = [];
      for (const cage of duplicatecages) {
        let availability = true;
        const bookings = cage.currentBookings || [];
        if (bookings.length > 0) {
          for (const booking of bookings) {
            const bookingStart = moment(booking.fromdate, 'DD-MM-YYYY');
            const bookingEnd = moment(booking.todate, 'DD-MM-YYYY');
            const selectedStart = moment(startDate, 'DD-MM-YYYY');
            const selectedEnd = moment(endDate, 'DD-MM-YYYY');

            if (
              selectedStart.isBetween(bookingStart, bookingEnd, undefined, '[)') ||
              selectedEnd.isBetween(bookingStart, bookingEnd, undefined, '[)') ||
              bookingStart.isBetween(selectedStart, selectedEnd, undefined, '[)') ||
              bookingEnd.isBetween(selectedStart, selectedEnd, undefined, '[)')
            ) {
              availability = false;
              break;
            }
          }
        }
        if (availability) {
          tempcages.push(cage);
        }
      }
      setCages(tempcages);
    }
  };

  return (
    <div className=' flex flex-col items-center  min-h-screen '>

      <div className='filter w-[70%] h-[50px] rounded-2xl display flex '>
        <DateRangePicker minValue={today('UTC')} onChange={filterByDate}
          label="Stay duration"
          className="w-[300px] drop-shadow-lg"
        />
        <div className='pl-5 items-center mt-2'>
          <Input className='rounded-3xl' placeholder='search' />
        </div>

      </div>
      <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5 '>
        {cages.map((cage, index) => (
          <div key={index}>
            <Image
              isZoomed
              alt="NextUI Fruit Image with Zoom"
              src={cage.image?.[2]}
              style={{ height: '235px', width: '200px' }}
            />
            <div className='display  justify-between'>
              <h2 className='font-semibold text-small'>{cage.kennelname}</h2>
              <p className='text-gray-500  text-small font-semibold'>{cage.location}</p>

            </div>
            <div className='display flex justify-between items-center'>
              <p className='text-gray-500 mr-5 font-semibold'>${cage.pricepernight}</p>

              <Button
                radius="full"
                className="bg-gradient-to-tr from-[#B249F8] to-[#5e1bac] p-2 text-white shadow-lg font-semibold text-small"
                onClick={() => navigate(`/view-details/${cage._id}/${fromdate}/${todate}`)}
              >
                View Details
              </Button>

            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default KennelList

