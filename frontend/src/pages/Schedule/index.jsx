import React,  {useEffect} from 'react'
import { Stack } from '@mui/material';
import TimeLine from './TimeLine';
import DefaultHeader from '../../UI/DefaultHeader';
import eventsbgPhoto from '../../assets/events-page/hero-bg.webp';
import sectionBgPhoto from '../../assets/events-page/black-bg.webp'; // Add your background image

function Schedule() {
    const subtitleText = `Mark your calendars and sync your adrenaline! Here’s the ultimate timeline of Wolfame 2025 – where every second counts and every moment thrills.`;
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    return (
        <Stack
            gap={2}
            py={8} // Add padding at the top and bottom
            sx={{
                flexGrow: 1,
                flexShrink: 1,
                flexBasis: 'auto',
                overflowX: 'hidden',
                minHeight: '100vh',
                background: 'radial-gradient(circle, #1a1a1a, #000000)', // Dark gradient background
            }}
        >
            <DefaultHeader title='Schedule' image={eventsbgPhoto} subtitle={subtitleText} height="100vh" />
            <div
                style={{
                    paddingTop: '4rem',
                    height: '10rem',
                    backgroundImage: `url(${sectionBgPhoto})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: 'white',
                    textAlign: 'center',
                    fontFamily: '"Space Grotesk", sans-serif',
                    fontSize:  '2.8rem', // Fixed font size
                    fontWeight: '800',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    letterSpacing: '0.3rem'
                }}
            >
                TIMELINE
            </div>
            <TimeLine />
        </Stack>
    );
}

export default Schedule;