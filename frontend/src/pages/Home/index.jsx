import { Paper, Stack } from '@mui/material'
import React,  {useEffect} from 'react'
import AboutSection from './AboutSection'
import EventSection from './EventSection'
import HeroSection from './HeroSection'
import SponsersSection from './SponsersSection'
import './index.css'


function Home() {
     // Scroll to the top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
    
    return (
        <Stack sx={{ flexGrow: 1, flexShrink: 1, flexBasis: 'auto', overflowX: 'hidden' }}>
            <HeroSection />
            <AboutSection />
            <EventSection />
            <SponsersSection />
        </Stack>
    )
}

export default Home