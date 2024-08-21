import React from 'react'
import { Container, Box, Grid, Typography } from '@mui/material';
import Job from './Job';
const allJobs = [1, 2, 3, 4, 5]
const Browse = () => {
    return (
        <Box>
            <Container maxWidth="lg" sx={{ my: 10 }}>
                <Typography variant="h6" fontWeight="bold" sx={{ my: 2, textAlign: 'left'}}>
                    Search Results ({allJobs.length})
                </Typography>
                <Grid container spacing={4}>
                    {allJobs.map((job) => (
                        <Grid item xs={12} sm={6} md={4} key={job._id}>
                            <Job job={job} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}

export default Browse
