import React, { Fragment, useEffect, useState } from 'react'
import { Grid, Stack, Typography, Button } from '@mui/material'
import { useNavigate, useParams } from 'react-router'


import eventsList from '../../data/events';

import RuleBook from '../../components/RuleBook'
import EventSection from './EventSection';


function TableSection() {

    const { event } = useParams()
    const eventDeatils = eventsList.find(({ label }) => label.replaceAll(' ', '').toLowerCase() === event.replaceAll(' ', '').toLowerCase())

    const navigate = useNavigate()


    return (
        <Fragment>
            <Grid item xs={12} md={6} order={2}>
                <RuleBook event={event} />
            </Grid>
            <Grid item xs={12} md={6} order={3}>
                <Stack direction='row' gap={1} alignItems='flex-end' justifyContent="center">
                    <Typography variant='h2' fontWeight={700} sx={{ opacity: 0.6 }} >
                        {eventDeatils?.label}
                    </Typography>
                    {/* <Button variant='outlined' onClick={() => navigate('/teams/create')} sx={{ml: 'auto'}}>
                        Register
                    </Button> */}
                </Stack>
                <EventSection event={eventDeatils} />
            </Grid>
        </Fragment>
    )
}

export default TableSection