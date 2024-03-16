import React from 'react'
import { Stack } from '@mui/material'
import HeroSection from './HeroSection'
import BoardsSection from './BoardsSection'

function index() {
    return (
        <Stack pt={{ xs: 8, md: 11 }} px={{ xs: 2, md: 4 }} pb={4} gap={2} sx={{ flexGrow: 1, flexShrink: 1, flexBasis: 'auto', overflowX: 'hidden' }}>
            <BoardsSection />
        </Stack>
    )
}

export default index