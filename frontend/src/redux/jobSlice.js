import {createSlice} from '@reduxjs/toolkit';
import { act } from 'react';

const jobSlice = createSlice({
    name : "job",
    initialState : {
        allJobs : [],
        allAdminJobs : [],
        searchJobByText : '',
        singleJob : null,
        appliedJobs : [],
        searchedQuery : ''
    },
    reducers : {
        setAllJobs : (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob : (state, action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs : (state, action) =>{
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText : (state, action) => {
            state.searchJobByText = action.payload;
        },
        setAppliedJobs : (state, action) => {
            state.appliedJobs = action.payload;
        },
        setSearchedQuery : (state, action) => {
            state.searchedQuery = action.payload;
        }
    }
});

export const {setAllJobs, setSingleJob,setSearchedQuery, setAllAdminJobs,setAppliedJobs, setSearchJobByText} = jobSlice.actions;
export default jobSlice.reducer; 