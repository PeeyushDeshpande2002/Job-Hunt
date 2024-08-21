import React, { useState } from 'react'
import { Container, Box, Typography, InputBase, Button, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const HeroSection = () => {
    const [query, setQuery] = useState('');

    const searchJobHandler = () => {
        // Handle the job search logic
    };

    return (
        <Container>
            <Box display="flex" flexDirection="column" alignItems="center" gap={1} my={8} textAlign="center">
                <Typography
                    sx={{
                        mx: 'auto',
                        px: 4,
                        py: 2,
                        borderRadius: '9999px',
                        bgcolor: 'grey.100',
                        color: '#F83002',
                        fontWeight: 'medium'
                    }}
                >
                    No. 1 Job Hunt Website
                </Typography>

                <Typography variant="h1" fontWeight="bold" fontSize="3rem">
                    Search, Apply & <br /> Get Your{' '}
                    <Box component="span" sx={{ color: '#6A38C2' }}>
                        Dream Jobs
                    </Box>
                </Typography>

                <Typography variant="body1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid aspernatur temporibus nihil tempora dolor!
                </Typography>

                <Paper
                    component="form"
                    onSubmit={(e) => { e.preventDefault(); searchJobHandler(); }}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '40%',
                        boxShadow: 3,
                        borderRadius: '9999px',
                        border: 1,
                        borderColor: 'grey.200',
                        pl: 3,
                        mx: 'auto',
                    }}
                >
                    <InputBase
                        placeholder="Find your dream jobs"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        sx={{ ml: 1, flex: 1 }}
                        inputProps={{ 'aria-label': 'find your dream jobs' }}
                    />
                    <Button
                        onClick={searchJobHandler}
                        type="submit"
                        sx={{
                            borderRadius: '0 9999px 9999px 0',
                            bgcolor: '#6A38C2',
                            color: 'white',
                            p: 1.5,
                            '&:hover': {
                                bgcolor: '#5828a3',
                            },
                        }}
                    >
                        <SearchIcon />
                    </Button>
                </Paper>
            </Box>
        </Container>
    );
}

export default HeroSection
