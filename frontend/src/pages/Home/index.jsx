import { Paper, Stack } from '@mui/material'
import React from 'react'
import AboutSection from './AboutSection'
import EventSection from './EventSection'
import HeroSection from './HeroSection'
import SponsersSection from './SponsersSection'
import './index.css'

function index() {
    return (
        <Stack sx={{ flexGrow: 1, flexShrink: 1, flexBasis: 'auto', overflowX: 'hidden' }}>
            <HeroSection />
            <AboutSection />
            <EventSection />
            <SponsersSection />
        </Stack>
    )
}

export default index