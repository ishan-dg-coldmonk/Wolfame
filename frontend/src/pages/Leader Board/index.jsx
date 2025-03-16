import React, {useRef, useLayoutEffect} from 'react'
import { Stack } from '@mui/material'
import HeroSection from './HeroSection'
import BoardsSection from './BoardsSection'
import DefaultHeader from '../../UI/DefaultHeader'
import bgImage from '../../assets/leadership-page/hero-bg.webp'

function Leaderboard() {
     const headerRef = useRef(null); // Create a ref for the DefaultHeader
    
        // Use useLayoutEffect to ensure the scroll happens before the page is painted
        useLayoutEffect(() => {
            if (headerRef.current) {
                // Scroll the DefaultHeader into view
                headerRef.current.scrollIntoView({ behavior: 'auto', block: 'start' });
            }
        }, []);
    
        const subTitle = "The scores are locked, the competition is fierce - the leaderboard tells the tale. Stay tuned as the battle for the top spot heats up!";
    return (
        <React.Fragment>
        <div ref={headerRef} style={{padding:"3px"}}>
                <DefaultHeader
                    title='Leader-Board'
                    image={bgImage}
                    subtitle={subTitle}
                    height="110vh"
                    noGradient={true}
                    showArrow={true}
                />
            </div>
        <Stack pt={{ xs: 8, md: 11 }} px={{ xs: 2, md: 4 }} pb={4} gap={2} sx={{ flexGrow: 1, flexShrink: 1, flexBasis: 'auto', overflowX: 'hidden' }}>
            
            <BoardsSection />
        </Stack>
        </React.Fragment>
    )
}

export default Leaderboard