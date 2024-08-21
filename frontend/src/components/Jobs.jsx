import React from 'react'
import FilterCard from './FilterCard'
import Job from './Job'
import { Container, Box, Grid, Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';
const jobsArray = [1, 2, 3, ]
const Jobs = () => {
    return (
        <Container maxWidth="lg" sx={{ mt: 5 }}>
            <Box display="flex" gap={2}>
                <Box sx={{ width: '20%' }}>
                    <FilterCard />
                </Box>

                {
                    jobsArray.length <= 0 ? (
                        <Typography variant="body1">Job not found</Typography>
                    ) : (
                        <Box
                            sx={{
                                flex: 1,
                                height: '88vh',
                                overflowY: 'auto',
                                pb: 5,
                            }}
                        >
                            <Grid container spacing={2}>
                                {
                                    jobsArray.map((job) => (
                                        <Grid item xs={12} sm={6} md={4} key={job?._id}>
                                            <motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <Paper elevation={3}>
                                                    <Job job={job} />
                                                </Paper>
                                            </motion.div>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </Box>
                    )
                }
            </Box>
        </Container>
    );
}

export default Jobs
