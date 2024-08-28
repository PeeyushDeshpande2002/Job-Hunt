import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { MoreHoriz } from "@mui/icons-material"; // Replace with MoreHorizontal equivalent
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { APPLICATION_API_ENDPOINT } from "../../utils/constant";
const shortlistingStatus = ["Accepted", "Rejected"];
const ApplicantsTable = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedItemId, setSelectedItemId] = React.useState(null);
  const { applicants } = useSelector((store) => store.application);
  const handleMenuOpen = (event, itemId) => {
    setAnchorEl(event.currentTarget);
    setSelectedItemId(itemId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedItemId(null);
  };
  const statusHandler = async (status, id) => {
    try {
      const res = await fetch(
        `${APPLICATION_API_ENDPOINT}/status/${id}/update`,
        {
          method: "POST",
          credentials: "include",
          headers : {
              'Content-Type' : 'application/json',
          },
          body: JSON.stringify({ status }),
        }
      );
      if (res.ok) {
        const data = await res.json();
        enqueueSnackbar(data.message, { variant: "success" });
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };
  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <caption>A list of your recent applied users</caption>
          <TableHead>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Resume</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applicants &&
              applicants.applications.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item?.applicant?.fullname}</TableCell>
                  <TableCell>{item?.applicant?.email}</TableCell>
                  <TableCell>{item?.applicant?.phone}</TableCell>
                  <TableCell>
                    {item.applicant?.profile?.resume ? (
                      <Typography
                        component="a"
                        href={item?.applicant?.profile?.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        color="primary"
                        style={{ cursor: "pointer" }}
                      >
                        {item?.applicant?.profile?.resumeOriginalName}
                      </Typography>
                    ) : (
                      <Typography variant="body2">NA</Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(item?.applicant.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={(event) => handleMenuOpen(event, item._id)}
                    >
                      <MoreHoriz />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={selectedItemId === item._id}
                      onClose={handleMenuClose}
                    >
                      {shortlistingStatus.map((status, index) => (
                        <MenuItem
                          key={index}
                          onClick={() => {
                            statusHandler(status, item._id);
                            handleMenuClose();
                          }}
                        >
                          {status}
                        </MenuItem>
                      ))}
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ApplicantsTable;
