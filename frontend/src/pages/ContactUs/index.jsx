import React from 'react'
import { Stack } from '@mui/material'
import ContactSection from './ContactSection'
import DefaultHeader from '../../UI/DefaultHeader'

function index() {
    return (
        <Stack pb={4} sx={{ flexGrow: 1, flexShrink: 1, flexBasis: 'auto', overflowX: 'hidden' }}>
            <DefaultHeader title='Contact Us' />
            <ContactSection />
        </Stack>
    )
}

export default index