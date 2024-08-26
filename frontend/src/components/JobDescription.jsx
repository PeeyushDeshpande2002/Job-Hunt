import React, { useEffect, useState } from "react";
import { Typography, Box, Button, Badge, Divider, Chip } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "../redux/jobSlice";
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from "../utils/constant";
import { useSnackbar } from "notistack";

const JobDescription = () => {
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await fetch(`${JOB_API_ENDPOINT}/get/${jobId}`, {
          method: "GET",
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          dispatch(setSingleJob(data.job));
          setIsApplied(
            data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);
  const applyJobHandler = async () => {
    try {
      const res = await fetch(`${APPLICATION_API_ENDPOINT}/apply/${jobId}`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Something went wrong!");
      }
      if (res.ok) {
        const data = await res.json();
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        enqueueSnackbar(data.message, { variant: "success" });
      }
    } catch (error) {
      console.log(error.message);
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };
  return (
    <Box maxWidth="xl" mx="auto" my={4}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Box>
          <Typography variant="h5" fontWeight="bold">
            {singleJob?.title}
          </Typography>
          <Box display="flex" alignItems="center" gap={1.2} mt={1}>
            <Chip
              label={`${singleJob?.position} Positions`}
              color="primary"
              variant="outlined"
            />
            <Chip
              label={`${singleJob?.jobType}`}
              sx={{ color: "#F83002", fontWeight: "bold" }}
              variant="outlined"
            />
            <Chip
              label={` ${singleJob?.salary} LPA`}
              sx={{ color: "#7209b7", fontWeight: "bold" }}
              variant="outlined"
            />
          </Box>
        </Box>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          variant="contained"
          color={isApplied ? "inherit" : "primary"}
          sx={{
            borderRadius: 2,
            backgroundColor: isApplied ? "gray" : "#7209b7",
            "&:hover": {
              backgroundColor: isApplied ? "gray" : "#5f32ad",
            },
          }}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </Box>
      <Divider />
      <Typography
        variant="h6"
        fontWeight="medium"
        mt={2}
        mb={2}
        sx={{ textAlign: "left" }}
      >
        Job Description
      </Typography>
      <Box mt={2} sx={{ textAlign: "left" }}>
        <Typography variant="body1" fontWeight="bold">
          Role:{" "}
          <Typography
            component="span"
            fontWeight="normal"
            color="text.secondary"
          >
            {singleJob?.title}
          </Typography>
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          Location:{" "}
          <Typography
            component="span"
            fontWeight="normal"
            color="text.secondary"
          >
            {singleJob?.location}
          </Typography>
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          Description:{" "}
          <Typography
            component="span"
            fontWeight="normal"
            color="text.secondary"
          >
            {singleJob?.description}
          </Typography>
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          Experience:{" "}
          <Typography
            component="span"
            fontWeight="normal"
            color="text.secondary"
          >
            {singleJob?.experience}
          </Typography>
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          Salary:{" "}
          <Typography
            component="span"
            fontWeight="normal"
            color="text.secondary"
          >
            {singleJob?.salary}LPA
          </Typography>
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          Total Applicants:{" "}
          <Typography
            component="span"
            fontWeight="normal"
            color="text.secondary"
          >
            {singleJob?.applications?.length}
          </Typography>
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          Posted Date:{" "}
          <Typography
            component="span"
            fontWeight="normal"
            color="text.secondary"
          >
            {singleJob?.createdAt.split("T")[0]}
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default JobDescription;
