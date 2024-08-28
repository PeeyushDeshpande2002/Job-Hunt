import React, { useEffect } from 'react'
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from '../utils/constant'
import { setAllJobs, setAppliedJobs } from '../redux/jobSlice';
import { useDispatch, useSelector } from "react-redux";
const useGetAppliedJobs = () => {
    const dispatch = useDispatch();
    
    useEffect(()=>{
        const fetchAppliedJobs = async()=>{
            try {
                const res = await fetch(`${APPLICATION_API_ENDPOINT}/get`, {
                    method : 'GET',
                    credentials : 'include'
                });
                if(res.ok){
                    const data = await res.json();
                    dispatch(setAppliedJobs(data.application));
                    console.log(data);
                }
            } catch (error) {
                console.log(error);    
            }
        };
        fetchAppliedJobs();
    });
}

export default useGetAppliedJobs
