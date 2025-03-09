import React, { Fragment } from 'react';
import { Grid, Paper, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion'; // Import framer-motion

import monster from "../../assets/home-page/sponsors-section/monster.jpeg"
import cocaCola from "../../assets/home-page/sponsors-section/coca-cola.jpg";
import decathlon from "../../assets/home-page/sponsors-section/decathlon.jpg";
import elm from "../../assets/home-page/sponsors-section/elm.jpg";
import fusionGrill from "../../assets/home-page/sponsors-section/fusion-grill.jpg";
import grapevine from "../../assets/home-page/sponsors-section/grapevine.jpg";
import lic from "../../assets/home-page/sponsors-section/lic.jpg";
import mtv from "../../assets/home-page/sponsors-section/mtv.jpg";
import nba from "../../assets/home-page/sponsors-section/nba.jpg";
import nivia from "../../assets/home-page/sponsors-section/nivia.png";
import bisleri from "../../assets/home-page/sponsors-section/bisleri.png";
import wowMomo from "../../assets/home-page/sponsors-section/wowmomo.jpeg";
import sting from "../../assets/home-page/sponsors-section/sting.jpeg";
import bgImage from "../../assets/home-page/sponsors-section/sponsor-bg.jpg";

const sponsors = [
    {
        title: 'Coca Cola',
        logo: cocaCola,
        backgroundColor: 'white',
    },
    {
        logo: decathlon,
        title: "Decathlon",
        backgroundColor: "#0082c6",
    },
    {
        logo: nivia,
        title: "nivia",
        backgroundColor: "white"
    },
    {
        title: 'Sting',
        logo: sting,
        backgroundColor: '#c2112c'
    },
    {
        logo: bisleri,
        title: "Bisleri",
        backgroundColor: "#00B3A1",
    },
    {
        logo: wowMomo,
        title: "wow momo",
        backgroundColor: "#facb23",
    },
    {
        logo: lic,
        title: "LIC",
        backgroundColor: "black",
    },
    {
        logo: mtv,
        title: "mtv",
        backgroundColor: "black"
    },
    {
        title: 'Monster Energy',
        logo: monster,
        backgroundColor: 'black'
    },
];

function SponsorCard({ logo, title, backgroundColor }) {
    return (
        <Paper 
            sx={{ 
                bgcolor: backgroundColor, 
                borderRadius: '1rem',
                padding: '0.3rem',
                outline: "3px solid black",
                boxShadow: "1px 2px 10px rgba(0,0,0,0.8)",
                margin: '1rem', // Margin around the card
                position: 'relative', // For the border animation
                overflow: 'hidden', // Hide overflow for the border animation
                transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Smooth transition for scale and shadow
                '&:hover': {
                    transform: 'scale(1.1)', // Scale effect on hover
                    boxShadow: '3px 5px 40px rgba(255, 0, 0, 0.8)', // Red glow effect
                },
            }}
        >
            <img
                src={logo}
                alt={title}
                style={{
                    width: '15rem',
                    height: '15rem',
                    objectFit: 'contain',
                    position: 'relative', // Ensure the image is above the border animation
                    zIndex: 1, // Place the image above the border animation
                }} 
            />
        </Paper>
    );
}

function SponsersSection() {
    // Animation variants for the title and cards
    const titleVariants = {
        hidden: { opacity: 0, y: -50 }, // Start hidden and slightly above
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }, // Animate to visible
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 }, // Start hidden and slightly below
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }, // Animate to visible
    };

    return (
        <Fragment>
            <Stack 
                p={4} 
                sx={{ 
                    alignItems: 'center', 
                    justifyContent: 'center', // Center content vertically
                    minHeight: '100vh', // Take up the full viewport height
                    paddingBottom: '2rem',
                    backgroundImage: `url(${bgImage})`, // Set the background image
                    backgroundSize: 'contain', // Ensure the image covers the entire section
                    backgroundPosition: 'center', // Center the background image
                    position: 'relative', // Ensure the Stack is positioned relatively
                }} 
                gap={3}
            >
                {/* Translucent Overlay */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.64)", // Dark overlay for better contrast
                        zIndex: 0, // Place the overlay above the background image but below the content
                    }}
                ></div>

                {/* Past Sponsors Title with Margin */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }} // Trigger animation when 20% of the element is visible
                    variants={titleVariants}
                >
                    <Typography 
                        variant='h1' 
                        fontFamily={"'Nosifer', sans-serif"}
                        sx={{ 
                            textAlign: "center",
                            mt: 8, // Margin top
                            mb: 3, // Margin bottom
                            fontSize: { xs: '2.5rem', md: '3.6rem' },
                            fontWeight: 500,
                            background: "linear-gradient(to bottom, red 0%, rgb(237, 23, 23) 50%, rgb(133, 48, 48) 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            position: 'relative', // Ensure the title is above the overlay
                            zIndex: 1, // Place the title above the overlay
                        }}
                    >
                        <span>Past Sponsors</span>
                    </Typography>
                </motion.div>

                {/* Sponsors Grid */}
                <Grid 
                    container 
                    spacing={4} // Spacing between cards
                    justifyContent="center" // Center the cards
                    sx={{ 
                        maxWidth: '1200px', // Limit the maximum width of the grid
                        position: 'relative', // Ensure the grid is above the overlay
                        zIndex: 1, // Place the grid above the overlay
                    }}
                >
                    {sponsors.map((item, index) => (
                        <Grid 
                            item 
                            xs={12} sm={6} md={4} // 3 cards per row on medium and larger screens
                            key={index}
                            sx={{ 
                                display: 'flex', 
                                justifyContent: 'center', // Center the card horizontally
                            }}
                        >
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }} // Trigger animation when 20% of the element is visible
                                variants={cardVariants}
                            >
                                <SponsorCard {...item} />
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>

                {/* Sponsor Us Button */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }} // Trigger animation when 20% of the element is visible
                    variants={titleVariants}
                    sx={{ 
                        marginTop: '2rem', // Margin top
                        marginBottom: '10rem', // Margin bottom
                        textAlign: 'center', // Center the text
                        position: 'relative', // Ensure the button is above the overlay
                        zIndex: 1, // Place the button above the overlay
                    }}
                >
                    <a href="https://drive.google.com/file/d/1p62uRbgVVm4YYi0f7A3czT-zCGo9MRMh/view?usp=sharing" className="btn btn--white btn--animated btn-mg-bottom-mg-top">Sponsor Us</a>
                </motion.div>
            </Stack>
        </Fragment>
    );
}

export default SponsersSection;