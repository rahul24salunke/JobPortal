import React, { useEffect } from 'react'
import NavBar from './shared/NavBar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobslice';
import useGetAllJobs from './hooks/useGetAllJobs';


const Browse = () => {
  useGetAllJobs();
  const dispatch=useDispatch();
  const { alljobs } = useSelector((store) => store.job);
  
  useEffect(()=>{
    return()=>{
      dispatch(setSearchedQuery(""));
    }
  },[]);

  return (
    <div>
      <NavBar/>
      <div className='max-w-7xl m-auto my-10'>
        <h1 className='font-bold text-xl my-10'>Search results ({alljobs.length})</h1>
        <div className='grid grid-cols-3 gap-5 mt-5\'>
          {
          alljobs.map((job)=>{
            return (
              <Job key={job._id} job={job}/>
            )
          })
        }
        </div>
      </div>
    </div>
  )
}

export default Browse
