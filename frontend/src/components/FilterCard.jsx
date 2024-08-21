import React, { useState } from 'react';
const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        fitlerType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
]
import { Box, Typography, Divider, Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState();
    const changeHandler = (value) => {
        setSelectedValue(value);
    }
    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper', p: 3, borderRadius: 2 }}>
            <Typography  fontWeight="bold">
                Filter Jobs
            </Typography>
            <Divider sx={{  }} />
            <FormControl component="fieldset">
                <RadioGroup value={selectedValue} onChange={changeHandler}>
                    {fitlerData.map((data, index) => (
                        <Box key={index} sx={{}}>
                            <Typography  fontWeight="bold">
                                {data.fitlerType}
                            </Typography>
                            <Box>
                            {data.array.map((item, idx) => {
                                const itemId = `id${index}-${idx}`;
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
