import React, { useEffect } from 'react'
import { COMPANY_API_ENDPOINT, JOB_API_ENDPOINT } from '../utils/constant'
import { setAllJobs } from '../redux/jobSlice';
import { useDispatch } from "react-redux";
import { setSingleCompany } from '../redux/companySlice';
const useGetSingleCompany = (companyId) => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchSingleCompany = async()=>{
            try {
                const res = await fetch(`${COMPANY_API_ENDPOINT}/get/${companyId}`, {
                    method : 'GET',
                    credentials : 'include'
                });
                if(res.ok){
                    const data = await res.json();
                    dispatch(setSingleCompany(data.singleCompany));
                }
            } catch (error) {
                console.log(error);
                
            }
        };
        fetchSingleCompany();
    }, [companyId, dispatch]);
}

export default useGetSingleCompany
