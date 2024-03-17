import React, { Fragment, useEffect, useState } from 'react'
import { Grid, Stack, Typography, Button } from '@mui/material'
import { useParams } from 'react-router'


import eventsList from '../../data/events';

import RuleBook from '../../components/RuleBook'
import EventSection from './EventSection';


function TableSection() {

    const { event } = useParams()
    const [eventDeatils, setEventDetails] = useState({})

    useEffect(() => {
        const eventItem = eventsList.find(({ label }) => label.replaceAll(' ', '').toLowerCase() === event.toLowerCase())
        setEventDetails(eventItem)
    }, [event])

    return (
        <Fragment>
            <Grid item xs={12} md={6} order={2}>
                <RuleBook event={event} />
            </Grid>
            <Grid item xs={12} md={6} order={3}>
                <Stack direction='row' gap={1} alignItems='flex-end'>
                    <Typography variant='h2' fontWeight={700} sx={{ opacity: 0.6 }} >
                        {eventDeatils?.label}
                    </Typography>
                </Stack>
                <EventSection event={eventDeatils.label} />
            </Grid>
        </Fragment>
    )
}

export default TableSection