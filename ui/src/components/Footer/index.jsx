// mui imports
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// assets
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
    return (
        <Box component="footer" sx={{ py: 4, bgcolor: 'background.paper' }}>
            <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
                <Typography variant="overline" display="block" gutterBottom>
                    Powered by USGS
                </Typography>
                <Stack direction="row" justifyContent="center" spacing={2}>
                    <Link href="https://www.linkedin.com/in/rodrigo-is-coding" target="_blank" rel="noopener noreferrer" component="a">
                        <LinkedInIcon />
                    </Link>
                    <Link href="https://github.com/rjuarez1903" target="_blank" rel="noopener noreferrer" component="a">
                        <GitHubIcon />
                    </Link>
                </Stack>
            </Container>
        </Box>
    );
};

export default Footer;
