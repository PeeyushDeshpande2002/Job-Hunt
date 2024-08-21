import React from "react";
import { Typography, Box, Button, Badge, Divider, Chip } from "@mui/material";
const isApplied = true;
const JobDescription = () => {
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
            {/* {singleJob?.title} */}Software Developer
          </Typography>
          <Box display="flex" alignItems="center" gap={1.2} mt={1}>
            <Chip label={"1 Positions"} color="primary" variant="outlined" />
            <Chip
              label={`Part time`}
              sx={{ color: "#F83002", fontWeight: "bold" }}
              variant="outlined"
            />
            <Chip
              label={` 10 LPA`}
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
            {/* {singleJob?.title} */}Title
          </Typography>
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          Location:{" "}
          <Typography
            component="span"
            fontWeight="normal"
            color="text.secondary"
          >
            {/* {singleJob?.location} */}Pune
          </Typography>
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          Description:{" "}
          <Typography
            component="span"
            fontWeight="normal"
            color="text.secondary"
          >
            {/* {singleJob?.description} */} Join our Operations team as a
            Junior Developer and contribute to the scaling of our world-class
            SaaS recruiting software. In this role, you’ll tackle production
            issues, assist the Customer Support team, and analyze errors. You’ll
            develop automation software for operational needs and create
            monitoring scripts for integrations. This is an ideal opportunity
            for someone with a year of software development or operations
            engineering experience, keen to grow in a dynamic, team-oriented
            environment. You’ll need a solid foundation in databases, SQL, and
            willingness to learn Ruby on Rails. Be part of a team passionate
            about delivering quality and excellence.
          </Typography>
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          Experience:{" "}
          <Typography
            component="span"
            fontWeight="normal"
            color="text.secondary"
          >
            {/* {singleJob?.experience}  */}5 yrs
          </Typography>
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          Salary:{" "}
          <Typography
            component="span"
            fontWeight="normal"
            color="text.secondary"
          >
            {/* {singleJob?.salary} */}
            10 LPA
          </Typography>
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          Total Applicants:{" "}
          <Typography
            component="span"
            fontWeight="normal"
            color="text.secondary"
          >
            {/* {singleJob?.applications?.length} */}400
          </Typography>
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          Posted Date:{" "}
          <Typography
            component="span"
            fontWeight="normal"
            color="text.secondary"
          >
            {/* {singleJob?.createdAt.split("T")[0]} */}21.08.2024
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default JobDescription;
