import React from 'react'
import { Container, Typography, Grid, Box } from '@mui/material';
import LatestJobCards from './LatestJobCards'; 
import { useSelector } from 'react-redux';

const LatestJobs = () => {
    const {allJobs} = useSelector(store => store.job);

  return (
    <Container maxWidth="lg" sx={{ my: 10 }}>
            <Typography variant="h4" component="h1" fontWeight="bold">
                <Box component="span" sx={{ color: '#6A38C2' }}>Latest & Top </Box> 
                Job Openings
            </Typography>
            <Grid container spacing={2} my={5}>
                {
                    allJobs.length <= 0 ? (
                        <Typography variant="body1">No Job Available</Typography>
                    ) : (
                        allJobs.slice(0, 6).map((job) => (
                            <Grid item xs={12} sm={6} md={4} key={job._id}>
                                <LatestJobCards job={job} />
                            </Grid>
                        ))
                    )
                }
            </Grid>
        </Container>
  )
}

export default LatestJobs
