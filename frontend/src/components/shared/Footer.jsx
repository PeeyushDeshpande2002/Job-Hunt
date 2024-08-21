import React from 'react';
import { Box, Container, Typography, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <Box component="footer" sx={{ borderTop: '1px solid', borderColor: 'grey.200', py: 4 }}>
      <Container maxWidth="lg">
        <Box
          display="flex"
          flexDirection={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Box mb={{ xs: 4, md: 0 }}>
            <Typography variant="h6" component="h2" fontWeight="bold">
              Job Hunt
            </Typography>
            <Typography variant="body2" color="textSecondary">
              © 2024 Your Company. All rights reserved.
            </Typography>
          </Box>
          
          <Box display="flex" gap={2}>
            <IconButton
              component="a"
              href="https://facebook.com"
              aria-label="Facebook"
              sx={{ color: 'inherit' }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              component="a"
              href="https://twitter.com"
              aria-label="Twitter"
              sx={{ color: 'inherit' }}
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              component="a"
              href="https://linkedin.com"
              aria-label="LinkedIn"
              sx={{ color: 'inherit' }}
            >
              <LinkedInIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
