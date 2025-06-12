import React, { useEffect, useState } from 'react'
import NavBar from './shared/NavBar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import {motion} from 'framer-motion';

// const jobArr=[1,2,3,4,5,6,7,8];
const Jobs = () => {
    const { alljobs,searchedQuery } = useSelector((store) => store.job);
    const [filterJobs,setFilterJobs]=useState(alljobs);

    useEffect(()=>{
    
        if(searchedQuery){
            const filteredJobs=alljobs.filter((job)=>{
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                job.location.toLowerCase().includes(searchedQuery.toLowerCase());
            })
            setFilterJobs(filterJobs);
        }else{
            setFilterJobs(alljobs);
        }
    },[alljobs,searchedQuery])
    return (
        <div>
            <NavBar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-20%'>
                        <FilterCard />
                    </div>
                    {
                        filterJobs.length <= 0 ? <span>Job Not found</span> : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-3 gap-4'>
                                    {
                                        filterJobs.map((job) => (
                                            <motion.div 
                                             initial={{opacity:0,x:100}}
                                             animate={{opacity:1,x:0}}
                                             exit={{opacity:0 ,x:-100}}
                                             transition={{duration:0.3}}
                                             
                                            key={job._id}>
                                                <Job job={job}/>
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Jobs
