import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Box,
  Button,
  Typography,
  Grid,
  TextField,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { COMPANY_API_ENDPOINT } from "../../utils/constant";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import useGetSingleCompany from "../../hooks/useGetSingleCompany";
import { setSingleCompany } from "../../redux/companySlice";
const CompanySetup = () => {
  const params = useParams();
  useGetSingleCompany(params.id);
  const [loading, setLoading] = useState();
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { singleCompany } = useSelector((store) => store.company);
  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", input.name);
    formdata.append("description", input.description);
    formdata.append("website", input.website);
    formdata.append("location", input.location);
    if (input.file) {
      formdata.append("file", input.file);
    }
    try {
      const res = await fetch(`${COMPANY_API_ENDPOINT}/update/${params.id}`, {
        method: "PUT",
        credentials: "include",
        body: formdata,
      });
      if (res.ok) {
        const data = await res.json();
        // console.log(data);
        enqueueSnackbar(data.message, { variant: "success" });
        dispatch(setSingleCompany(null));
        navigate("/admin/companies");
      }
    } catch (error) {
      //console.log(error);
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };
  useEffect(() => {
    if (singleCompany != null) {
      setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: singleCompany.logo || null,
      });
    }
  }, [singleCompany]);
  return (
    <div>
      <Container maxWidth="md" sx={{ my: 10 }}>
        <form onSubmit={submitHandler}>
          <Box display="flex" alignItems="center" gap={2} p={2}>
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate("/admin/companies")}
            >
              Back
            </Button>
            <Typography variant="h5" fontWeight="bold">
              Company Setup
            </Typography>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Company Name"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Website"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Logo"
                id="file"
                name="file"
                type="file"
                accept="application/pdf"
                onChange={changeFileHandler}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>

          <Box my={4}>
            {loading ? (
              <Button fullWidth variant="contained" disabled>
                <CircularProgress size={24} />
                &nbsp;Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Update
              </Button>
            )}
          </Box>
        </form>
      </Container>
    </div>
  );
};

export default CompanySetup;
