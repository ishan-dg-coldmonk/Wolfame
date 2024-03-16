import React from 'react'
import { Stack } from '@mui/material'
import HeroSection from './HeroSection'

import './index.css'
import GallerySection from './GallerySection'

function index() {
    return (
        <Stack gap={2} pb={4} sx={{ flexGrow: 1, flexShrink: 1, flexBasis: 'auto', overflowX: 'hidden' }}>
            <HeroSection />
            <GallerySection />
        </Stack>
    )
}

export default index