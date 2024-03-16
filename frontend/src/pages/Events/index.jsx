import React from 'react'
import { Stack } from '@mui/material'
import TimeLine from './TimeLine'
import HeroSection from './HeroSection'

function index() {
    return (
        <Stack gap={2} pb={4} sx={{ flexGrow: 1, flexShrink: 1, flexBasis: 'auto', overflowX: 'hidden' }}>
            <HeroSection />
            <TimeLine />
        </Stack>
    )
}

export default index