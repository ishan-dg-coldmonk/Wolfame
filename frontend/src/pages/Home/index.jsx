import { Paper, Stack } from '@mui/material';
import React, { useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import AboutSection from './AboutSection';
import EventSection from './EventSection';
import HeroSection from './HeroSection';
import SponsersSection from './SponsersSection';
import './index.css';

function Home() {
    const location = useLocation();
    const headerRef = useRef(null); // Create a ref for the HeroSection

    // Use useLayoutEffect to ensure the scroll happens before the page is painted
    useLayoutEffect(() => {
        if (headerRef.current) {
            // Scroll the HeroSection into view
            headerRef.current.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
    }, [location.pathname]);

    return (
        <Stack sx={{ flexGrow: 1, flexShrink: 1, flexBasis: 'auto', overflowX: 'hidden' }}>
            {/* Attach the ref to the HeroSection */}
            <div ref={headerRef}>
                <HeroSection />
            </div>
            <AboutSection />
            <EventSection />
            <SponsersSection />
        </Stack>
    );
}

export default Home;