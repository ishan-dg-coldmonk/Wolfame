import React, { useState, useEffect, useContext, Fragment } from 'react'
import { Stack, Paper, Typography, Link, Button, MenuItem, Menu, Grid } from '@mui/material'
import { Navigate, useNavigate, useParams } from 'react-router'
import axios from '../../../services/axiosinstance'

import PhoneIcon from '@mui/icons-material/Phone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import { AuthContext } from '../../../context/AuthProvider';

import EditIcon from '@mui/icons-material/Edit';
import ProfileImage from '../../../UI/ProfileImage';
import useUserProfile from '../../../hooks/useUserProfile';
import TeamSection from '../../../components/Sections/TeamSection';
import MatchSection from '../../../components/Sections/MatchSection';

const roles = ['user', 'jmcr', 'admin']

function RoleChangeMenu({ role, user }) {
    const [anchorEl, setAnchorEl] = useState(null)
    const [userRole, setUserRole] = useState('user')

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const changeRoleHandler = async (role) => {
        setUserRole(role)
        handleClose()
        await axios.post('/user/role', { _id: user._id, role })
    }

    useEffect(() => {
        setUserRole(user?.role || 'user')
    }, [user?.role])

    const index = roles.findIndex((current_role) => current_role === role)
    const show = role === 'admin' || role === 'jmcr'


    return (
        <Fragment>
            <Paper elevation={5} sx={{ py: 1, width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Typography variant='h6'>
                    {userRole.toUpperCase()}
                </Typography>
            </Paper>
            {show &&
                <Fragment>
                    <Button
                        id="role-positioned-button"
                        aria-controls={open ? 'role-positioned-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        size='large'
                        fullWidth
                        variant='outlined'
                        onClick={handleClick}
                    >
                        Change Role
                    </Button>
                    <Menu
                        id="role-positioned-menu"
                        aria-labelledby="role-positioned-button"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        {roles.slice(0, index + 1).map((role) => {
                            return <MenuItem key={role} onClick={() => changeRoleHandler(role)} selected={role === userRole} >{role.toUpperCase()}</MenuItem>
                        })}
                    </Menu>
                </Fragment>}
        </Fragment>
    )
}

export default function ProfileSection() {

    const { user, signout } = useContext(AuthContext)
    const userProfile = useUserProfile()
    const navigate = useNavigate()

    const deleteAccountHandler = async () => {
        try {
            await axios.delete('/user/me')
            signout()
            navigate('/')
        }
        catch (e) {
            console.log(e)
        }
    }

    if (!userProfile?.name) {
        return (
            <Stack mt={12} mb={6} mx={4} py={6} sx={{ alignItems: 'center' }}>
                <Typography variant='h3' fontWeight={700} color='GrayText'>
                    User Not Exist
                </Typography>
            </Stack>
        )
    }

    return (
        <Grid container spacing={2} p={{ xs: 1, md: 4 }} mt={6} mb={2}>
            <Grid item xs={12} md={4}>
                <Paper elevation={10} sx={{ borderRadius: '2rem' }}>
                    <Stack gap={1} p={4} sx={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <Stack direction='row' gap={2} mb={1}>
                            <ProfileImage image={userProfile?.image} />
                            <Stack gap={1} pt={1} sx={{ alignItems: 'flex-start', height: 1 }}>
                                <Typography
                                    variant='h4'
                                    fontWeight={700}
                                    textAlign='center'
                                    sx={{ textShadow: '0px 2px 0 #000' }}
                                >
                                    {userProfile?.name}
                                </Typography>
                                <Link href={`/residence/${userProfile?.residence?.replaceAll(' ', '')}`} sx={{ textDecoration: 'none' }}>
                                    <Typography
                                        variant='h4'
                                        color='GrayText'
                                        fontWeight={500}
                                        textAlign='center'
                                        sx={{ textShadow: '0px 2px 0 #000', ':hover': { color: 'red' } }}
                                    >
                                        {userProfile?.residence}
                                    </Typography>
                                </Link>
                                <RoleChangeMenu role={user?.role} user={userProfile} />
                            </Stack>
                        </Stack>
                        {userProfile.isMe && <Button variant='contained' fullWidth size='large' sx={{mb: 2}} startIcon={<EditIcon />} onClick={() => navigate('./edit')}>Edit Profile</Button>}
                        {userProfile?.phone_number && <Link href={`tel:${userProfile?.phone_number}`} target='_blank' style={{ textDecoration: 'none' }}>
                            <Stack direction='row' gap={1} sx={{ color: 'white', ":hover": { color: 'red' } }}>
                                <PhoneIcon fontSize='large' />
                                <Typography
                                    variant='h4'
                                    color='inherit'
                                    fontWeight={500}
                                    textAlign='center'
                                    sx={{ textShadow: '0px 2px 0 #000' }}
                                >
                                    {userProfile?.phone_number}
                                </Typography>
                            </Stack>
                        </Link>}
                        {userProfile?.linkedin && <Link href={userProfile.linkedin} target='_blank' style={{ textDecoration: 'none' }}>
                            <Stack direction='row' gap={1} sx={{ color: 'white', ":hover": { color: 'red' } }}>
                                <LinkedInIcon fontSize='large' />
                                <Typography
                                    variant='h4'
                                    color='inherit'
                                    fontWeight={500}
                                    textAlign='center'
                                    sx={{ textShadow: '0px 2px 0 #000' }}
                                >
                                    {userProfile?.linkedin}
                                </Typography>
                            </Stack>
                        </Link>}
                        {userProfile?.email && <Link href={`mailto:${userProfile.email}`} target='_blank' style={{ textDecoration: 'none' }}>
                            <Stack direction='row' gap={1} sx={{ color: 'white', ":hover": { color: 'red' } }}>
                                <EmailIcon fontSize='large' />
                                <Typography
                                    variant='h4'
                                    color='inherit'
                                    fontWeight={500}
                                    textAlign='center'
                                    sx={{ textShadow: '0px 2px 0 #000' }}
                                >
                                    {userProfile?.email}
                                </Typography>
                            </Stack>
                        </Link>}
                        {userProfile?.isMe && (
                            <Stack gap={1} sx={{ width: '100%' }}>
                                <Button onClick={signout} size='large' variant='contained' fullWidth sx={{ mt: 3 }}>
                                    Sign Out
                                </Button>
                                <Button onClick={deleteAccountHandler} size='large' variant='contained' fullWidth >
                                    Delete Account
                                </Button>
                            </ Stack>
                        )}
                    </Stack>
                </Paper >
            </Grid>
            <Grid item xs={12} md={8}>
                <Grid container spacing={2} >
                    <Grid item xs={12}>
                        <Paper elevation={10} sx={{ borderRadius: '2rem', p: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Stack gap={1} sx={{ alignItems: 'center' }}>
                                <Typography variant='h2' fontWeight={700} sx={{ opacity: 0.6 }} >
                                    Teams
                                </Typography>
                                <Link href='/teams/create' sx={{ textDecoration: 'none', ':hover': { color: 'red' } }}>
                                    <Typography variant='h3' fontWeight={700} sx={{ opacity: 0.6, color: 'inherit' }} >
                                        (Create Team)
                                    </Typography>
                                </Link>
                            </Stack>
                            <TeamSection params={{ players: userProfile?._id }} sx={{ p: 0, py: 2 }} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper elevation={10} sx={{ borderRadius: '2rem', p: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography variant='h2' fontWeight={700} sx={{ opacity: 0.6 }} >
                                Matches
                            </Typography>
                            <MatchSection params={{ player: userProfile?._id }} sx={{ p: 0, py: 2 }} hide={{ residence: true }} />
                            {/* <TeamSection params={{ players: userProfile?._id }} /> */}
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Grid >
    )
}
