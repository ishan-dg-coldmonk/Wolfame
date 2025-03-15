import React from 'react';
import ImageSlider from '../../components/ImageSlider';
import { Paper, Stack, Typography } from '@mui/material';

function importAll(r) {
    return r.keys().map(r);
}

const images = importAll(require.context('../../assets/home-page/gallery-section', false, /\.(webp)$/));

function HeroSection() {
    return (
        <Paper elevation={3} sx={{ overflow: 'hidden'}}>
            <Stack sx={{ position: 'relative', height: '100%', width: '100%', overflow: 'hidden' }}>
                {/* Image Sliders */}
                <ImageSlider images={images.slice(0, 5)} direction='left' sx={{ height: '100%', width: '100%' }} />
                <ImageSlider images={images.slice(5, 10)} direction='right' sx={{ height: '100%', width: '100%'}} />
                <ImageSlider images={images.slice(10, 14)} direction='left' sx={{ height: '100%', width: '100%' }} />
                {/* <ImageSlider images={images.slice(4, 8)} direction='right' sx={{ height: '100%', width: '100%' }} /> */}


                {/* Blackish Translucent Overlay */}
                <Stack
                    position='absolute'
                    height='100%'
                    width='110%'
                    sx={{ background: 'rgba(0, 0, 0, 0.82)' }}
                />

                {/* Gallery Text with Animation */}
                <Stack
                    position='absolute'
                    height='100%'
                    width='100%'
                    justifyContent='center'
                    alignItems='center'
                    textAlign='center'
                    spacing={2}
                >
                    {/* Hero Title */}
                    <Typography
                        variant='h1'
                        fontFamily={"'Nosifer', sans-serif"}
                        fontSize={{ xs: '3rem', sm: '5rem' }}
                        sx={{
                            textAlign: 'center',
                            cursor: 'pointer',
                            background: 'linear-gradient(to bottom right, red 0%, rgb(237, 23, 23) 50%, rgb(133, 48, 48) 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: '0 2px 2px rgba(0, 0, 0, 0)',
                            animation: 'slideIn 1s ease-in-out', // Slide-in animation
                        }}
                    >
                        Gallery
                    </Typography>

                    {/* Hero Subtitle */}
                    <Typography
                        variant='subtitle1'
                        sx={{
                            color: 'white',
                            fontFamily: '"Space Grotesk", sans-serif',
                            fontSize: { xs: '1.1rem', sm: '1.5rem' },
                            maxWidth: '800px',
                            animation: 'fadeInUp 1.5s ease-in-out', // Fade-in and slide-up animation
                        }}
                    >
Step into the arena of glory, passion, and unyielding spirit.  
Witness the moments that define Wolfame.  
Where every pulsating heartbeat echoes victory                  </Typography>
                </Stack>
            </Stack>
        </Paper>
    );
}

export default HeroSection;