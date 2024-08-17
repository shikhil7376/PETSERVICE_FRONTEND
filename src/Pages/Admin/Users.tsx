import React, { useState, useEffect } from 'react';
import Table1 from '../../components/Admin/Table1';
import { toast } from 'react-toastify';
import ReactLoading from 'react-loading';
import { getUsers } from '../../Api/Admin';

interface Userdata{
    _id:string,
    name:string,
    email:string,
    phone:string,
    isBlocked:boolean,
    isAdmin:boolean,
    
}

const Users = () => {
    const [users, setUsers] = useState<Userdata[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const limit:number = 5;  
    const [total, setTotal] = useState<number>(0);

    console.log(users);
    

    const fetchUsers = async () => {
        setLoading(true);
        try {
          const response = await getUsers(page, limit, searchTerm);
          
          setUsers(response?.data.data);
          setTotal(response?.data.total);
        } catch (error) {
          console.error('Failed to fetch users:', error);
          toast.error('Failed to fetch users');
        }
        setLoading(false);
      };

      useEffect(() => {
        fetchUsers();
      }, [page, searchTerm]);

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
    ) : users.length > 0 ? (
      <Table1 users={users} fetchUsers={fetchUsers} />
    ) : (
      <p className='ml-[400px] text-red-700 font-md'>No Users found</p>
    )}
    <div className='flex justify-center'>
      <button
        onClick={handlePreviousPage}
        disabled={page === 1}
        className={`w-10 h-10 flex items-center justify-center rounded-full border p-2 ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        &#9664;
      </button>
      <button
        onClick={handleNextPage}
        disabled={page * limit >= total}
        className={`w-10 h-10 flex items-center justify-center rounded-full border p-2 ${page * limit >= total ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        &#9654;
      </button>
    </div>
  </div>

  )
}

export default Users
