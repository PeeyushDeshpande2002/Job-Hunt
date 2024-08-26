import React, { useEffect } from 'react'
import { COMPANY_API_ENDPOINT } from '../utils/constant'
import { useDispatch } from "react-redux";
import { setCompanies } from '../redux/companySlice';
const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchAllCompanies = async()=>{
            try {
                const res = await fetch(`${COMPANY_API_ENDPOINT}/get`, {
                    method : 'GET',
                    credentials : 'include'
                });
                if(res.ok){
                    const data = await res.json();
                    dispatch(setCompanies(data.companies));
                }
            } catch (error) {
                console.log(error);
                
            }
        };
        fetchAllCompanies();
    }, []);
}

export default useGetAllCompanies
