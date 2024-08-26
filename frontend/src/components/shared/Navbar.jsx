import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Container,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import store from "../../redux/store";
import { setUser } from "../../redux/authSlice";
const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useSelector((store) => store.auth);
  //const user = false;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = async () => {
    
    try {
      const res = await fetch("http://localhost:8000/api/user/logout", {
        methods: "GET",
        credentials: "include",
      });
      //console.log(res);
      
      if (res.ok) {
        const data = await res.json();
        dispatch(setUser(null));
        enqueueSnackbar(data.message, { variant: "success" });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Logout failed!", { variant: "error" });
    }
  };
  return (
    <AppBar position="fixed" color="default">
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "64px",
        }}
      >
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
          Job<span style={{ color: "#F83002" }}>Portal</span>
        </Typography>
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <ul
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              margin: 0,
              padding: 0,
              listStyle: "none",
            }}
          >
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link
                    to="/admin/companies"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/jobs"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/jobs"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/browse"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Link
                to="/login"
                style={{ color: "red", borderColor: "red", marginRight: "8px" }}
              >
                <Button variant="outlined" color="error">
                  Login
                </Button>
              </Link>
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    marginRight: "8px",
                  }}
                >
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <IconButton onClick={handleClick}>
                <Avatar
                  alt={user?.fullname}
                  src={user?.profile?.profilePhoto || ""}
                >
                  {!user?.profile?.profilePhoto && <AccountCircleIcon />}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <div style={{ padding: "8px", width: "320px" }}>
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      alt={user?.fullname}
                      src={user?.profile?.profilePhoto || ""}
                    >
                      {!user?.profile?.profilePhoto && <AccountCircleIcon />}
                    </Avatar>
                    <div>
                      <Typography
                        variant="subtitle1"
                        component="h4"
                        fontWeight="medium"
                      >
                        {user?.fullname}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {user?.profile?.bio}
                      </Typography>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginTop: "16px",
                      color: "#757575",
                    }}
                  >
                    {user && user.role === "student" && (
                      <MenuItem
                        component={Link}
                        to="/profile"
                        onClick={handleClose}
                      >
                        <AccountCircleIcon fontSize="small" />
                        <Typography variant="body2" component="p">
                          View Profile
                        </Typography>
                      </MenuItem>
                    )}
                    <MenuItem
                      onClick={() => {
                        logoutHandler();
                        handleClose();
                      }}
                    >
                      <LogoutIcon fontSize="small" />
                      <Typography variant="body2" component="p">
                        Logout
                      </Typography>
                    </MenuItem>
                  </div>
                </div>
              </Menu>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
