import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import CompaniesTable from './CompaniesTable';
import useGetAllCompanies from '../../hooks/useGetAllCompanies';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '../../redux/companySlice';
const Companies = () => {
    const navigate = useNavigate();
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(setSearchCompanyByText(input));
    },[input])
  return (
    <Container maxWidth="lg" sx={{ my: 10 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" my={5}>
                    <TextField
                        variant="outlined"
                        placeholder="Filter by name"
                        onChange={(e) => setInput(e.target.value)}
                        sx={{ width: 'fit-content' }}
                    />
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={() => navigate("/admin/companies/create")}
                    >
                        New Company
                    </Button>
                </Box>
                <CompaniesTable />
            </Container>
  )
}

export default Companies
