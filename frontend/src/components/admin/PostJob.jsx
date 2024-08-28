import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { JOB_API_ENDPOINT } from "../../utils/constant";
import { useSnackbar } from "notistack";
import { MenuOpen } from "@mui/icons-material";
const PostJob = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experienceLevel: "",
    position: 0,
    companyId: "",
  });
  const { user } = useSelector((store) => store.auth);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (e) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === e.target.value
    );
    setInput({ ...input, companyId: selectedCompany?._id || "" });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(input);
    try {
      const res = await fetch(`${JOB_API_ENDPOINT}/post/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(input),
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        enqueueSnackbar(data.message, { variant: "success" });
        navigate("/admin/jobs")
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: "error" });
    }
    setLoading(false);
  };
  return (
    <Box display="flex" justifyContent="center" my={5} width="100%">
      <form
        onSubmit={submitHandler}
        style={{
          padding: "2rem",
          maxWidth: "800px",
          border: "1px solid #e0e0e0",
          boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
          borderRadius: "8px",
        }}
      >
        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
          <TextField
            label="Title"
            name="title"
            value={input.title}
            onChange={changeEventHandler}
            fullWidth
            margin="dense"
            variant="outlined"
          />
          <TextField
            label="Description"
            name="description"
            value={input.description}
            onChange={changeEventHandler}
            fullWidth
            margin="dense"
            variant="outlined"
          />
          <TextField
            label="Requirements"
            name="requirements"
            value={input.requirements}
            onChange={changeEventHandler}
            fullWidth
            margin="dense"
            variant="outlined"
          />
          <TextField
            label="Salary"
            name="salary"
            type="number"
            value={input.salary}
            onChange={changeEventHandler}
            fullWidth
            margin="dense"
            variant="outlined"
          />
          <TextField
            label="Location"
            name="location"
            value={input.location}
            onChange={changeEventHandler}
            fullWidth
            margin="dense"
            variant="outlined"
          />
          <TextField
            label="Job Type"
            name="jobType"
            value={input.jobType}
            onChange={changeEventHandler}
            fullWidth
            margin="dense"
            variant="outlined"
          />
          <TextField
            label="Experience Level"
            name="experienceLevel"
            type="number"
            value={input.experienceLevel}
            onChange={changeEventHandler}
            fullWidth
            margin="dense"
            variant="outlined"
          />
          <TextField
            label="No of Positions"
            name="position"
            type="number"
            value={input.position}
            onChange={changeEventHandler}
            fullWidth
            margin="dense"
            variant="outlined"
          />
          {companies.length > 0 && (
            <FormControl fullWidth margin="dense">
              <InputLabel>Select a Company</InputLabel>
              <Select
                value={
                  companies
                    .find((company) => company._id === input.companyId)
                    ?.name.toLowerCase() || ""
                }
                onChange={selectChangeHandler}
                label="Select a Company"
              >
                {companies.map((company) => (
                  <MenuItem
                    key={company?._id}
                    value={company.name.toLowerCase()}
                  >
                    {company.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Box>
        <Box mt={4}>
          {loading ? (
            <Button fullWidth variant="contained" color="primary" disabled>
              <CircularProgress size={24} />
              &nbsp;Please wait
            </Button>
          ) : (
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
            >
              Post New Job
            </Button>
          )}
          {companies.length === 0 && (
            <Typography
              variant="caption"
              color="error"
              align="center"
              display="block"
              mt={3}
              fontWeight="bold"
            >
              *Please register a company first, before posting a job
            </Typography>
          )}
        </Box>
      </form>
    </Box>
  );
};

export default PostJob;
