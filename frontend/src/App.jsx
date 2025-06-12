import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavBar from "./components/shared/NavBar";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import Page404 from "./components/Page404";
import Companies from "./components/admin/Companies";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetUp from "./components/admin/CompanySetUp";
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from "./components/admin/PostJob";
import Applicants from "./components/admin/Applicants";
import ProtectedRoutes from "./components/admin/ProtectedRoutes";

const approuter=createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<SignUp/>
  },{
    path:"/jobs",
    element:<Jobs/>
  },{
    path:"/browse",
    element:<Browse/>
  },{
    path:"/profile",
    element:<Profile/>
  },{
    path:"/description/:id",
    element:<JobDescription/>
  },{
    path:"*",
    element:<Page404/>
  },
  //admin routes
  {
    path:"/admin/companies",
    element:<ProtectedRoutes><Companies/></ProtectedRoutes>
  },{
    path:"/admin/companies/create",
    element:<ProtectedRoutes><CompanyCreate/></ProtectedRoutes>
  },{
    path:"/admin/companies/:id",
    element:<ProtectedRoutes><CompanySetUp/></ProtectedRoutes>
  },{
    path:"/admin/jobs",
    element:<ProtectedRoutes><AdminJobs/></ProtectedRoutes>
  },{
    path:"/admin/jobs/create",
    element:<ProtectedRoutes><PostJob/></ProtectedRoutes>
  },{
    path:"/admin/jobs/:id/applicants",
    element:<ProtectedRoutes><Applicants/></ProtectedRoutes>
  }
])
function App() {
  return (
    <>
      <RouterProvider router={approuter}/>
    </>
  )
}

export default App;