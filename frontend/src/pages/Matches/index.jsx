import React, { useContext, useLayoutEffect, useRef } from 'react';
import { Stack, Paper, Button } from '@mui/material';
import DefaultHeader from '../../UI/DefaultHeader';
import MatchSection from '../../components/Sections/MatchSection';
import { AuthContext } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom'; // Use 'react-router-dom' instead of 'react-router'
import bgImage from '../../assets/matches-page/hero-bg.webp';

function Matches() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const headerRef = useRef(null); // Create a ref for the DefaultHeader

    // Use useLayoutEffect to ensure the scroll happens before the page is painted
    useLayoutEffect(() => {
        if (headerRef.current) {
            // Scroll the DefaultHeader into view
            headerRef.current.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
    }, []);

    const subTitle = "The stage is set, the players are ready – stay tuned for the ultimate showdown! Matches will be announced soon.";

    return (
        <Stack pb={4} sx={{ flexGrow: 1, flexShrink: 1, flexBasis: 'auto', overflowX: 'hidden' }}>
            {/* Attach the ref to the DefaultHeader */}
            <div ref={headerRef}>
                <DefaultHeader
                    title='Matches'
                    image={bgImage}
                    subtitle={subTitle}
                    height="110vh"
                    showArrow={true}
                />
            </div>
            {user?.role === 'admin' && (
                <Paper>
                    <Stack py={2} sx={{ alignItems: 'center' }}>
                        <Button variant='outlined' size='large' onClick={() => navigate('/matches/create')}>
                            Create match
                        </Button>
                    </Stack>
                </Paper>
            )}
            <MatchSection />
            {/* <StayTuned /> */}
        </Stack>
    );
}

export default Matches;