import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { User_Api_EndPoint } from "@/utils/const";
import { setUser } from "@/redux/authSlice";

const NavBar = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${User_Api_EndPoint}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate('/');
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className="bg-white my-2">
            <div className="flex items-center justify-between mx-auto max-w-7xl">
                <div>
                    <h1 className="text-2xl font-bold">Job<span className="text-[#f83002]">Portal</span></h1>
                </div>
                <div className="flex items-center gap-12">
                    <ul className="flex font-medium items-center gap-5">
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to={"/admin/companies"}>Companies</Link></li>
                                    <li><Link to={"/admin/jobs"}>Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to={"/"}>Home</Link></li>
                                    <li><Link to={"/jobs"}>Jobs</Link></li>
                                    <li><Link to={"/browse"}>Browse</Link></li>
                                </>
                            )
                        }
                    </ul>
                    {
                        !user ? (
                            <div className="flex gap-4">
                                <Link to="/login"><Button variant={"outline"} className={"cursor-pointer"}>Login</Button></Link>
                                <Link to={'/signup'}><Button variant={"outline"} className={"cursor-pointer"}>SignUp</Button></Link>
                            </div>
                        ) : (
                            <Popover >
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={(user?.profile?.profilePhoto) || "https://github.com/shadcn.png"}></AvatarImage>
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 shadow-xl">
                                    <div>
                                        <div className="flex gap-4 space-y-2">
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src={(user?.profile?.profilePhoto) || "https://github.com/shadcn.png"}></AvatarImage>
                                            </Avatar>
                                            <div>
                                                <h4 className="font-medium">{user?.fullName}</h4>
                                                <p className="text-muted-foreground">{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div className="flex text-gray-600 items-center gap-5 mt-2">
                                            {
                                                user && user.role === 'student' && (
                                                    <div>
                                                        <Button variant="outline"><User2 /><Link to={'/profile'}>View Profile</Link></Button>
                                                    </div>
                                                )
                                            }
                                            <div>
                                                <Button onClick={logoutHandler} variant="destructive"><LogOut />Logout</Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
export default NavBar;