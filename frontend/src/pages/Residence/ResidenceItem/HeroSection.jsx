import React, { Fragment } from 'react'
import { Breadcrumbs, Paper, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function HeroSection({ residence }) {
    return (
        <Paper elevation={3} sx={{ overflow: 'hidden', height: { xs: '280px', md: '380px' }, pt: { xs: 2, md: 0 }, background: `url(${residence.image}) no-repeat center`, backgroundSize: 'cover' }} >
            <Stack height={1} gap={1} width={1} pt={2} sx={{ background: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }}>
               <Typography
                                   variant='h1'
                                   fontFamily={"'Nosifer', sans-serif"}
                                   sx={{
                                       position: "relative",
                                       mt: 2,
                                       mb: 2,
                                       fontSize: { xs: '2.9rem', sm: '4rem', md: '4.9rem' },
                                       fontWeight: 500,
                                       background: "linear-gradient(to bottom, red 0%, rgb(237, 23, 23) 50%, rgb(133, 48, 48) 100%)",
                                       WebkitBackgroundClip: "text",
                                       WebkitTextFillColor: "transparent",
                                       animation: 'slideIn 1s ease-in-out', // Text entry animation
                                   }}
                               >
                    <span>{residence.name}</span>
                </Typography>
                <Breadcrumbs separator="›" >
                    <Link to="" style={{ textDecoration: 'none', color: 'red', fontSize: '1.2rem' }}>
                        Residence
                    </Link>
                    <Typography color="text.primary" sx={{fontSize: '1.2rem'}}>{residence.name}</Typography>
                </Breadcrumbs>
            </Stack>
        </Paper>)
}

export default HeroSection