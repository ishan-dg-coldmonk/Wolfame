import React,{useEffect} from 'react'
import { Stack } from '@mui/material'
import ContactSection from './ContactSection'
import DefaultHeader from '../../UI/DefaultHeader'

function ContactUs() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    return (
        <Stack pb={4} sx={{ flexGrow: 1, flexShrink: 1, flexBasis: 'auto', overflowX: 'hidden' }}>
            <DefaultHeader title='Contact Us' height='110vh' subtitle="Connect with us for inquiries, collaborations, or support.  
Reach out and let’s make Wolfame 2025 unforgettable."/>
            <ContactSection />
        </Stack>
    )
}

export default ContactUs