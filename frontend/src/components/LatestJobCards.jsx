import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <Card
            onClick={() => navigate(`/description/${job._id}`)}
            sx={{
                p: 2,
                borderRadius: 2,
                boxShadow: 3,
                bgcolor: 'white',
                border: '1px solid',
                borderColor: 'grey.100',
                cursor: 'pointer',
                '&:hover': {
                    boxShadow: 6,
                },
            }}
        >
            <CardContent>
                <Box mb={2}>
                    <Typography variant="h6" component="h1" fontWeight="medium">
                        {job?.company?.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        India
                    </Typography>
                </Box>

                <Box mb={2}>
                    <Typography variant="h5" component="h2" fontWeight="bold">
                        {job?.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {job?.description}
                    </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1} mt={2}>
                    <Chip
                        label={`${job?.position} Positions`}
                        sx={{ color: 'blue.700', fontWeight: 'bold' }}
                        variant="outlined"
                    />
                    <Chip
                        label={job?.jobType}
                        sx={{ color: '#F83002', fontWeight: 'bold' }}
                        variant="outlined"
                    />
                    <Chip
                        label={`${job?.salary} LPA`}
                        sx={{ color: '#7209b7', fontWeight: 'bold' }}
                        variant="outlined"
                    />
                </Box>
            </CardContent>
        </Card>
    );
};

export default LatestJobCards;
