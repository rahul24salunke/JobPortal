import React, { useState } from 'react'
import NavBar from '../shared/NavBar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import { toast } from 'sonner'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/const'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });

    const { companies } = useSelector(store => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const selectChangedHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany._id });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/admin/jobs')
                loading(false);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <NavBar />
            <div className='flex  items-center justify-center w-screen my-5'>
                <form onSubmit={submitHandler} className='p-8 border max-w-4xl border-gray-200 shadow-lg rounded-md'>
                    <div className='w-xl'>
                        <div className='my-1'>
                            <Label>Title</Label>
                            <Input type={"text"} value={input.title} onChange={changeEventHandler} name="title" className={"focus-visible:ring-offset-0 focus-visible:ring-0 my-1"} />
                        </div>
                        <div className='my-1'>
                            <Label>Description</Label>
                            <Input type={"text"} value={input.description} onChange={changeEventHandler} name="description" className={"focus-visible:ring-offset-0 focus-visible:ring-0 my-1"} />
                        </div>
                        <div className='my-1'>
                            <Label>Requirement</Label>
                            <Input type={"text"} value={input.requirements} onChange={changeEventHandler} name="requirements" className={"focus-visible:ring-offset-0 focus-visible:ring-0 my-1"} />
                        </div>
                        <div className='my-1'>
                            <Label>Salary</Label>
                            <Input type={"text"} value={input.salary} onChange={changeEventHandler} name="salary" className={"focus-visible:ring-offset-0 focus-visible:ring-0 my-1"} />
                        </div>
                        <div className='my-1'>
                            <Label>Location</Label>
                            <Input type={"text"} value={input.location} onChange={changeEventHandler} name="location" className={"focus-visible:ring-offset-0 focus-visible:ring-0 my-1"} />
                        </div>
                        <div className='my-1'>
                            <Label>jobType</Label>
                            <Input type={"text"} value={input.jobType} onChange={changeEventHandler} name="jobType" className={"focus-visible:ring-offset-0 focus-visible:ring-0 my-1"} />
                        </div>
                        <div className='my-1'>
                            <Label>Experience</Label>
                            <Input type={"text"} value={input.experience} onChange={changeEventHandler} name="experience" className={"focus-visible:ring-offset-0 focus-visible:ring-0 my-1"} />
                        </div>
                        <div className='grid grid-cols-2 items-end gap-4'>
                            <div>
                                <Label>Position</Label>
                                <Input type={"number"} value={input.position} onChange={changeEventHandler} name="position" className={"focus-visible:ring-offset-0 focus-visible:ring-0 my-1"} />
                            </div>
                            <div>
                                {
                                    companies.length > 0 && (
                                        <Select onValueChange={selectChangedHandler}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select a Company" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {
                                                        companies.map((company) => {
                                                            return (
                                                                <SelectItem value={company?.name?.toLowerCase()}>{company.name}</SelectItem>
                                                            )
                                                        })
                                                    }
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )
                                }
                            </div>
                        </div>

                    </div>
                    {
                        loading ? <Button className="w-full mt-2 cursor-pointer"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait</Button> : <Button type="submit" className="w-full mt-2 cursor-pointer">Post New Job</Button>
                    }
                </form>
            </div>
        </div>
    )
}

export default PostJob
