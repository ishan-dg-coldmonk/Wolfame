import React from 'react';
import { Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import rulesBg from "../../assets/home-page/rules-section/rulesBg.webp";

const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 70,
            damping: 15,
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function GeneralRulesSection() {
    // Define the rules with HTML content
    const rules = [
        "All interested students are required to report to their respective hall/hostel JMCR.",
        "Each participant must have a valid identity card issued by the institution.",
        "2nd and 1st year participants must have a valid Provisional Admission Letter.",
        "Alumni can participate from their respective halls.",
        <>
            Day scholars and PG students can register by contacting the JMCR of the following hall/hostels:
            <br />
            Hostel 8, 9, 10
            <br />
            Hostel 7, 11, 14
            <br />
            Hostel 15, 16
            <br />
            Wolfenden Hall, MacDonald Hall, Richardson Hall, Sengupta Hall, Sen Hall
            <br />
            PG Hostel (13)
        </>,
        "Day Scholars can represent any hostel / hall of their interest.",
        <>
            A player can represent only a single hall/ hostel. After losing he/she <b>cannot</b> represent any other hall/hostel
        </>,
        "Any violation of general rules will result in immediate disqualification.",
    ];

    return (
        <Stack
            p={4}
            sx={{
                alignItems: 'center',
                position: 'relative',
                backgroundImage: `url(${rulesBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                color: 'white',
            }}
            gap={5}
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
                }}
            ></div>

            {/* Title Animation */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
                viewport={{ once: true, amount: 0.2 }}
                style={{ position: "relative" }}
            >
                <Typography
                    variant='h1'
                    fontFamily="'Nosifer', sans-serif"
                    sx={{
                        fontSize: { xs: '2.5rem', md: '3.2rem' },
                        fontWeight: 500,
                        marginTop: "2rem",
                        background: "linear-gradient(to bottom, red 0%, rgb(237, 23, 23) 50%, rgb(133, 48, 48) 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        mb: 2,
                        textAlign: "center",
                    }}
                >
                    General Rules
                </Typography>
            </motion.div>

            {/* Rules Container */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    border: '2px solid red',
                    textAlign: 'left',
                    borderRadius: '20px',
                    padding: '2rem',
                    position: 'relative',
                    boxShadow: "0 0 20px rgba(255, 0, 0, 0.6)",
                }}
                sx={{
                    width: { xs: '90%', sm: '60%', md: '55%' },
                }}
            >
                <ul style={{ 
                    paddingLeft: '0.2rem', 
                    lineHeight: '1.8', 
                    listStyleType: 'none' // Remove default bullets
                }}>
                    {rules.map((rule, index) => (
                        <motion.li
                            key={index}
                            variants={itemVariants}
                            style={{ 
                                marginBottom: '1rem',
                                display: 'flex',
                                alignItems: 'flex-start'
                            }}
                        >
                            <span style={{ 
                                marginRight: '12px', 
                                color: 'red',
                                fontSize: '1.2rem',
                                flexShrink: 0,
                                marginTop: '0.2rem'
                            }}>•</span>
                            <Typography 
                                variant='body1' 
                                fontSize={{ xs: '1rem', md: '1.2rem' }}
                                component="div" // Important: Use div instead of p to allow HTML content
                            >
                                {rule}
                            </Typography>
                        </motion.li>
                    ))}
                </ul>
            </motion.div>
        </Stack>
    );
}

export default GeneralRulesSection;