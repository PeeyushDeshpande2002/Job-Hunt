import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import { COMPANY_API_ENDPOINT } from '../../utils/constant';
import { useSnackbar } from 'notistack';
import {useDispatch} from 'react-redux';
import { setSingleCompany } from '../../redux/companySlice';

const CompanyCreate = () => {
    const [companyName, setCompanyName] = useState('');
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();
    const dispatch = useDispatch();
    const registerNewCompany = async() => {
        try {
            const res = await fetch(`${COMPANY_API_ENDPOINT}/register`, {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                credentials : 'include',
                body : JSON.stringify({name : companyName})
            });
            if(res.ok){
                const data = await res.json();
                console.log(data.company);
                dispatch(setSingleCompany(data.company));
                enqueueSnackbar(data.message, {variant : 'success'});
                const companyId = data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
            enqueueSnackbar(error.message, {variant : 'error'});
        }
    };

    return (
        <div>
            <Container maxWidth="lg">
                <Box my={5} sx={{textAlign : 'left'}}> 
                    <Typography variant="h6" fontWeight="bold">Your Company Name</Typography>
                    <Typography variant="body1" color="textSecondary">
                         You can change this later.
                    </Typography>
                </Box>

                <Typography variant="subtitle1" gutterBottom sx={{textAlign : 'left'}}>
                    Company Name
                </Typography>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="JobHunt, Microsoft etc."
                    onChange={(e) => setCompanyName(e.target.value)}
                    sx={{ my: 2 }}
                />
                <Box display="flex" alignItems="right" gap={2} my={2}>
                    <Button variant="outlined" onClick={() => navigate("/admin/companies")}>Cancel</Button>
                    <Button variant="contained" color="primary" onClick={registerNewCompany}>Continue</Button>
                </Box>
            </Container>
        </div>
  )
}

export default CompanyCreate
