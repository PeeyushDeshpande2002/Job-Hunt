import React, { useEffect, useState } from "react";
import { Container, TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AdminJobsTable from "./AdminJobsTable";
import useGetAdminJobs from "../../hooks/useGetAdminJobs";
import { setSearchJobByText } from "../../redux/jobSlice";
import { useDispatch } from "react-redux";

const AdminJobs = () => {
  useGetAdminJobs();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  useEffect(()=>{
      dispatch(setSearchJobByText(input));
  },[input]);

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <TextField
          variant="outlined"
          placeholder="Filter by name, role"
          size="small"
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/admin/jobs/create")}
        >
          New Jobs
        </Button>
      </Box>
      <AdminJobsTable />
    </Container>
  );
};

export default AdminJobs;
