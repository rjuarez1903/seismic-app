// mui imports
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Footer from '../Footer';
import Navbar from '../NavBar/';

const Layout = ({ children }) => {
    return (
        <Box display="flex" flexDirection="column" minHeight="100vh" bgcolor='#EEF2F6'>
            <Navbar />
            <Container component="main" sx={{ flex: 1, py: 4 }}>
                {children}
            </Container>
            <Footer />
        </Box>
    );
};

export default Layout;
