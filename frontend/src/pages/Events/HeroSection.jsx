import React, { Fragment } from 'react'
import { Paper, Stack, Typography } from '@mui/material';
import eventsbgPhoto from '../../assets/events-page/hero-bg.jpg'

function HeroSection() {
    return (
        <Paper elevation={3} sx={{ overflow: 'hidden', height: { xs: '200px', md: '400px' }, pt: { xs: 2, md: 0 }, background: `url(${eventsbgPhoto}) no-repeat center`, backgroundSize: 'cover' }} >
            <Stack height={1} width={1} pt={{ xs: 2, md: 0 }} sx={{ background: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant='h1' fontFamily={"'Nosifer', sans-serif"} fontSize={{ xs: '4rem', sm: '5rem' }} sx={{ textAlign: 'center' }} >
                    <span className="text-gradient">Events</span>
                </Typography>
            </Stack>
        </Paper>)
}

export default HeroSection