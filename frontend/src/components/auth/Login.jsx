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
import { setLoading, setUser } from "../../redux/authSlice";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading } = useSelector((store) => store.auth);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, profile: e.target.files[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const res = await fetch(`${USER_API_ENDPOINT}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      if (res.ok) {
        const data = await res.json();
        dispatch(setUser(data.user));
        enqueueSnackbar(data.message, { variant: "success" });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Login failed!", { variant: "error" });
    } finally {
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
            Login
          </Typography>

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
            placeholder="patel@gmail.com"
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
                Login
              </Button>
            )}
          </Box>

          {/* Login Link */}
          <Typography variant="body2" sx={{ mt: 2 }}>
            Don't have an account?{" "}
            <Link href="/signup" color="secondary">
              Login
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
