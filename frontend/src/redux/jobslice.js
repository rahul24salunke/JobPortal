import { createSlice } from "@reduxjs/toolkit";

const jobSlice=createSlice({
    name:"job",
    initialState:{
        alljobs:[],
        singleJob:null,
        searachJobByText:"",
        adminJob:[],
        allAppliedJobs:[],
        searchedQuery:"",
    },
    reducers:{
        setAllJobs:(state,action)=>{
            state.alljobs=action.payload;
        },
        setSingleJob:(state,action)=>{
            state.singleJob=action.payload;
        },
        setSearachJobByText:(state,action)=>{
            state.searachJobByText=action.payload;
        },
        setAdminJob:(state,action)=>{
            state.adminJob=action.payload;
        },
        setAllAppliedJobs:(state,action)=>{
            state.allAppliedJobs=action.payload;
        },
        setSearchedQuery:(state,action)=>{
            state.searchedQuery=action.payload;
        }
    }
});
export const {setAllJobs,setSingleJob,setSearchedQuery,setAllAppliedJobs,setSearachJobByText,setAdminJob}=jobSlice.actions;
export default jobSlice.reducer;