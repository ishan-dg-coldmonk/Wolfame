import React from 'react';
import { Paper, Stack, Typography, IconButton } from '@mui/material';
import bgPhoto from '../assets/contact-bg.jpg';
import './DefaultHeader.css'; // Import custom CSS for animations and gradients

function DefaultHeader({ title, image, subtitle }) {
    // Function to handle smooth scrolling to the end of the header
    const handleScrollDown = () => {
        const headerEnd = document.getElementById('header-end');
        if (headerEnd) {
            headerEnd.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <Paper
            elevation={3}
            
            sx={{
                overflow: 'hidden',
                marginBottom: "-3rem",
                height: '100vh', // Set height to 100vh
                background: `url(${image || bgPhoto}) no-repeat center`,
                backgroundSize: 'cover',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                animation: 'fadeIn 1.5s ease-in-out', // Entry animation
                position: 'relative', // For positioning the arrow button
            }}
        >
            <Stack
                sx={{
                    height: '100%',
                    marginTop: "-7rem",
                    width: '100%',
                    background: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    padding: { xs: '4rem', sm: '4rem' }, // Responsive padding
                }}
            >
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
                    <span>{title}</span>
                </Typography>

                <Typography
                    variant='subtitle1'
                    sx={{
                        color: 'white',
                        fontFamily: '"Space Grotesk", sans-serif',
                        fontSize: { xs: '1.1rem', sm: '1.5rem' },
                        maxWidth: '800px',
                        marginTop: '1.3rem',
                        animation: 'slideIn 1.5s ease-in-out', // Paragraph entry animation
                    }}
                >
                    {subtitle}
                </Typography>

                {/* Down Arrow Button */}
                <IconButton
                    onClick={handleScrollDown}
                    sx={{
                        position: 'absolute',
                        bottom: { xs: '16.5rem', sm: '23rem', md:'31rem', lg:'11rem' }, 
                        animation: 'blink 1s infinite ease-in-out', // Glow animation
                    }}
                >
                    <svg
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 0, 0, 0.8))' }} // Reddish glow
                    >
                        <path
                            d="M12 4V20M12 20L18 14M12 20L6 14"
                            stroke="red"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </IconButton>
            </Stack>

            {/* Marker for the end of the header */}
            <div id="header-end" style={{ position: 'absolute', bottom: 0 }} />
        </Paper>
    );
}

export default DefaultHeader;