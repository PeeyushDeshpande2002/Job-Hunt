import React, { useEffect, useState } from 'react';
const fitlerData = [
    {
        key : 1,
        fitlerType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        key : 2,
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        key : 3,
        fitlerType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
]
import { Box, Typography, Divider, Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '../redux/jobSlice';

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();
    const changeHandler = (event) => {
        const { value } = event.target; // Extracting value from the event object
        setSelectedValue(value);
    }
    
    useEffect(()=>{
        dispatch(setSearchedQuery(selectedValue));
        console.log(selectedValue);
        
    },[selectedValue]);
    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper', p: 3, borderRadius: 2 }}>
            <Typography  fontWeight="bold">
                Filter Jobs
            </Typography>
            <Divider sx={{  }} />
            <FormControl component="fieldset">
                <RadioGroup value={selectedValue} onChange={changeHandler}>
                    {fitlerData.map((data, key) => (
                        <Box key={key} sx={{}}>
                            <Typography  fontWeight="bold">
                                {data.fitlerType}
                            </Typography>
                            <Box>
                            {data.array.map((item, idx) => {
                                const itemId = `id${key}-${idx}`;
                                return (
                                    <>
                                    <FormControlLabel
                                        key={itemId}
                                        value={item}
                                        control={<Radio />}
                                        label={item}
                                        sx={{}}
                                    />
                                   </>
                                   
                                );
                            })}
                             <Divider sx={{  }} />
                            </Box>
                        </Box>
                    ))}
                </RadioGroup>
            </FormControl>
        </Box>
    );
}

export default FilterCard
