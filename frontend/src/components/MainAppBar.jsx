import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Avatar, Button, Stack, useTheme } from '@mui/material';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import logo from '../assets/logo.webp';
import Navbar, { NavDrawer } from './Navbar';
import { Link, useNavigate } from 'react-router-dom';
import chroma from "chroma-js";
import { AuthContext } from '../context/AuthProvider';

const drawerWidth = 280;

export default function MainAppBar() {
    const theme = useTheme();
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const { user, signout } = React.useContext(AuthContext);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const container = window !== undefined ? () => window.document.body : undefined;

    const drawer = (
        <Stack onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Stack justifyContent='space-between' alignItems='center'>
                <Stack gap={2} p={2} alignItems='center' maxWidth='auto'>
                    <img src={logo} style={{ width: '50%' }} />
                    <Typography variant='h3' fontFamily={"'Nosifer', sans-serif"}>
                        <span className="text-gradient">Wolfame</span>
                    </Typography>
                </Stack>
            </Stack>
            <Divider />
            <NavDrawer />
        </Stack>
    );

    return (
        <Box px={2} sx={{ flexGrow: 0 }}>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                            background: 'rgba(128, 128, 128, 0.2)', // Translucent gray
                            backdropFilter: 'blur(10px)', // Blur effect
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
            <AppBar
                position="fixed"
                sx={{
                    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Translucent gray
                    boxSizing: 'border-box',
                    top: '0px',
                    width: '100%',
                    left: '0px',
                    // backdropFilter: 'blur(10px)', // Subtle blur effect
                }}
            >
                <Stack direction='row' justifyContent='space-between' alignItems='center' height='4rem' px={4}>
                    <IconButton
                        size="medium"
                        edge="start"
                        aria-label="open drawer"
                        onClick={handleDrawerToggle}
                        sx={{ display: { xs: 'block', sm: 'none' } }}
                    >
                        <MenuIcon fontSize='large' />
                    </IconButton>
                    <Stack
                        direction='row'
                        justifyContent='space-between'
                        alignItems='center'
                        gap={2}
                        sx={{
                            height: '3.2rem',
                            position: { xs: 'absolute', sm: 'static' },
                            left: { xs: '50%' },
                            transform: { xs: 'translate(-50%,0%)', sm: 'translate(0%,0%)' },
                        }}
                    >
                        <Link to='/'>
                            <Box justifyContent='space-between' alignItems='center' gap={2} sx={{ height: '3.2rem' }}>
                                <img src={logo} style={{ height: '95%' }} />
                            </Box>
                        </Link>
                    </Stack>
                    <Navbar />

                    {/* Desktop Auth Buttons */}
                    <Stack direction='row' gap={2} sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', justifyContent: 'space-around' }}>
                        {user ? (
                            <>
                                <Link to={`/users/${user?._id}`}>
                                    <Avatar sx={{ bgcolor: 'red' }} alt={user.name} src={user.image} />
                                </Link>
                                <Button variant='outlined' color='error' onClick={() => {
                                    signout();
                                    navigate('/');
                                }}>
                                    Sign Out
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button variant='outlined' size='large' onClick={() => navigate('/signin')} sx={{ color: 'white', borderColor: 'white' }}>
                                    Sign In
                                </Button>
                                <Button variant='contained' size='large' onClick={() => navigate('/signup')} sx={{ bgcolor: 'red', '&:hover': { bgcolor: 'darkred' } }}>
                                    Sign Up
                                </Button>
                            </>
                        )}
                    </Stack>

                    {/* Mobile Auth Dropdown */}
                    <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenUserMenu}
                            color="inherit"
                        >
                            {user ? <Avatar sx={{ width: 32, height: 32 }} src={user.image} /> : <AccountCircle fontSize='large' />}
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                            sx={{
                                display: { xs: 'block', sm: 'none' },
                                '& .MuiPaper-root': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                                    color: 'white',
                                    border: '1px solid #333'
                                }
                            }}
                        >
                            {user ? [
                                <MenuItem key="profile" onClick={() => { handleCloseUserMenu(); navigate(`/users/${user?._id}`); }}>
                                    <Typography textAlign="center">Profile</Typography>
                                </MenuItem>,
                                <MenuItem key="logout" onClick={() => { handleCloseUserMenu(); signout(); navigate('/'); }}>
                                    <Typography textAlign="center" color="error">Sign Out</Typography>
                                </MenuItem>
                            ] : [
                                <MenuItem key="signin" onClick={() => { handleCloseUserMenu(); navigate('/signin'); }}>
                                    <Typography textAlign="center">Sign In</Typography>
                                </MenuItem>,
                                <MenuItem key="signup" onClick={() => { handleCloseUserMenu(); navigate('/signup'); }}>
                                    <Typography textAlign="center">Sign Up</Typography>
                                </MenuItem>
                            ]}
                        </Menu>
                    </Box>
                </Stack>
            </AppBar>
        </Box>
    );
}
