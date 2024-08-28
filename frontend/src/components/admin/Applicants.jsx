import React, { useEffect } from "react";
import ApplicantsTable from "./ApplicantsTable";
import { Box, Typography } from "@mui/material";
import { APPLICATION_API_ENDPOINT } from "../../utils/constant.js";
import { useParams } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { setApplicants } from "../../redux/applicationSlice.js";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const {applicants} = useSelector(store => store.application)
  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await fetch(`${APPLICATION_API_ENDPOINT}/${params.id}/applicants`, {
          method: "GET",
          credentials: "include",
        });
        if(res.ok){
            const data = await res.json();
            dispatch(setApplicants(data.job))
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();
  });
  return (
    <Box maxWidth="lg" mx="auto">
      <Typography
        sx={{ textAlign: "left", marginTop: "45px" }}
        variant="h6"
        fontWeight="bold"
      >
        Applicants ({applicants?.applications?.length})
      </Typography>
      <ApplicantsTable />
    </Box>
  );
};

export default Applicants;
