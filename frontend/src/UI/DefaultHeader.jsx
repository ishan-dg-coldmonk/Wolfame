import React from 'react'
import { Paper, Stack, Typography } from '@mui/material';
import bgPhoto from '../assets/contact-bg.jpg'

function DefaultHeader({ title }) {
    return (
        <Paper elevation={3} sx={{ overflow: 'hidden', height: { xs: '200px', md: '280px' }, pt: { xs: 2, md: 0 }, background: `url(${bgPhoto}) no-repeat`, backgroundSize: 'cover' }} >
            <Stack height={1} width={1} pt={2} sx={{ background: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant='h1' fontFamily={"'Nosifer', sans-serif"} fontSize={{ xs: '4rem', sm: '5rem' }} sx={{ textAlign: 'center' }} >
                    <span className="text-gradient">{title}</span>
                </Typography>
            </Stack>
        </Paper>)
}

export default DefaultHeader