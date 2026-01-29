import React from 'react'
import { Stack } from '@mui/material'
import ResidenceSection from './ResidenceSection'
import DefaultHeader from '../../UI/DefaultHeader'

function index() {
    return (
        <Stack pb={4} sx={{ flexGrow: 1, flexShrink: 1, flexBasis: 'auto', overflowX: 'hidden' }}>
            <DefaultHeader title='Residence' />
            <ResidenceSection />
        </Stack>
    )
}

export default index