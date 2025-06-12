import React from 'react'
import JobCard from './JobCard'
import { useSelector } from 'react-redux';

const LatestJobs = () => {
  const {alljobs}=useSelector((store)=>store.job);
  return (
    <div className='max-w-7xl mx-auto'>
      <h1 className='text-4xl font-bold'><span className='text-[#6a38c2]'>Latest & Top </span>Job Opening</h1>
      <div className='grid grid-cols-3 gap-4 my-5'>
        {
            alljobs.length<= 0 ?<span>No Job Available</span> :alljobs.slice(0,6).map((job)=><JobCard  key={job._id} job={job}/>)
        }
      </div>
    </div>
  )
}

export default LatestJobs
