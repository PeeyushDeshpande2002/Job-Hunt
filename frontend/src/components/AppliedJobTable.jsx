import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Chip } from '@mui/material';
const allAppliedJobs = [1, 2]
const AppliedJobTable = () => {
    return (
        <TableContainer component={Paper}>
          <Table>
            <caption style={{ textAlign: 'left', padding: '16px', fontSize: '16px', fontWeight: 'bold' }}>A list of your applied jobs</caption>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Job Role</TableCell>
                <TableCell>Company</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                allAppliedJobs.length <= 0 ? (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Typography variant="body2" align="center">You haven't applied to any jobs yet.</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  allAppliedJobs.map((appliedJob) => (
                    <TableRow key={appliedJob._id}>
                      <TableCell>
                        {/* {appliedJob?.createdAt?.split("T")[0]}  */}
                        21.08.24</TableCell>
                      <TableCell>
                        {/* {appliedJob.job?.title} */}
                        Software Developer</TableCell>
                      <TableCell>
                        {/* {appliedJob.job?.company?.name} */}
                        WebThoughts</TableCell>
                      <TableCell align="right">
                        <Chip
                          label=
                        //   {appliedJob.status.toUpperCase()}
                                {'accepted'}
                          style={{
                            backgroundColor: appliedJob?.status === "rejected" ? 'red' :
                              appliedJob?.status === 'pending' ? 'gray' : 'green',
                            color: 'white',
                          }}

                        />
                      </TableCell>
                    </TableRow>
                  ))
                )
              }
            </TableBody>
          </Table>
        </TableContainer>
      );
}

export default AppliedJobTable
