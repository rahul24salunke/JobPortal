import React, { useEffect, useState } from 'react'
import NavBar from '../shared/NavBar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import { setSearachJobByText } from '@/redux/jobslice'
import useAdminJob from '../hooks/useAdminJob'


const AdminJobs = () => {
  useAdminJob();
  const [input,setInput]=useState("");
  const navigate=useNavigate();
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(setSearachJobByText(input));
  },[input]);
  
  return (
    <div>
      <NavBar/>
      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-between my-5'>
            <Input onChange={(e)=>setInput(e.target.value)} className={'w-fit'} placeholder="Filter by Name and role"/>
            <Button onClick={()=>navigate('/admin/jobs/create')}>New Jobs</Button>
        </div>
        <AdminJobsTable/>
      </div>
    </div>
  )
}

export default AdminJobs
