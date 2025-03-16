import React, { Fragment, useEffect, useState } from 'react';
import { Button, Grid, List, ListItem, Paper, Stack, Typography, Box } from '@mui/material';
import Mirror from '../UI/Mirror';
import Tilt from 'react-parallax-tilt';
import { Link } from 'react-router-dom';
import PhoneIcon from '@mui/icons-material/Phone';
import eventsList from '../data/events';
import registration from '../data/registration';
import { useNavigate } from 'react-router';
import photo from "../assets/leadership-page/bg-photo.jpg";

function CoordinatorBlock({ coordinators = [], disableButton }) {
    return (
        <Stack>
            <Tilt
                tiltEnable={false}
                glareEnable={true}
                glareMaxOpacity={0.3}
                glareColor="white"
                glarePosition="all"
                glareBorderRadius="10px"
            >
                <Stack sx={{ 
                    height: 1, 
                    p: 2, 
                    borderRadius: '10px', 
                    boxSizing: 'border-box', 
                    backgroundColor: 'transparent', 
                    border: '1px solid white' // Thin white border
                }}>
                    <Stack gap={4} sx={{ alignItems: 'center', height: 1 }}>
                        <Typography variant='h2' fontWeight={700} sx={{ opacity: 0.7, color: 'white' }} >
                            Coordinator
                        </Typography>
                        <Stack direction='row' overflow='auto' gap={4} sx={{ flexGrow: 1, flexShrink: 1, flexBasis: 'auto', p: 1 }}>
                            {coordinators?.map(({ name, contact }) => {
                                return (
                                    <Stack gap={1} sx={{ alignItems: 'center' }}>
                                        <Typography variant='h4' fontWeight={500} sx={{ opacity: 0.8, color: 'white' }} >
                                            {name}
                                        </Typography>
                                        <Stack direction='row' gap={1} sx={{ opacity: 0.7 }}>
                                            <PhoneIcon sx={{ color: 'white' }} />
                                            <Link to={`tel:${contact}`} target='_blank' style={{ textDecoration: 'none' }}>
                                                <Typography
                                                    variant='h5'
                                                    fontWeight={700}
                                                    textAlign='center'
                                                    sx={{ textShadow: '0px 2px 0 #000', color: 'white' }}
                                                >
                                                    {contact}
                                                </Typography>
                                            </Link>
                                        </Stack>
                                    </Stack>
                                );
                            })}
                        </Stack>
                    </Stack>
                </Stack>
            </Tilt>
        </Stack>
    );
}

function PointsCard({ points = [] }) {
    const navigate = useNavigate();

    return (
        <Fragment>
            <Tilt
                tiltEnable={false}
                glareEnable={true}
                glareMaxOpacity={0.3}
                glareColor="white"
                glarePosition="all"
                glareBorderRadius="10px"
                style={{ width: '200px' }}
            >
                <Stack sx={{ 
                    p: 2, 
                    borderRadius: '10px', 
                    boxSizing: 'border-box', 
                    alignItems: 'center', 
                    backgroundColor: 'transparent', 
                    border: '1px solid white' // Thin white border
                }}>
                    <Stack sx={{ alignItems: 'center' }}>
                        <Typography variant='h2' fontWeight={700} sx={{ opacity: 0.7, color: 'white' }} >
                            {'Points'}
                        </Typography>
                        <List>
                            {points.map((point, index) => {
                                return (
                                    <ListItem sx={{ justifyContent: 'space-between', width: '10rem' }}>
                                        <Typography variant='h5' sx={{ opacity: 0.9, color: 'white' }}>
                                            {`${['1st', '2nd', '3rd'][index]}`}
                                        </Typography>
                                        <Typography variant='h5' sx={{ opacity: 0.9, color: 'white' }}>
                                            {`${point} pts`}
                                        </Typography>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Stack>
                </Stack>
            </Tilt>
        </Fragment>
    );
}

function HeroSection({ event, disableButton }) {
    const [eventData, setEventData] = useState({});

    useEffect(() => {
        if (!event || event?.toLowerCase() === 'registration') {
            setEventData(registration);
        } else {
            const eventItem = eventsList.find(({ label }) => label.replaceAll(' ', '').toLowerCase() == event.replaceAll(' ', '').toLowerCase());
            setEventData(eventItem);
        }
    }, [event]);

    return (
        <Paper
            sx={{
                padding: "0.5rem",
                borderRadius: '20px',
                backgroundImage: `url(${photo})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                overflow: 'hidden',
                position: 'relative', // For overlay positioning
                width: '100%', // Ensure the Paper takes full width
                // height: '100%', // Ensure the Paper takes full height
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                // alignItems: 'center',
            }}
        >
            {/* Translucent overlay */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Adjust opacity as needed
                    zIndex: 1, // Above the background image but below the content
                }}
            />
            <Stack gap={3} px={2} py={3} sx={{ 
                display: 'flex', 
                overflow: 'hidden', // Prevent scrolling
                boxSizing: 'border-box', 
                alignItems: 'center', 
                position: 'relative', 
                zIndex: 2,
                width: '100%', // Ensure the Stack takes full width
                // maxWidth: '1200px', // Set a maximum width for the content
            }}>
           {/* <Typography
    variant='h1'
    fontFamily={"'Nosifer', sans-serif"}
    sx={{
        textAlign: 'center',
        position: 'relative',
        p: 1.2,
        mt: 2,
        mb: 2,
        fontSize: { 
            xs: 'clamp(0.8rem, 4vw, 1.2rem)', // Scales between 0.8rem and 1.2rem based on viewport width
            sm: 'clamp(1.2rem, 5vw, 1.8rem)', // Scales between 1.2rem and 1.8rem
            md: 'clamp(1.5rem, 6vw, 2.4rem)', // Scales between 1.5rem and 2.4rem
        },
        fontWeight: 500,
        background: 'rgba(230, 230, 240, 1)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        animation: 'slideIn 1s ease-in-out', // Text entry animation
        width: { xs: '80vw', sm: '90vw', md: '70vw' }, // Adjusted for different screen sizes
    }}
>
    <span>{eventData?.label}</span>
</Typography> */}

                
                <Tilt
                    tiltEnable={false}
                    glareEnable={true}
                    glareMaxOpacity={0.3}
                    glareColor="white"
                    glarePosition="all"
                    glareBorderRadius="10px"
                    style={{ 
                        height: '100%', 
                        width: { xs: '80vw', sm: '90vw', md: '50vw' }, // Adjusted for laptop screens
                        maxWidth: '800px', // Set a maximum width for the rules block
                    }}
                >
                    <Stack sx={{ 
                        height: 1, 
                        p: 2, 
                        borderRadius: '10px', 
                        boxSizing: 'border-box', 
                        backgroundColor: 'transparent', 
                        border: '1px solid white' // Thin white border
                    }}>
                        <Stack sx={{ alignItems: 'center', height: 1 }}>
                            <Typography variant='h2' fontWeight={700} sx={{ opacity: 0.7, color: 'white' }} >
                                Rules
                            </Typography>
                            <Stack sx={{ flexGrow: 1, flexShrink: 1, flexBasis: 'auto'}}>
                                <List sx={{
                                    listStyleType: 'disc',
                                    pl: 2,
                                    '& .MuiListItem-root': {
                                        display: 'list-item',
                                    },
                                }}>
                                    {(eventData?.rules || []).map((rule) => {
                                        return (
                                            <ListItem key={rule}>
                                                <Typography variant='h5' sx={{ opacity: 0.9, color: 'white' }}>
                                                    <div dangerouslySetInnerHTML={{ __html: rule }} />
                                                </Typography>
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </Stack>
                        </Stack>
                    </Stack>
                </Tilt>
                {event && !disableButton && <PointsCard points={eventData?.points} />}

                {eventData?.coordinators && <CoordinatorBlock coordinators={eventData?.coordinators} />}
            </Stack>
        </Paper>
    );
}

export default HeroSection;