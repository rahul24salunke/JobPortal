import { setSingleCompany } from '@/redux/companyslice'
import { setAllJobs } from '@/redux/jobslice'
import { COMPANY_API_END_POINT, JOB_API_END_POINT } from '@/utils/const'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetCompanyById = (companyId) => {
    const dispatch=useDispatch();
    useEffect(() => {
        const fetchSingleJobs = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/getCompany/${companyId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJobs();
    }, [companyId])
}

export default useGetCompanyById;
