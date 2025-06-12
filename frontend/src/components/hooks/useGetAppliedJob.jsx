import { setAllAppliedJobs } from '@/redux/jobslice';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/const';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const useGetAppliedJob = () => {
    const dispatch=useDispatch();
    useEffect(()=>{
        const fetchAllliedJob=async()=>{
            try {
            const res=await axios.get(`${APPLICATION_API_END_POINT}/get`,{withCredentials:true});
            if (res.data.success) {
                dispatch(setAllAppliedJobs(res.data.application));
            }
                
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllliedJob();
    },[]);
}

export default useGetAppliedJob
