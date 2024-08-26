import React from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  Avatar,
  IconButton,
  Badge,
  Chip,
} from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useNavigate } from "react-router-dom";
const Job = ({ job }) => {
  const navigate = useNavigate();
  const daysAgoFunction = (mongoDBTime) => {
    const createdAt = new Date(mongoDBTime);
    const currentTime = new Date();
    const timeDiff = currentTime - createdAt;
    return Math.floor(timeDiff/(1000*24*60*60));
  }
  return (
    <Card
      sx={{
        
        borderRadius: 2,
        boxShadow: 3,
        border: "1px solid",
        borderColor: "grey.100",
      }}
    >
      <CardContent >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" color="textSecondary">
            {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)}`} days ago
          </Typography>
          <IconButton size="small" color="primary">
            <BookmarkIcon />
          </IconButton>
        </Box>

        <Box display="flex" alignItems="center" gap={1} my={1}>
          <Avatar src={job?.company?.logo} alt={job?.company?.name} />
          <Box>
            <Typography variant="h6">
                {job?.company?.name} 
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {job?.location}
            </Typography>
          </Box>
        </Box>

        <Box mb={2}>
          <Typography variant="h6" fontWeight="bold">
            {job?.title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {job?.description}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1.2} mt={1}>
          <Chip label={`${job?.position} Positions`} color="primary" variant="outlined" />
          <Chip
            label={`${job?.jobType}`}
            sx={{ color: "#F83002", fontWeight: "bold" }}
            variant="outlined"
          />
          <Chip
            label={` ${job?.salary} LPA`}
            sx={{ color: "#7209b7", fontWeight: "bold" }}
            variant="outlined"
          />
        </Box>

        <Box display="flex" alignItems="center" gap={0.5} mt={1}>
          <Button
            variant="outlined"
            onClick={() => navigate(`/description/${job?._id}`)}
          >
            Details
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#7209b7", color: "#fff" }}
          >
            Save For Later 
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Job;
