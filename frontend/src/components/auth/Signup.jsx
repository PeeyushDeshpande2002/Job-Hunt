import React from "react";
import {
  Container,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  CircularProgress,
  InputLabel,
  Link,
  Box,
} from "@mui/material";
import { useState } from "react";
import { USER_API_ENDPOINT } from "../../utils/constant";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import store from "../../redux/store";
import { setLoading } from "../../redux/authSlice";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    profile: null,
  });
 // const [loading, setLoading] = useState(false);
 const {loading} = useSelector(store=>store.auth);
 const dispatch = useDispatch();
  const {enqueueSnackbar} = useSnackbar();
  const navigate = useNavigate();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, profile: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phone", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
   
    try {
      dispatch(setLoading(true));
      const res = await fetch('http://localhost:8000/api/user/register', {
        method : 'POST',
        // headers : {
        //     'Content-Type' : 'multipart/form-data'
        // },
        body : formData,
        credentials: 'include',
      });
     
      
      if(res.ok){
        const data = await res.json();
        enqueueSnackbar(data.message, { variant: 'success' });
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: 'error' });
    }finally{
      dispatch(setLoading(false));
    }
  };

  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Box
          component="form"
          onSubmit={submitHandler}
          sx={{
            width: "50%",
            border: 1,
            borderColor: "grey.200",
            borderRadius: 1,
            p: 4,
            my: 10,
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Sign Up
          </Typography>

          {/* Full Name */}
          <TextField
            fullWidth
            label="Full Name"
            variant="outlined"
            margin="normal"
            name="fullname"
            value={input.fullname}
            onChange={changeEventHandler}
            placeholder="Enter your full name"
          />

          {/* Email */}
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            placeholder="abc@gmail.com"
          />

          {/* Phone Number */}
          <TextField
            fullWidth
            label="Phone Number"
            variant="outlined"
            margin="normal"
            name="phoneNumber"
            value={input.phoneNumber}
            onChange={changeEventHandler}
            placeholder="8080808080"
          />

          {/* Password */}
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            margin="normal"
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            placeholder="Your Password"
          />

          {/* Role Radio Group */}
          <RadioGroup
            row
            name="role"
            value={input.role}
            onChange={changeEventHandler}
            sx={{ my: 2 }}
          >
            <FormControlLabel
              value="student"
              control={<Radio />}
              label="Student"
            />
            <FormControlLabel
              value="recruiter"
              control={<Radio />}
              label="Recruiter"
            />
          </RadioGroup>

          {/* Profile Upload */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{ my: 2 }}
          >
            <InputLabel htmlFor="profile">Profile</InputLabel>
            <TextField
              id="profile"
              type="file"
              accept="image/*"
              onChange={changeFileHandler}
              InputLabelProps={{ shrink: true }}
              sx={{ width: "50%" }}
            />
          </Box>

          {/* Submit Button */}
          <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
            {loading ? (
              <Button variant="contained" fullWidth disabled>
                <CircularProgress size={24} sx={{ color: "white", mr: 2 }} />
                Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: "black", color: "white" }}
                fullWidth
              >
                Signup
              </Button>
            )}
          </Box>

          {/* Login Link */}
          <Typography variant="body2" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <Link href="/login" color="secondary">
              Login
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
