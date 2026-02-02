import React, { useState, useEffect } from 'react';
import { Box, Typography, Stack, Button } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

import wolfLogo from '../../assets/logo.png';
import qrCode from '../../assets/freehealthcheckup-page/freehealthcheckupqr.jpeg';

function FreeHealthCheckup() {
    const [showLogo, setShowLogo] = useState(true);

    useEffect(() => {
        // Scroll to top when component mounts
        const scrollContainer = document.getElementById('scroll-container');
        if (scrollContainer) {
            scrollContainer.scrollTo(0, 0);
        } else {
            window.scrollTo(0, 0);
        }

        // Show logo for 2.5 seconds, then transition to content
        const timer = setTimeout(() => {
            setShowLogo(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    const logoVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 1, ease: "easeOut" }
        },
        exit: {
            opacity: 0,
            scale: 1.5,
            transition: { duration: 0.8, ease: "easeIn" }
        }
    };

    const contentVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1, ease: "easeOut", delay: 0.5 }
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: 'black',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                position: 'relative',
                paddingTop: { xs: '80px', md: '100px' } // Add padding to prevent header overlap
            }}
        >
            <AnimatePresence mode='wait'>
                {showLogo ? (
                    <motion.div
                        key="logo"
                        variants={logoVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                            zIndex: 10
                        }}
                    >
                        <Box
                            component="img"
                            src={wolfLogo}
                            alt="Wolfame Logo"
                            sx={{
                                width: { xs: '150px', md: '300px' },
                                height: 'auto',
                                filter: 'drop-shadow(0 0 20px rgba(255, 0, 0, 0.5))'
                            }}
                        />
                    </motion.div>
                ) : (
                    <Stack
                        key="content"
                        component={motion.div}
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        spacing={4}
                        alignItems="center"
                        sx={{
                            zIndex: 5,
                            padding: 3,
                            width: '100%',
                            maxWidth: '600px',
                            textAlign: 'center'
                        }}
                    >
                        <Typography
                            variant="h1"
                            sx={{
                                fontFamily: "'Nosifer', sans-serif",
                                fontSize: { xs: '2rem', md: '3rem' },
                                background: "linear-gradient(to bottom right, red 0%, rgb(237, 23, 23) 50%, rgb(133, 48, 48) 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                marginBottom: 2
                            }}
                        >
                            FREE HEALTH CHECKUP
                        </Typography>

                        <Box
                            component="img"
                            src={qrCode}
                            alt="Health Checkup QR Code"
                            sx={{
                                width: '100%',
                                maxWidth: { xs: '250px', md: '350px' }, // Reduced size on small screens
                                borderRadius: '20px',
                                boxShadow: '0 0 30px rgba(255, 255, 255, 0.1)',
                                border: '2px solid rgba(255, 255, 255, 0.2)'
                            }}
                        />

                        <Typography
                            variant="h6"
                            color="white"
                            sx={{ fontFamily: "'Roboto', sans-serif", mt: 1 }}
                        >
                            Or Click on the link below
                        </Typography>

                        <Button
                            variant="contained"
                            href="https://docs.google.com/forms/d/e/1FAIpQLSdTC6HpvTFta7VqT9LbHYteeE8QeztqBaDlpM-hNmA4Om1l-g/viewform?usp=publish-editor"
                            target="_blank"
                            sx={{
                                background: "linear-gradient(to right, #cc0000, #e96214)",
                                color: "white",
                                fontWeight: "bold",
                                padding: "10px 20px",
                                borderRadius: "10px",
                                fontSize: "1rem",
                                '&:hover': {
                                    background: "linear-gradient(to right, #990000, #c44d0f)",
                                }
                            }}
                        >
                            FILL THE FORM
                        </Button>

                        <Typography
                            variant="h5"
                            color="white"
                            sx={{
                                fontFamily: "'Roboto', sans-serif",
                                fontWeight: 300,
                                lineHeight: 1.6,
                                fontSize: { xs: '1rem', md: '1.2rem' }
                            }}
                        >
                            Get a free health checkup with our medical partner <br />
                            <a href="https://shreediagnostics.in/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                <span style={{ fontWeight: 'bold', color: '#ff4d4d', fontSize: '1.2rem' }}>Shree Diagnostics and Clinic</span>
                            </a>
                        </Typography>
                    </Stack>
                )}
            </AnimatePresence>
        </Box>
    );
}

export default FreeHealthCheckup;
