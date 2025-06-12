import { Label } from '@radix-ui/react-label';
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { User_Api_EndPoint } from '@/utils/const';
import NavBar from '../shared/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading ,setUser} from '@/redux/authSlice';
import store from '@/redux/store';
import { Eye, Loader2 } from 'lucide-react';


function Login() {
    const [input, setInput]=useState({
        email:"",
        password:"",
        role:""
    });

    //show password
    const[show,setShow]=useState(false);
    //redux hooks
    const {user,loading}= useSelector(store=>store.auth);
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const changeEventHandler=(e)=>{
        setInput({...input,[e.target.name]:e.target.value});
    }
    const submitHandler=async(e)=>{
          e.preventDefault();
          
          try {
              dispatch(setLoading(true))
              const res=await axios.post(`${User_Api_EndPoint}/login`,input,{
                headers:{
                "Content-Type":"application/json"
              },withCredentials:true});

              if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
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
          <h1 className='font-bold text-xl mb-5 flex justify-center'>Login</h1>
          <div className='mt-2'>
            <Label>Email</Label>
            <Input type={"email"} value={input.email} name="email" onChange={changeEventHandler} placeholder="Enter Email" />
          </div>
          <div className='mt-2'>
            <Label>Password</Label>
            <div className='flex'>
              <Input type={show?"text":"password"} value={input.password} name="password" onChange={changeEventHandler} placeholder="Enter password" className={"rounded-r-none"}/>
              <Button className={"rounded-l-none border-none cursor-pointer"} type="button" onClick={()=>setShow(!show)}><Eye/></Button>
            </div>
          </div>
          <div className='flex items-center justify-between mt-2'>
            <RadioGroup  className='flex items-center gap-2 my-2'>
              <div className="flex items-center gap-3">
                <Input type={"radio"} name="role" value="student" checked={input.role==='student'} onChange={changeEventHandler} id="r1" className={"cursor-pointer"}/>
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center gap-3">
                <Input type={"radio"} name="role" value="recruiter" checked={input.role==='recruiter'} onChange={changeEventHandler} className={"cursor-pointer "} id="r2"/>
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {
            loading?<Button className="w-full mt-2 cursor-pointer"><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please wait</Button>:<Button type="submit" className="w-full mt-2 cursor-pointer">Login</Button>
          }
          
          <span className='text-sm'>Don't have an Account? <Link to={'/signup'} className='text-blue-600'>SignUp</Link></span>
        </form>
      </div>
    </div>
  )
}

export default Login;
