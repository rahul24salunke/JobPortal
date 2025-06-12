import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';

const ApplicationJobTable= () => {
  const {allAppliedJobs} =useSelector(store=>store.job);
  return (
    <div>
      <Table>
        <TableCaption> A list of your Applied jobs</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Job Role</TableHead>
                <TableHead>Company</TableHead>
                <TableHead className={"text-right"}>Status</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {
                allAppliedJobs.length<=0 ?<span>You haven't applied to any job yet.</span> :allAppliedJobs.map((appliedJobs)=>(
                    <TableRow key={appliedJobs._id}>
                        <TableCell>{appliedJobs?.job?.createdAt.split("T")[0]}</TableCell>
                        <TableCell>{appliedJobs?.job?.title}</TableCell>
                        <TableCell>{appliedJobs?.job?.company?.name}</TableCell>
                        <TableCell className={"text-right"}><Badge>{appliedJobs?.status}</Badge></TableCell>
                    </TableRow>
                ))
            }
        </TableBody>
      </Table>
    </div>
  )
}

export default ApplicationJobTable;
