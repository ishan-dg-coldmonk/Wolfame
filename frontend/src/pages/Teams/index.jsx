import React from 'react'
import { Stack } from '@mui/material'
import DefaultHeader from '../../UI/DefaultHeader'
import TeamSection from '../../components/Sections/TeamSection'

function index() {
    return (
        <Stack pb={4} sx={{ flexGrow: 1, flexShrink: 1, flexBasis: 'auto', overflowX: 'hidden' }}>
            <DefaultHeader title='Teams' />
            <TeamSection />
        </Stack>
    )
}

export default index