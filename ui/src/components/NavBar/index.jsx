// mui imports
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

// assets
import logo from '../../assets/seismic-logo.svg';

const NavBar = () => {
    return (
        <AppBar position="static" elevation={1} color='background' component='nav'>
            <Toolbar>
                <img src={logo} alt="logo" width={40} style={{ marginBottom: 0 }} />
                <Typography variant="overline" ml={2} color='primary'>
                    Seismic App
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
