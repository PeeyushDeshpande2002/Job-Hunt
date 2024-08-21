import React from 'react';
import { AppBar, Toolbar, Typography, Button, Avatar, IconButton, Menu, MenuItem, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSelector } from 'react-redux';
import store from '../../redux/store';
const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const {user} = useSelector(store => store.auth);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <AppBar position="fixed" color="default">
            
                <Toolbar sx={{display: 'flex', alignItems: 'center' , justifyContent: 'space-between', height: '64px' }}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                        Job<span style={{ color: '#F83002' }}>Portal</span>
                    </Typography>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                        <ul style={{ display: 'flex', alignItems: 'center', gap: '20px', margin: 0, padding: 0, listStyle: 'none' }}>
                            {user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies" style={{ textDecoration: 'none', color: 'inherit' }}>Companies</Link></li>
                                    <li><Link to="/admin/jobs" style={{ textDecoration: 'none', color: 'inherit' }}>Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link></li>
                                    <li><Link to="/jobs" style={{ textDecoration: 'none', color: 'inherit' }}>Jobs</Link></li>
                                    <li><Link to="/browse" style={{ textDecoration: 'none', color: 'inherit' }}>Browse</Link></li>
                                </>
                            )}
                        </ul>
                        {!user ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Link to="/login"  style={{ color: 'red', borderColor: 'red', marginRight: '8px' }}>
                                    <Button variant="outlined" color="error">Login</Button>
                                </Link>
                                <Link to="/signup" style={{ textDecoration: 'none' }}>
                                    <Button variant="contained" style={{ backgroundColor: 'red', color: 'white', marginRight: '8px' }}>Signup</Button>
                                </Link>
                            </div>
                        ) : (
                            <>
                                <IconButton onClick={handleClick}>
                                    <Avatar alt={user?.fullname} src={user?.profile?.profilePhoto || ''}>
                                        {!user?.profile?.profilePhoto && <AccountCircleIcon />}
                                    </Avatar>
                                </IconButton>
                                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                                    <div style={{ padding: '8px', width: '320px' }}>
                                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                            <Avatar alt={user?.fullname} src={user?.profile?.profilePhoto || ''}>
                                                {!user?.profile?.profilePhoto && <AccountCircleIcon />}
                                            </Avatar>
                                            <div>
                                                <Typography variant="subtitle1" component="h4" fontWeight="medium">{user?.fullname}</Typography>
                                                <Typography variant="body2" color="text.secondary">{user?.profile?.bio}</Typography>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '16px', color: '#757575' }}>
                                            {user  && (
                                                <MenuItem component={Link} to="/profile" onClick={handleClose}>
                                                    <AccountCircleIcon fontSize="small" />
                                                    <Typography variant="body2" component="p">View Profile</Typography>
                                                </MenuItem>
                                            )}
                                            <MenuItem onClick={() => { logoutHandler(); handleClose(); }}>
                                                <LogoutIcon  fontSize="small" />
                                                <Typography variant="body2" component="p">Logout</Typography>
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
}

export default Navbar
