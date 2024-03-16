import React, { Fragment, useEffect, useState } from 'react'
import { Grid, Stack, Typography, Button } from '@mui/material'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom';


import eventsList from '../../data/events';
import HeroSection from './HeroSection';
import PhoneIcon from '@mui/icons-material/Phone';

import Mirror from '../../UI/Mirror'
import Tilt from 'react-parallax-tilt'

function CoordinatorBlock({ coordinators = [] }) {
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
                <Mirror elevation={3} sx={{ height: 1, p: 2, borderRadius: '10px', boxSizing: 'border-box' }}>
                    <Stack gap={4} sx={{ alignItems: 'center', height: 1 }}>
                        <Typography variant='h2' fontWeight={700} sx={{ opacity: 0.7 }} >
                            Coordinator
                        </Typography>
                        <Stack direction='row' overflow='auto' gap={4} sx={{ flexGrow: 1, flexShrink: 1, flexBasis: 'auto', p: 1 }}>
                            {coordinators?.map(({ name, contact }) => {
                                return (
                                    <Stack gap={1} sx={{alignItems: 'center'}}>
                                        <Typography variant='h4' fontWeight={500} sx={{ opacity: 0.8, color: 'inherit' }} >
                                            {name}
                                        </Typography>
                                        <Stack direction='row' gap={1} sx={{ opacity: 0.7 }}>
                                            <PhoneIcon sx={{ color: 'white' }} />
                                            <Link to={`tel:${contact}`} target='_blank' style={{ textDecoration: 'none' }}>
                                                <Typography
                                                    variant='h5'
                                                    fontWeight={700}
                                                    textAlign='center'
                                                    sx={{ textShadow: '0px 2px 0 #000' }}
                                                >
                                                    {contact}
                                                </Typography>
                                            </Link>
                                        </Stack>
                                    </Stack>
                                )
                            })}
                        </Stack>
                    </Stack>
                </Mirror>
            </ Tilt>
        </Stack>
    )
}

function TableSection() {

    const { event } = useParams()
    const [eventDeatils, setEventDetails] = useState({})

    useEffect(() => {
        const eventItem = eventsList.find(({ label }) => label.replaceAll(' ', '').toLowerCase() === event.toLowerCase())
        setEventDetails(eventItem)
    }, [event])

    const coordinatorBlock = <CoordinatorBlock coordinators={eventDeatils?.coordinators} />

    return (
        <Fragment>
            <Grid item xs={12} md={6} order={2}>
                <HeroSection {...eventDeatils} name={eventDeatils?.event} endBlock={coordinatorBlock} />
            </Grid>
            <Grid item xs={12} md={6} order={3}>
                <Stack direction='row' gap={1} alignItems='flex-end'>
                    <Typography variant='h2' fontWeight={700} sx={{ opacity: 0.6 }} >
                        {eventDeatils?.label}
                    </Typography>
                </Stack>
                {/* <PointsTable players={dummyData} /> */}
            </Grid>
        </Fragment>
    )
}

export default TableSection