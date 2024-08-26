import React, { useEffect } from 'react'
import { JOB_API_ENDPOINT } from '../utils/constant'
import { setAllJobs } from '../redux/jobSlice';
import { useDispatch } from "react-redux";
const useGetAllJobs = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchAllJobs = async()=>{
            try {
                const res = await fetch(`${JOB_API_ENDPOINT}/get`, {
                    method : 'GET',
                    credentials : 'include'
                });
                if(res.ok){
                    const data = await res.json();
                    dispatch(setAllJobs(data.jobs));
                }
            } catch (error) {
                console.log(error);
                
            }
        };
        fetchAllJobs();
    });
}

export default useGetAllJobs
