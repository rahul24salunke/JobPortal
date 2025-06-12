import React, { useEffect, useState } from 'react'
import NavBar from '../shared/NavBar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/const'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import useGetCompanyById from '../hooks/useGetCompanyById'

const CompanySetUp = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });

    
    const navigate = useNavigate();
    const {singleCompany}=useSelector((store)=>store.company);
    const dispatch=useDispatch();

    const changeEventHandler = async (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const changeFileHandler = async (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true))
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    withCredentials: true
                }
            );
            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/admin/companies');
                dispatch(setLoading(false));
            }
        } catch (error) {
            dispatch(setLoading(false));
            console.log(error);
            toast.error(error?.response?.data?.message);
            
        }finally{
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany.name ||"",
            description: singleCompany.description|| "",
            website: singleCompany.website || "",
            location:singleCompany.location || "",
            file: singleCompany.file || null
        })
    },[singleCompany]);
    return (
        <div>
            <NavBar />
            <div className="max-w-xl mx-auto my-10">
                <form onSubmit={submitHandler}>
                    <div className='flex items-center gap-5 p-8 '>
                        <Button onClick={() => navigate('/admin/companies')} variant={"ghost"} className='flex items-center gap-2  text-gray-500 font-semibold cursor-pointer'><ArrowLeft /><span >Back</span></Button>
                        <h1 className="font-bold text-xl">Company Setup</h1>
                    </div>
                    <div className='grid'>
                        <div className='my-2'>
                            <Label>company Name</Label>
                            <Input type={"text"} placeholder="Company Name" name='name' value={input.name} onChange={changeEventHandler} />
                        </div>
                        <div className='my-2'>
                            <Label>Description</Label>
                            <Input type={"text"} placeholder="Description" name='description' value={input.description} onChange={changeEventHandler} />
                        </div>
                        <div className='my-2'>
                            <Label>Web Site</Label>
                            <Input type={"text"} placeholder="website" name='website' value={input.website} onChange={changeEventHandler} />
                        </div>
                        <div className='my-2'>
                            <Label>Location</Label>
                            <Input type={"text"} placeholder="Location" name='location' value={input.location} onChange={changeEventHandler} />
                        </div>
                        <div className='my-2'>
                            <Label>Logo</Label>
                            <Input type={"file"} accept="image/*" placeholder="Upload Company Logo" onChange={changeFileHandler} />
                        </div>
                    </div>
                        <Button type="submit" className={"w-full mt-8 cursor-pointer"}>Update</Button>
                </form>
            </div>
        </div>
    )
}

export default CompanySetUp
