import React, { useEffect } from 'react'
import { JOB_API_ENDPOINT } from '../utils/constant'
import {  setAllAdminJobs } from '../redux/jobSlice';
import { useDispatch, useSelector } from "react-redux";
const useGetAdminJobs = () => {
    const dispatch = useDispatch();
    const {user} = useSelector(store=>store.auth);
    useEffect(()=>{
        const fetchAllAdminJobs = async()=>{
            try {
                const res = await fetch(`${JOB_API_ENDPOINT}/getadminjobs/${user._id}`, {
                    method : 'GET',
                    credentials : 'include'
                });
                if(res.ok){
                    const data = await res.json();
                    dispatch(setAllAdminJobs(data.jobs));
                }
            } catch (error) {
                console.log(error);
                
            }
        };
        fetchAllAdminJobs();
    });
}

export default useGetAdminJobs
