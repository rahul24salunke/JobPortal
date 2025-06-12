import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import { setSingleJob } from '@/redux/jobslice';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/const';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
   
    const params=useParams();
    const jobId=params.id;
    const dispatch=useDispatch();
    const {singleJob}=useSelector((store)=>store.job);
    const {user}=useSelector((store)=>store.auth);

    const isInitialyApplied = singleJob?.application?.some(application=> application.applicant === user?._id) || false;
    const [isApplied,setIsApplied]=useState(isInitialyApplied);

    const ApplyjobHAndler=async()=>{
        try {
            const res=await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`,{withCredentials:true});
            console.log(res);
            if (res.data.success) {
                setIsApplied(true)
                const updateSingleJob={...singleJob,application:[...singleJob.application,{applicant:user?._id}]};
                dispatch(setSingleJob(updateSingleJob));
                toast.success(res.data.message);

            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        const fetchSIngleJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.application.some(application=>application.applicant===user?._id))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSIngleJobs();
    }, [jobId,dispatch,user?._id]);

    return (
        <div className='max-w-7xl mx-auto my-10'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
                    <div className='flex items-center gap-1 mt-4  overflow-hidden'>
                        <Badge className={"text-blue-700 font-bold gap-1"} variant="ghost" >{singleJob?.position} Positions</Badge>
                        <Badge className={"text-blue-700 font-bold"} variant="ghost" >{singleJob?.jobType}</Badge>
                        <Badge className={"text-blue-700 font-bold"} variant="ghost" >{singleJob?.salary} LPA</Badge>
                    </div>
                </div>
                <Button onClick={isApplied? null :ApplyjobHAndler} disabled={isApplied} className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#000]'}`} >{isApplied ? 'Already applied' : 'Apply now'}</Button>
            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
            <div className='
            my-4'>
                <h1 className='font-bold my-1'>Role: <span className='pl=4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='pl=4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl=4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='pl=4 font-normal text-gray-800'>{singleJob?.experienceLevel} yrs</span></h1>
                <h1 className='font-bold my-1'>salary: <span className='pl=4 font-normal text-gray-800'>{singleJob?.salary} LPA</span></h1>
                <h1 className='font-bold my-1'>Total Application: <span className='pl=4 font-normal text-gray-800'>{singleJob?.application.length}</span></h1>
                <h1 className='font-bold my-1'>posted date: <span className='pl=4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
            </div>
        </div>
    )
}

export default JobDescription
