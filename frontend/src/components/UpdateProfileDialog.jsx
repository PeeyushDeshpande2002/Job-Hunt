import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import store from "../redux/store";
import { useSnackbar } from "notistack";
import { setUser } from "../redux/authSlice";
const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.map((skill) => skill) || "",
    file: user?.profile?.resume || "",
  });
  const submitHandler = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phone", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }
    console.log('input',input);
    
    try {
      const res = await fetch("http://localhost:8000/api/user/profile/update", {
        method: "POST",
        // headers : {
        //     'Content-Type' : 'multipart/form-data'
        // },
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        dispatch(setUser(data.user));
        console.log(data);
        enqueueSnackbar(data.message, { variant: "success" });
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: "error" });
    }
    setOpen(false);
  };
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogContent>
        <DialogTitle>Update Profile</DialogTitle>
        <form onSubmit={submitHandler}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <TextField
              label="Name"
              id="name"
              name="name"
              type="text"
              value={input.fullname}
              onChange={changeEventHandler}
              fullWidth
            />
            <TextField
              label="Email"
              id="email"
              name="email"
              type="email"
              value={input.email}
              onChange={changeEventHandler}
              fullWidth
            />
            <TextField
              label="Phone Number"
              id="number"
              name="number"
              value={input.phone}
              onChange={changeEventHandler}
              fullWidth
            />
            <TextField
              label="Bio"
              id="bio"
              name="bio"
              value={input.bio}
              onChange={changeEventHandler}
              fullWidth
            />
            <TextField
              label="Skills"
              id="skills"
              name="skills"
              value={input.skills}
              onChange={changeEventHandler}
              fullWidth
            />
            <TextField
              label="Resume"
              id="file"
              name="file"
              type="file"
              accept="application/pdf"
              onChange={fileChangeHandler}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </div>

          {loading ? (
            <Button variant="contained" color="primary" fullWidth disabled>
              <CircularProgress size={24} /> Please wait
            </Button>
          ) : (
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Update
            </Button>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
