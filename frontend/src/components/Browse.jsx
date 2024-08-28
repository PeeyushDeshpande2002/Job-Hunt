import React, { useEffect } from 'react'
import { Container, Box, Grid, Typography } from '@mui/material';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '../redux/jobSlice';
import useGetAllJobs from '../hooks/useGetAllJobs';
import { motion } from "framer-motion";
const Browse = () => {
    useGetAllJobs();
    const {allJobs} = useSelector(store => store.job);
    const dispatch = useDispatch();
    useEffect(()=>{
        return ()=>{
            dispatch(setSearchedQuery(""))
        }
    })
    return (
        <Box>
            <Container maxWidth="lg" sx={{ my: 10 }}>
                <Typography variant="h6" fontWeight="bold" sx={{ my: 2, textAlign: 'left'}}>
                    Search Results ({allJobs.length})
                </Typography>
                <Grid container spacing={4}>
                    {allJobs.map((job) => (
                        
                        <Grid item xs={12} sm={6} md={4} key={job._id}>
                            <Job key={job._id} job={job} />
                        </Grid>
                       
                    ))}
                </Grid>
                
            </Container>
        </Box>
    );
}

export default Browse
