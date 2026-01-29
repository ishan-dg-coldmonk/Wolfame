import React, { useLayoutEffect, useRef } from 'react';
import { Stack } from '@mui/material';
import { useLocation } from 'react-router-dom';
import ContactSection from './ContactSection';
import DefaultHeader from '../../UI/DefaultHeader';

function ContactUs() {
    const location = useLocation();
    const headerRef = useRef(null);

    useLayoutEffect(() => {
        if (headerRef.current) {
            // Scroll the header into view
            headerRef.current.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
    }, [location.pathname]);

    return (
        <Stack pb={4} sx={{ flexGrow: 1, flexShrink: 1, flexBasis: 'auto', overflowX: 'hidden' }}>
            {/* Attach the ref to the DefaultHeader */}
            <div ref={headerRef}>
                <DefaultHeader
                    title='Contact Us'
                    height='110vh'
                    subtitle="Connect with us for inquiries, collaborations, or support. Reach out and let’s make Wolfame 2026 unforgettable."
                />
            </div>
            <ContactSection />
        </Stack>
    );
}

export default ContactUs;