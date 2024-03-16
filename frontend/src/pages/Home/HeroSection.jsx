import { forwardRef, useRef } from "react";
import Tilt from 'react-parallax-tilt';

import wolfPng from "../../assets/logo.png";
import slideshow6 from "../../assets/home-page/hero-section/slideshow6.jpg";
import slideshow7 from "../../assets/home-page/hero-section/slideshow7.jpg";
import slideshow8 from "../../assets/home-page/hero-section/slideshow8.jpg";
import slideshow9 from "../../assets/home-page/hero-section/slideshow9.jpg";
import slideshow15 from "../../assets/home-page/hero-section/slideshow15.jpg";
import slideshow16 from "../../assets/home-page/hero-section/slideshow16.jpg";
import slideshow17 from "../../assets/home-page/hero-section/slideshow17.jpg";
import slideshow18 from "../../assets/home-page/hero-section/slideshow18.jpg";
import { Box, Stack } from "@mui/system";

import { Fade, Grid, Paper, Typography, Zoom } from "@mui/material";
import ImageSlider from "../../components/ImageSlider";
import Mirror from "../../UI/Mirror";
// import './ParallaxEffect.demozap.css';


const topSlideshow = [slideshow6, slideshow7, slideshow8, slideshow9];
const bottomSlideshow = [slideshow15, slideshow16, slideshow17, slideshow18];

const HeroContent = (props) => {
    return (
        <Mirror elevation={5}>
            <Stack p={1} py={2} sx={{ justifyContent: 'center', alignItems: 'center' }} gap={2}>
                <Typography variant='h1' fontFamily={"'Nosifer', sans-serif"} sx={{ textAlign: 'center' }} >
                    <span className="text-gradient">WOLFAME 2k24</span>
                </Typography>
                <Typography variant='h5' textAlign={'center'} sx={{ color: 'rgba(255, 255, 255, 0.85)' }}  >
                    <span className="text-gradient">Wolfame</span> is a sports and cultural festival
                    organised by Wolfenden Hall annually. The four day
                    long event involves a plethora of activities, both
                    indoor and outdoor, attended by enthusiastic students
                    willing to prove their mettle. The much anticipated
                    festival has returned to reignite the spark of
                    competition among the students and will be witnessed
                    by an approximate of 6,500+ people.<br /><br />
                    <span className="text-gradient">Wolfenden Hall</span> is back with Wolfame, the best of the
                    tournaments, and the largest so far. 4 days of
                    adrenaline charged, sweat drenched, electrifying
                    events, the grandest prizes for the taking and the dopest
                    after party. And let's not forget the ultimate medal of
                    honour, thetrophy of thechampion of champions.
                </Typography>
            </Stack>
        </Mirror>
    )
}

function HeroSection() {

    return (
        <Paper elevation={3} sx={{ overflow: 'hidden' }} >
            <Stack sx={{ position: 'relative', boxSizing: 'border-box', overflow: 'hidden' }}>
                <ImageSlider images={topSlideshow} direction='left' />
                <ImageSlider images={bottomSlideshow} direction='right' />
                <ImageSlider images={topSlideshow} direction='left' />
                <ImageSlider sx={{ display: { lg: 'none' } }} images={bottomSlideshow} direction='right' />
                <Grid position='absolute' container px={2} pt={8} sx={{ background: 'rgba(0, 0, 0, 0.5)', overflow: 'hidden', height: '100%', boxSizing: 'border-box' }} >
                    <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', maxWidth: '100%' }}>
                        <Tilt
                            scale={1.15}
                            tiltReverse={true}
                            style={{ width: '100%', height: '100%' }}
                            className="parallax-effect"
                        >
                            <Zoom in style={{ transitionDelay: '500ms' }}>
                                <img src={wolfPng} style={{ maxWidth: '60%' }} />
                            </Zoom>
                            <Zoom in style={{ transitionDelay: '1000ms' }}>
                                <Typography
                                    variant='h1'
                                    fontFamily={"'Nosifer', sans-serif"}
                                    sx={{
                                        position: 'absolute',
                                        fontSize: '4.5rem',
                                        color: 'red',
                                        cursor: 'pointer',
                                        transform: 'translateZ(60px)',
                                        mixBlendMode: 'difference'
                                    }}>
                                    WOLFAME
                                </Typography>
                            </Zoom>
                        </Tilt>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Tilt
                            scale={1.05}
                            tiltReverse={true}
                            perspective={500}
                            glareEnable={true}
                            glareMaxOpacity={0.45}
                        >
                            <Fade in style={{ transitionDelay: '1500ms' }}>
                                <section>
                                    <HeroContent />
                                </section>
                            </Fade>
                        </Tilt>
                    </Grid>
                </Grid>
            </Stack>
        </Paper>
    )
}

export default HeroSection