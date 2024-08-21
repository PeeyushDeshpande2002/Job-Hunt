import React, { useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
  Chip,
  Link,
  IconButton
} from '@mui/material';
import { useSelector } from 'react-redux';
import { MailOutline as Mail, Phone as Contact, Edit as Pen, Store } from '@mui/icons-material';
import store from '../redux/store';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
const isResume = true;
const Profile = () => {
  const {user} = useSelector(store => store.auth);
  const[open, setOpen] = useState(false);
  
  return (
    <Box>
        <Container maxWidth="md">
            <Box
                sx={{
                    backgroundColor: 'white',
                    border: '1px solid',
                    borderColor: 'grey.300',
                    borderRadius: 2,
                    p: 4,
                   
                }}
            >
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item xs={12} md={8} container alignItems="center" spacing={2}>
                        <Grid item>
                            <Avatar
                                src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                                alt="profile"
                                sx={{ width: 96, height: 96 }}
                            />
                        </Grid>
                        <Grid item>
                            <Typography variant="h6" fontWeight="medium">
                                {user?.fullname}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {user?.profile?.bio}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <IconButton onClick={() => setOpen(true)} variant="outlined">
                            <Pen />
                        </IconButton>
                    </Grid>
                </Grid>
                <Divider sx={{ my: 3 }} />
                <Box sx={{ my: 1 }}>
                    <Grid container alignItems="center" spacing={2}>
                        <Grid item>
                            <Mail />
                        </Grid>
                        <Grid item>
                            <Typography variant="body2">{user?.email}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container alignItems="center" spacing={2} >
                        <Grid item>
                            <Contact />
                        </Grid>
                        <Grid item>
                            <Typography variant="body2">{user?.phone}</Typography>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ my: 1, textAlign: 'left' }}>
                <Typography variant="subtitle1" fontWeight="bold">Skills</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {user?.profile?.skills.length !== 0 ? (
                            user?.profile?.skills.map((item, index) => (
                                <Chip key={index} label={item} />
                            ))
                        ) : (
                            <Typography variant="body2">NA</Typography>
                        )}
                    </Box>
                </Box>
                <Box sx={{ textAlign: 'left' }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                        Resume
                    </Typography>
                    {isResume ? (
                        <Link
                            href={user?.profile?.resume}
                            target="_blank"
                            color="primary"
                            underline="hover"
                        >
                            {user?.profile?.resumeOriginalName}
                        </Link>
                    ) : (
                        <Typography variant="body2">NA</Typography>
                    )}
                </Box>
            </Box>

            <Box sx={{ backgroundColor: 'white', borderRadius: 2, p: 4, textAlign: 'left' }}>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                    Applied Jobs
                </Typography>
                {/* Applied Job Table */}
                <AppliedJobTable />
            </Box>
        </Container>
        <UpdateProfileDialog open={open} setOpen={setOpen} />
    </Box>
);
}

export default Profile
