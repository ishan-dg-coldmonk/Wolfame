import React from 'react'
import { Grid, Paper, Typography, Stack, Button } from '@mui/material'
import Tilt from 'react-parallax-tilt';

import eventsList from '../../data/events';
import sportsPhoto from '../../assets/sports.webp'
import { NavLink, Outlet } from 'react-router-dom';

function EventCard({ to, label = '', event, image, ...other }) {

    const route = label.replaceAll(' ', '')

    return (
        <Grid item xs={4} sm={3} md={1.5} >
            <NavLink to={to || `./${route}`} style={{ textDecoration: 'none' }} {...other} >
                {({ isActive }) => {
                    return (
                        <Tilt
                            scale={1.15}
                            tiltReverse={true}
                            perspective={500}
                            glareEnable={true}
                            glareMaxOpacity={0.45}
                            glareBorderRadius='1rem'
                            className='parallax-effect'
                            style={{
                                height: '8rem',
                                borderRadius: '0.8rem',
                                backgroundImage: `url(${image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                cursor: 'pointer',
                                border: isActive ? 'solid red' : 'none',
                                borderColor: 'red',
                            }}
                        >
                            <Typography
                                variant='h5'
                                className='inner-element'
                                fontWeight={700}
                                textAlign='center'
                                sx={{ textShadow: '0px 2px 0 #000' }}
                            >
                                {event}
                            </Typography>
                        </Tilt >
                    )
                }}
            </NavLink >
        </Grid>
    )
}

function BoardsSection() {

    return (
        <Grid container spacing={2}>
            <Outlet />
            <Grid item xs={12} order={1}>
                <Grid container spacing={2} sx={{ pt: 2, textTransform: 'uppercase' }}>
                    <EventCard to='/leaderboard' event='All Events' image={sportsPhoto} end />
                    {eventsList.map((eventItem) => <EventCard key={eventItem.event} {...eventItem} />)}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default BoardsSection