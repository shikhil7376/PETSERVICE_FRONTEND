import React from 'react'
import Table2 from '../../components/Admin/Table2';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import ReactLoading from 'react-loading';
import { getRequests } from '../../Api/Admin';
import { TiArrowBack,TiArrowForward  } from "react-icons/ti";


const KennelApproval = () => {

    const [kennelOwners, setKennelOwners] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const limit = 5;


  

    const fetchKennelOwners = async () => { 
        setLoading(true);
        try {
          const response = await getRequests(page, limit, searchTerm);
          setKennelOwners(response?.data.data);
          setTotal(response?.data.total); // Set the total count
        } catch (error) {
          console.error('failed to fetch users:', error);
          toast.error('failed to fetch users');
        }
        setLoading(false);
      };

      useEffect(() => {
        fetchKennelOwners();
      }, [page, searchTerm]); // Fetch data on page or searchTerm change
    
      const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setPage(1); // Reset to first page on search
      };
    
      const handlePreviousPage = () => {
        if (page > 1) {
          setPage(page - 1);
        }
      };
    
      const handleNextPage = () => {
        if (page * limit < total) {
          setPage(page + 1);
        }
      };

  return (
    <div>
    <div className='mt-1 ml-16 w-[250px] flex'>
      <input
        placeholder="Search"
        onChange={handleSearch}
        value={searchTerm}
        className="w-[250px] h-10 border-1 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
      />
    </div>
    {loading ? (
      <div className="flex justify-center items-center">
        <ReactLoading type="spin" color="#000" height={50} width={50} />
      </div>
    ) : kennelOwners.length > 0 ? (
      <Table2 kennelOwners={kennelOwners} fetchKennelOwners={fetchKennelOwners} />
    ) : (
      <p className='ml-[400px] text-red-700 font-md'>No Users found</p>
    )}
    <div className='flex justify-center mt-4'>
      <button 
        onClick={handlePreviousPage} 
        disabled={page === 1} 
        className={`w-10 h-10 flex items-center justify-center rounded-full border p-2 ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
       <TiArrowBack />
      </button>
      <button 
        onClick={handleNextPage} 
        disabled={page * limit >= total} 
        className={`w-10 h-10 flex items-center justify-center rounded-full border p-2 ${page * limit >= total ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
                      <TiArrowForward />
      </button>
    </div>
  </div>
  )
}

export default KennelApproval
