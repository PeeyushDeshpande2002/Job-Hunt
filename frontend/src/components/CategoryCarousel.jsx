import React from 'react';
import { Button, Box, IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { setSearchedQuery } from '@/redux/jobSlice';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { setSearchedQuery } from '../redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
];

const CategoryCarousel = () => {
    // const dispatch = useDispatch();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const searchJobHandler = (cat) => {
        // Handle the job search logic
        dispatch(setSearchedQuery(cat));
        navigate('/browse')
    };
    // Placeholder Carousel component
    const [activeIndex, setActiveIndex] = React.useState(0);

    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % category.length);
    };

    const handlePrevious = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === 0 ? category.length - 1 : prevIndex - 1
        );
    };

    return (
        <Box sx={{ width: '100%', maxWidth: '600px', mx: 'auto', my: 10, position: 'relative' }}>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
            >
                {category.map((cat, index) => (
                    <Box
                        key={index}
                        display={index === activeIndex ? 'block' : 'none'}
                        sx={{ flexBasis: '100%', transition: 'all 0.5s ease-in-out' }}
                    >
                        <Button
                            onClick={() => searchJobHandler(cat)}
                            variant="outlined"
                            sx={{
                                borderRadius: '9999px',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {cat}
                        </Button>
                    </Box>
                ))}
            </Box>
            <IconButton
                onClick={handlePrevious}
                sx={{ position: 'absolute', top: '50%', left: '-10px', transform: 'translateY(-50%)' }}
            >
                <ArrowBackIosNewIcon />
            </IconButton>
            <IconButton
                onClick={handleNext}
                sx={{ position: 'absolute', top: '50%', right: '-10px', transform: 'translateY(-50%)' }}
            >
                <ArrowForwardIosIcon />
            </IconButton>
        </Box>
    );
};

export default CategoryCarousel;
