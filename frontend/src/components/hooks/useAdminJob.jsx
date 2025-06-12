import { setAdminJob } from '@/redux/jobslice';
import { JOB_API_END_POINT } from '@/utils/const';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const useAdminJob = () => {
    const dispatch=useDispatch();
    useEffect(()=>{
        const fetData=async()=>{
            try {
                const res=await axios.get(`${JOB_API_END_POINT}/getadminJobs`,{withCredentials:true});
                dispatch(setAdminJob(res.data.jobs));
            } catch (error) {
                console.log(error);
            }
        }
        fetData();
    },[]);
}

export default useAdminJob;
