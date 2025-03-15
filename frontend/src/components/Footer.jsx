import React from 'react'
import { Divider, Grid, Paper, Stack, Typography, useTheme } from '@mui/material'
import { Link } from 'react-router-dom';

import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

import logo from '../assets/logo.webp'
import { Container } from '@mui/system';
import chroma from 'chroma-js';
import navigationList from '../data/navigation';

const socials = [
    {
        Icon: InstagramIcon,
        link: 'https://www.instagram.com/wolfame_official/'
    },
    {
        Icon: FacebookIcon,
        link: 'https://www.facebook.com/Wolfame18/'
    },
]

function StyledLink({ to, children }) {
    return <Link to={to} style={{ textDecoration: 'none' }}>
        <Typography variant='body1' letterSpacing={'1px'} sx={{ opacity: 0.8, ":hover": { color: 'red', textDecoration: 'underline' } }} >
            {children}
        </Typography>
    </Link>
}

function SocialIconLink({ link, Icon }) {
    return (
        <Link to={link} target='_blank' style={{ textDecoration: 'none' }}>
            <Icon fontSize='large' sx={{ opacity: 0.8, color: 'white', ":hover": { color: 'red' } }} />
        </Link>
    )
}

function Footer() {

    return (
        <Paper sx={{ mt: 2 }}>
            <Grid spacing={3} container sx={{ p: 4, boxSizing: 'border-box' }}>
                <Grid item xs={12} sm={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={logo} style={{ height: '12rem' }} />
                </Grid>
                <Grid item xs={6} sm={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Stack>
                        <Typography variant='h3' fontSize={'1.2rem'} fontWeight={700} sx={{ opacity: 0.6 }} >
                            EXPLORE
                        </Typography>
                        <Stack pt={2} gap={1}>
                            {navigationList.map(({ to, name }) => {
                                return (
                                    <StyledLink key={to} to={to}>
                                        {name}
                                    </StyledLink>)
                            })}
                        </Stack>
                    </Stack>
                </Grid>
                <Grid item xs={6} sm={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Stack>
                        <Typography variant='h3' fontSize={'1.2rem'} fontWeight={700} sx={{ opacity: 0.6 }} >
                            SOCIALS
                        </Typography>
                        <Stack direction='row' pt={2} gap={1}>
                            {socials.map(({ link, Icon }) => {
                                return <SocialIconLink key={link} link={link} Icon={Icon} />
                            })}
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>
            <Grid item xs={12} sx={{ justifyContent: 'center' }}>
                <Divider />
                <Typography variant='h5' fontSize={'1rem'} textAlign={'center'} sx={{ p: 2 }}>
                    Copyright © 2025. All rights reserved by Wolfame organisers and IIEST, Shibpur.
                </Typography>
            </Grid>
        </Paper>
    )
}

export default Footer