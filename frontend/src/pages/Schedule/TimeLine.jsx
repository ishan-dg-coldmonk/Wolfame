import { Avatar, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import timelineList from '../../data/timeline';
import skullPhoto from '../../assets/skull.webp';
import backgroundImage from '../../assets/events-page/hero-bg-1.webp'; // Replace with your background image path

// Animation variants for framer-motion
const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function TimeLineCard({ title, image, date, events, position }) {
    const controls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: true });
    const theme = useTheme();

    React.useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    const dateItem = (
        <Stack px={2}>
            <Typography
                variant="h6"
                sx={{
                    color: '#fff', // White color
                    fontFamily: '"Space Grotesk", sans-serif', // Custom font
                    fontWeight: 800, // Bold weight
                    fontStyle: 'normal', // Normal style
                    textAlign: 'center',
                    fontSize: { xs: '1rem', sm: '1.2rem', md: '1.4rem' }, // Responsive font size
                    // Apply margin-left or margin-right conditionally for lg screens and above
                    [theme.breakpoints.up('lg')]: {
                        marginLeft: position === 'right' ? '30%' : '0',
                        marginRight: position === 'left' ? '30%' : '0',
                    },
                }}
            >
                {date}
            </Typography>
        </Stack>
    );

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={cardVariants}
        >
            <VerticalTimelineElement
                contentStyle={{
                    background: 'transparent',
                    color: 'white',
                    padding: 0,
                    marginTop: "2rem",
                    marginBottom: "8rem",
                    borderRadius: '10px',
                    boxShadow: '1px 1px 25px rgba(255, 0, 0, 0.73)', // Red glow
                    maxWidth: { xs: '40%', sm: '40%', md: '40%' }, // Adjust width for different screen sizes
                }}
                contentArrowStyle={{ borderRight: '7px solid #ff0000' }}
                date={dateItem}
                dateClassName={position === 'left' ? 'timeline-date-left' : 'timeline-date-right'} // Add class based on position
                iconStyle={{
                    background: '#ff0000',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 20px rgba(255, 0, 0, 0.8)', // Red glow for icon
                }}
                icon={<Avatar src={skullPhoto} sx={{ width: 40, height: 40 }} />}
                position={position} // Alternate position
            >
                <Stack
                    sx={{
                        background: `url(${image}) no-repeat`,
                        backgroundSize: 'cover',
                        borderRadius: 'inherit',
                        position: 'relative',
                        overflow: 'hidden',
                        // maxWidth: { xs: '90%', sm: '80%', md: '60%' },
                    }}
                >
                    <Stack
                        p={3}
                        gap={2}
                        height={1}
                        width={1}
                        sx={{
                            backdropFilter: 'blur(25px)',
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            borderRadius: 'inherit',
                        }}
                    >
                        <Typography variant="h3" sx={{ fontFamily: '"Nosifer", sans-serif', fontWeight: 'bold', color: '#ff0000', textAlign: 'center' }}>
                            <span className="text-gradient">{title}</span>
                        </Typography>
                        <Stack mt={-1}>
                            {events.map((event, index) => (
                                <Stack direction="row" key={index} sx={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <Typography letterSpacing="1px" sx={{ color: '#fff', textAlign: 'center', fontSize: '1.1rem', lineHeight: '1.6' }}>
                                        {event}
                                    </Typography>
                                </Stack>
                            ))}
                        </Stack>
                    </Stack>
                </Stack>
            </VerticalTimelineElement>
        </motion.div>
    );
}

function TimeLine() {
    return (
        <Stack
            sx={{
                position: 'relative',
                width: '100%',
                minHeight: '100vh',
                overflow: 'hidden',
                marginTop: '-1rem'
            }}
        >
            {/* Background Image with Translucent Overlay */}
            <Stack
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: `url(${backgroundImage}) no-repeat center center`,
                    backgroundSize: 'cover',
                    zIndex: 1, // Ensure it stays behind the timeline
                }}
            />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.66)",
                    zIndex: 2, // Ensure it overlays the background
                }}
            ></motion.div>

            {/* Timeline */}
            <Stack
                sx={{
                    position: 'relative',
                    zIndex: 3, // Ensure timeline is above the overlay
                }}
            >
                <VerticalTimeline lineColor="#ff0000">
                    {timelineList.map((data, index) => (
                        <TimeLineCard
                            key={data.title}
                            {...data}
                            position={index % 2 === 0 ? 'left' : 'right'} // Alternate positions
                        />
                    ))}
                </VerticalTimeline>
            </Stack>
        </Stack>
    );
}

export default TimeLine;