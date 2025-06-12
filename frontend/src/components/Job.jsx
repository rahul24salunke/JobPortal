import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({job}) => {
  const navigate =useNavigate();

  const daysAgoFunction=(mongoTime)=>{
    const createdAt=new Date(mongoTime)
    const currTime=new Date();
    const timeDiff=currTime-createdAt;
    return Math.floor(timeDiff/(1000*24*60*60));
  }
  return (
    <div className='p-5 rounded-md shadow-xl mx-2 bg-white border border-gray-100'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt)===0 ? "Today":`${daysAgoFunction(job?.createdAt)}`} days ago</p>
        <Button variant={"outline"} className={"rounded-full"} size={"icon"}><Bookmark /></Button>
      </div>
      <div className='flex items-center gap-2 my-2'>
        <Button variant={"outline"} size={"icon"} className={"p-6"}>
          <Avatar>
            <AvatarImage src={job.company.logo} />
          </Avatar>
        </Button>
        <div className='w-full break-words overflow-hidden text-ellipsis'>
          <h1 className='text-lg font-medium'>{job?.company?.name}</h1>
          <p className='text-sm text-gray-500'>{job?.location}</p>
        </div>
      </div>
      <div>
        <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
        <p className='text-sm text-gray-600'>{job?.description}</p>
      </div>
      <div className='flex items-center gap-1 mt-4 overflow-auto '>
        <Badge className={"text-blue-700 font-bold gap-1"} variant="ghost" >{job?.position} Positions</Badge>
        <Badge className={"text-blue-700 font-bold mx-2"} variant="ghost" >{job?.jobType}</Badge>
        <Badge className={"text-blue-700 font-bold"} variant="ghost" >{job?.salary}LPA</Badge>
      </div>
      <div className='flex flex-wrap items-center  gap-2 mt-5 '>
        <Button onClick={()=>navigate(`/description/${job?._id}`)} variant={"outline"} className={" w-full sm:w-auto"}>Details</Button>
        <Button className={"bg-blue-500 w-full sm:w-auto"} >Save For Later</Button>
      </div>
    </div>
  )
}

export default Job
