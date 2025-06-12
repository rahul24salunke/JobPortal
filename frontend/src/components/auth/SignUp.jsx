import { Label } from '@radix-ui/react-label';
import React, { useState ,useEffect} from 'react'
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User_Api_EndPoint } from '@/utils/const';
import { toast } from 'sonner';
import { setLoading } from '@/redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Eye, Loader2 } from 'lucide-react';
import NavBar from '../shared/NavBar';

function SignUp() {
  const [input, setInput]=useState({
          fullname:"",
          email:"",
          password:"",
          phonenumber:"",
          role:"",
          file:""
      });

      //show password
          const[show,setShow]=useState(false);

      const navigate=useNavigate();
      const {loading,user}= useSelector(store=>store.auth);
      const dispatch=useDispatch();

      const changeEventHandler=(e)=>{
          setInput({...input,[e.target.name]:e.target.value});
      }
      const changeFileHandler=(e)=>{
          setInput({...input,file:e.target.files?.[0]});
      }
      const submitHandler=async(e)=>{
          e.preventDefault();
          const formData=new FormData();
          formData.append("fullName",input.fullname);
          formData.append("email",input.email);
          formData.append("phonenumber",input.phonenumber);
          formData.append("password",input.password);
          formData.append("role",input.role);
          if (input.file) {
            formData.append("file",input.file);
          }
          try {
              dispatch(setLoading(true))
              const res=await axios.post(`${User_Api_EndPoint}/register`,formData,{
                headers:{
                "Content-Type":"multipart/form-data"
              },withCredentials:true});

              if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
              }
          } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
          }finally{
              dispatch(setLoading(false));
          }
      }

      useEffect(()=>{
              if (user) {
                toast("user already logged in");
                navigate('/');
              }
            })
  return (
    <div>
      <NavBar/>
      <div className='flex items-center justify-center mx-auto max-w-5xl'>
        <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10 shadow-2xl'>
          <h1 className='font-bold text-xl mb-5 flex justify-center'>Sign Up</h1>
          <div className='my-2'>
            <Label>Full Name</Label>
            <Input type={"text"} value={input.fullname} name="fullname" onChange={changeEventHandler} placeholder="Enter full name" />
          </div>
          <div className='my-2'>
            <Label>Email</Label>
            <Input type={"email"} value={input.email} name="email" onChange={changeEventHandler} placeholder="Enter Email" />
          </div>
          <div className='my-2'>
            <Label>Password</Label>
            <div className='flex'>
              <Input type={show?"text":"password"} className={"rounded-r-none"} value={input.password} name="password" onChange={changeEventHandler} placeholder="Enter password" />
              <Button className={"rounded-l-none cursor-pointer"} type="button" onClick={()=>setShow(!show)}><Eye/></Button>
            </div>
          </div>
          <div className='my-2'>
            <Label>Phone Number:</Label>
            <Input type={"text"} value={input.phonenumber} name="phonenumber" onChange={changeEventHandler} placeholder="Enter Phone Number" />
          </div>
          <div className='flex items-center justify-between mt-2'>
            <RadioGroup  className='flex items-center gap-2 my-5'>
              <div className="flex items-center gap-3">
                <Input type={"radio"} name="role" value="student" checked={input.role==='student'} onChange={changeEventHandler} id="r1" className={"cursor-pointer"}/>
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center gap-3">
                <Input type={"radio"} name="role" value="recruiter"  checked={input.role==='recruiter'} onChange={changeEventHandler} className={"cursor-pointer"} id="r2"/>
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          <div className='flex items-center gap-2'>
            <Label>Profile</Label>
            <Input accept="image/*" type={"file"} onChange={changeFileHandler} className={"cursor-pointer"}/>
          </div>
          {
            loading?<Button className="w-full mt-2 "><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please wait</Button>:<Button type="submit" className="w-full mt-2 cursor-pointer">SignUp</Button>
          }
          <span className='text-sm'>Already have an Account? <Link to={'/login'} className='text-blue-600'>Login</Link></span>
        </form>
      </div>
    </div>
  )
}

export default SignUp;
