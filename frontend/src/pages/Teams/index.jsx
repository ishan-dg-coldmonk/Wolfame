import React, { useLayoutEffect, useRef } from 'react'
import { Stack } from '@mui/material'
import DefaultHeader from '../../UI/DefaultHeader'
import TeamSection from '../../components/Sections/TeamSection'
import bgImage from '../../assets/teams-page/hero-bg.webp'

function Teams() {
    const headerRef = useRef(null); // Create a ref for the DefaultHeader

    // Use useLayoutEffect to ensure the scroll happens before the page is painted
    useLayoutEffect(() => {
        if (headerRef.current) {
            // Scroll the DefaultHeader into view
            headerRef.current.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
    }, []);

    const subTitle = "The teams are ready to grind, the spirit is high - Stay tuned to meet the squads of Wolfame 2026! Team lineups will be revealed soon.";

    return (
        <Stack pb={4} sx={{ flexGrow: 1, flexShrink: 1, flexBasis: 'auto', overflowX: 'hidden' }}>
            <div ref={headerRef}>
                <DefaultHeader title='Teams' image={bgImage} height="105vh" subtitle={subTitle} showArrow={true} />
            </div>
            <TeamSection />
        </Stack>
    )
}

export default Teams