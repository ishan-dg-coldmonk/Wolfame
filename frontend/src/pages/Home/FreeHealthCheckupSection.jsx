import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import rulesBg from "../../assets/home-page/rules-section/rulesBg.webp";

function FreeHealthCheckupSection() {
    return (
        <Box
            sx={{
                backgroundImage: `url(${rulesBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                py: 10,
                px: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Translucent Overlay */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.74)",
                    zIndex: 0
                }}
            ></div>
            <Stack spacing={4} alignItems="center" maxWidth="800px" textAlign="center" zIndex={1}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <Typography
                        variant="h2"
                        sx={{
                            fontFamily: "'Nosifer', sans-serif",
                            fontSize: { xs: '2rem', md: '3.5rem' },
                            background: "linear-gradient(to right, #ff3333, #ff6666)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            mb: 2
                        }}
                    >
                        FREE HEALTH CHECKUP
                    </Typography>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <Typography
                        variant="h5"
                        color="white"
                        sx={{
                            fontFamily: "'Roboto', sans-serif",
                            fontWeight: 300,
                            lineHeight: 1.6,
                            fontSize: { xs: '1rem', md: '1.5rem' },
                            opacity: 0.9
                        }}
                    >
                        Prioritize your health! Get a free health checkup with our partner <br />
                        <span style={{ fontWeight: 'bold', color: '#ff4d4d' }}>Shree Diagnostics and Clinic</span>.
                    </Typography>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    <Button
                        component={Link}
                        to="/freehealthcheckup"
                        variant="contained"
                        size="large"
                        sx={{
                            background: "linear-gradient(to right, #cc0000, #e96214)",
                            color: "white",
                            fontWeight: "bold",
                            padding: "12px 30px",
                            borderRadius: "10px",
                            fontSize: "1.1rem",
                            boxShadow: "0 0 15px rgba(255, 0, 0, 0.4)",
                            '&:hover': {
                                background: "linear-gradient(to right, #990000, #c44d0f)",
                                boxShadow: "0 0 25px rgba(255, 0, 0, 0.6)",
                                transform: "scale(1.05)"
                            },
                            transition: "all 0.3s ease"
                        }}
                    >
                        CHECK NOW
                    </Button>
                </motion.div>
            </Stack>
        </Box>
    );
}

export default FreeHealthCheckupSection;
