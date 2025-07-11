import React, { useEffect, useState } from 'react'
import NavBar from '../shared/NavBar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '../hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companyslice'

const Companies = () => {
  useGetAllCompanies();
  const [input,setInput]=useState("");
  const navigate=useNavigate();
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(setSearchCompanyByText(input));
  },[input]);
  
  return (
    <div>
      <NavBar/>
      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-between my-5'>
            <Input onChange={(e)=>setInput(e.target.value)} className={'w-fit'} placeholder="Filter by Name"/>
            <Button onClick={()=>navigate('/admin/companies/create')}>New company</Button>
        </div>
        <CompaniesTable/>
      </div>
    </div>
  )
}

export default Companies
