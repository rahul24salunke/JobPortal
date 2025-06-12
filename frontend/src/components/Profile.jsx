import React, { useState } from 'react'
import NavBar from './shared/NavBar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Eye, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import ApplicationJobTable from './ApplicationJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJob from './hooks/useGetAppliedJob'


const Skills = ["Html", "Css", "JavaScript", "React"];
const isResume = true;
const Profile = () => {
    useGetAppliedJob();
    const [open ,setOpen]=useState(false);
    const {user}=useSelector(store=>store.auth);
    return (
        <div>
            <NavBar />
            <div className='max-w-4xl mx-auto bg-white border rounded-2xl border-gray-200 my-5 p-8'>
                <div className='flex  justify-between gap-4'>
                    <div className='flex items-center gap-5'>
                        <Avatar className={"h-24 w-24"}>
                            <AvatarImage src={(user?.profile?.profilePhoto)|| "https://github.com/shadcn.png"}/>
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>{user?.fullName}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={()=>{setOpen(true)}} className={"text-right"} variant={"outline"}><Pen /></Button>
                </div>
                <div className='my-2'>
                    <div className='flex items-center gap-2 my-2'>
                        <Mail className='w-4.5'/>
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-2 my-2'>
                        <Contact className='w-4.5'/>
                        <span>{user?.phonenumber}</span>
                    </div>
                </div>
                <div className='my-2'>
                    <Label className={"text-md font-bold"}>Skills</Label>
                    <div className='flex items-center gap-2 my-2'>
                        {
                            user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge key={index} variant={"outline"} className={"text-blue-700"}>{item}</Badge>) : <span>NA</span>
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className={"text-md font-bold"}>Resume</Label>
                    {
                        isResume ? <a target='blank' href={user?.profile?.resume} className='text-blue-700 w-full hover:underline'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
                    }
                </div>

            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                <Label className={"text-md font-bold my-2"}>Applied Jobs</Label>
                <ApplicationJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}

export default Profile
