import React, { Fragment } from 'react'
import { Breadcrumbs, Paper, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function HeroSection({ residence }) {
    return (
        <Paper elevation={3} sx={{ overflow: 'hidden', height: { xs: '280px', md: '380px' }, pt: { xs: 2, md: 0 }, background: `url(${residence.image}) no-repeat center`, backgroundSize: 'cover' }} >
            <Stack height={1} gap={1} width={1} pt={2} sx={{ background: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant='h1' fontFamily={"'Nosifer', sans-serif"} fontSize={{ xs: '4rem', sm: '5rem' }} sx={{ textAlign: 'center' }} >
                    <span className="text-gradient">{residence.name}</span>
                </Typography>
                <Breadcrumbs separator="›" >
                    <Link to="/residence" style={{ textDecoration: 'none', color: 'red', fontSize: '1.2rem' }}>
                        Residence
                    </Link>
                    <Typography color="text.primary" sx={{fontSize: '1.2rem'}}>{residence.name}</Typography>
                </Breadcrumbs>
            </Stack>
        </Paper>)
}

export default HeroSection