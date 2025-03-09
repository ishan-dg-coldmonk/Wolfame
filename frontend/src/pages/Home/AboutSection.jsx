import React from 'react';
import { Grid, Paper, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import aboutBg from "../../assets/about-page/about-bg.jpeg";
import iiestImage from "../../assets/about-page/iiest.png";
import wolfImage from "../../assets/about-page/wolf.JPG";

// Wrap the Paper component with motion
const MotionPaper = motion(Paper);

function AboutCard({ title, src, children, direction = 'left', sx = {}, index }) {
    return (
        <MotionPaper 
            elevation={1} 
            initial={{ 
                opacity: 0, 
                x: direction === 'left' ? -30 : 30,  // Reduced slide distance
                y: 20  // Reduced vertical movement
            }}
            whileInView={{ 
                opacity: 1, 
                x: 0,
                y: 0,
                transition: { 
                    type: "spring", 
                    bounce: 0.2,  // Reduced bounce 
                    duration: 0.9,  // Slightly faster
                    delay: index * 0.08  // Shorter delay
                }
            }}
            viewport={{ once: true, amount: 0.2 }}
            sx={{ 
                height: { xs: 'auto', md: '22rem' }, 
                width: { xs: '100%', md: '85%' },
                borderRadius: '2rem', 
                zIndex: "3",
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                boxShadow: "2px 2px 17px rgb(255, 19, 19)",
                marginBottom: "2rem",
                ...sx
            }}
        >
            <Grid 
                container 
                direction={{ xs: 'column', md: 'row' }} 
                sx={{ height: '100%', borderRadius: '2rem', overflow: 'hidden' }}
            >
                <Grid 
                    item 
                    xs={12} 
                    md={4} 
                    order={{ md: direction === 'left' ? 1 : 2 }} 
                    sx={{ 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        height: { xs: '250px', md: '350px' },
                    }}
                >
                    <motion.img 
                        initial={{ scale: 1.05, filter: "blur(2px)" }}  // Subtler scale and blur
                        whileInView={{ 
                            scale: 1, 
                            filter: "blur(0px)",
                            transition: { 
                                duration: 0.8,  // Faster transition
                                delay: (index * 0.08) + 0.1  // Shorter delay
                            }
                        }}
                        viewport={{ once: true, amount: 0.2 }}
                        src={src} 
                        alt={title} 
                        style={{ 
                            height: "100%", 
                            width: "100%", 
                            objectFit: 'cover',
                        }} 
                    />
                </Grid>
                <Grid 
                    item 
                    xs={12} 
                    md={8} 
                    order={{ md: direction === 'left' ? 2 : 1 }} 
                    p={{ xs: 3, md: 4 }} 
                    gap={2} 
                    boxSizing='border-box' 
                    sx={{ flexGrow: 1, flexShrink: 1, flexBasis: 'auto' }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}  // Reduced y distance
                        whileInView={{ 
                            opacity: 1, 
                            y: 0,
                            transition: { 
                                duration: 0.5,  // Shorter duration
                                delay: (index * 0.08) + 0.2  // Shorter delay
                            }
                        }}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <Typography variant='h3' fontWeight={700}>
                            {title}
                        </Typography>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}  // Reduced y distance
                        whileInView={{ 
                            opacity: 1, 
                            y: 0,
                            transition: { 
                                duration: 0.5,  // Shorter duration
                                delay: (index * 0.08) + 0.3  // Shorter delay
                            }
                        }}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <Typography variant='body1' fontSize={'1rem'} sx={{ py: { xs: 1, md: 2 } }}>
                            {children}
                        </Typography>
                    </motion.div>
                </Grid>
            </Grid>
        </MotionPaper>
    );
}

function AboutSection() {
    // More subtle title animation
    const titleVariants = {
        hidden: { opacity: 0, y: -15 },  // Reduced movement
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                type: "spring",
                stiffness: 70,  // Less stiff spring
                damping: 15,  // More damping
                duration: 0.6  // Faster animation
            }
        }
    };

    return (
        <Stack p={4} sx={{ alignItems: 'center', position: 'relative', backgroundImage: `url(${aboutBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }} gap={5}>
            {/* Translucent overlay */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                }}
            ></div>
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={titleVariants}
                style={{ position: "relative" }}
            >
                <Typography 
                    variant='h1' 
                    fontFamily={"'Nosifer', sans-serif"} 
                    sx={{ 
                        position: "relative", 
                        mt: 8, 
                        mb: 3, 
                        fontSize: { xs: '2.8rem', md: '3.6rem' },
                        fontWeight: 500,
                        background: "linear-gradient(to bottom, red 0%, rgb(237, 23, 23) 50%, rgb(133, 48, 48) 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    <span>About Us</span>
                </Typography>
            </motion.div>

            <AboutCard 
                title={'Wolfame'} 
                src={"https://i.pinimg.com/736x/4d/76/65/4d7665854eddacbcd6d9c14c1446073d.jpg"}
                index={0}
            >
                Wolfame is a sports and cultural festival organised by Wolfenden Hall annually. The four-day-long event involves a plethora of activities, both indoor and outdoor, attended by enthusiastic students willing to prove their mettle. The much-anticipated festival has returned to reignite the spark of competition among the students and will be witnessed by an approximate of 6,500+ people.
            </AboutCard>

            <AboutCard 
                direction='right' 
                title={'IIEST, Shibpur'} 
                src={iiestImage}
                index={1}
            >
                Indian Institute of Engineering Science and Technology, Shibpur (IIEST Shibpur), erstwhile Bengal Engineering College (also known as B.E. College),
                is a public research university - also a National Institute of Technology located at Shibpur, Howrah, West Bengal.
                Founded in 1856, it is one of the oldest public research universities.
                It is recognized as an Institute of National Importance under MHRD by the Government of India.
            </AboutCard>

            <AboutCard  
                title={'Wolfenden Hall'} 
                src={wolfImage} 
                sx={{ mb: '4rem' }}
                index={2}
            >
                Wolfenden Hall is a place of residence for the students of Indian
                Institute of Engineering Science and Technology, Shibpur.
                Located right in front of the Oval ground of the institute, it
                is the home to many prestigious events organised throughout the year,
                one of&nbsp; them being Wolfame.
                The hall is home to free-thinkers who want to prove their
                mettle in every field, be it sports, academics, music and everything
                else.
                <br /> 
            </AboutCard>
        </Stack>
    );
}

export default AboutSection;