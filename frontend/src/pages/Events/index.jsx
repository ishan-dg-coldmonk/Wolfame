import React from 'react'
import { Stack } from '@mui/material'
import TimeLine from './TimeLine'
import DefaultHeader from '../../UI/DefaultHeader'
import eventsbgPhoto from '../../assets/events-page/hero-bg.jpg'

function index() {
    return (
        <Stack gap={2} pb={4} sx={{ flexGrow: 1, flexShrink: 1, flexBasis: 'auto', overflowX: 'hidden' }}>
            <DefaultHeader title='Events' image={eventsbgPhoto} />
            <TimeLine />
        </Stack>
    )
}

export default index