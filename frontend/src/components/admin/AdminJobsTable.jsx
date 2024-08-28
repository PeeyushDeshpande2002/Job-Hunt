import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { setSearchJobByText } from "../../redux/jobSlice";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  console.log(allAdminJobs);

  const navigate = useNavigate();
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);

  useEffect(() => {
    const filteredJob =
      allAdminJobs?.length > 0 &&
      allAdminJobs.filter((job) => {
        if (!searchJobByText) return true;
        return (
          job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
          job?.company?.name
            .toLowerCase()
            .includes(searchJobByText.toLowerCase())
        );
      });
    console.log(filteredJob);

    setFilterJobs(filteredJob);
  }, [searchJobByText, allAdminJobs]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <caption>A list of your recently posted jobs</caption>
        <TableHead>
          <TableRow>
            <TableCell>Company Name</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Date</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filterJobs &&
            filterJobs.map((job) => (
              <TableRow key={job._id}>
                <TableCell>{job?.company?.name}</TableCell>
                <TableCell>{job?.title}</TableCell>
                <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => {
                      navigate(`/admin/jobs/${job._id}`);
                    }}
                  >
                    <EditIcon fontSize="xs" />
                  </IconButton>
                  <IconButton
                    onClick={() =>
                      navigate(`/admin/jobs/${job._id}/applicants`)
                    }
                  >
                    <VisibilityIcon fontSize="xs" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdminJobsTable;
