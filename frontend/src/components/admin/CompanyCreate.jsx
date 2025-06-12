import React, { useState } from 'react'
import NavBar from '../shared/NavBar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/const'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companyslice'

const CompanyCreate = () => {
    const navigate=useNavigate();
    const [companyName,setCompanyName]=useState('');
    console.log(companyName);
    const dispatch=useDispatch();
    const registerCompany=async()=>{
        try {
            const res=await axios.post(`${COMPANY_API_END_POINT}/registerCompany`,{companyName},{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if (res?.data?.success) {
                dispatch(setSingleCompany(res?.data?.company));
                toast.success(res.data.message);
                const companyId=res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message)
        }
    }
  return (
    <div>
      <NavBar/>
      <div className='max-w-4xl mx-auto'>
        <div className='my-10'>
            <h1 className='font-bold text-2xl'>Your company Name</h1>
            <p className='text-gray-500'>what would you like to give your company Name? you can change it later</p>
        </div>
      
        <Label>Company Name</Label>
        <Input type={"text"} className={"my-2"} placeholder="Name of the Company" onChange={(e)=>{setCompanyName(e.target.value)}}/>

        <div className="flex items-center gap-2 my-10">
            <Button variant={"destructive"} onClick={()=>navigate('/admin/companies')} className={"cursor-pointer"}>Cancel</Button>
            <Button variant={'outline'} onClick={registerCompany} className={"cursor-pointer"}>Continue</Button>
        </div>
      </div>
    </div>
  )
}

export default CompanyCreate
