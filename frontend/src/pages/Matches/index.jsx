import React, { useContext } from 'react'
import { Stack, Paper, Typography, Link, Button } from '@mui/material'
import DefaultHeader from '../../UI/DefaultHeader'
import MatchSection from '../../components/Sections/MatchSection'
import { AuthContext } from '../../context/AuthProvider'
import { useNavigate } from 'react-router'
import bgImage from '../../assets/matches-page/hero-bg.jpg'
import StayTuned from '../../components/StayTuned.jsx'

function Matches() {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    // const subTitle="Step into the arena of excellence! Wolfame 2025 is your front-row seat to the most thrilling matches and epic sportsmanship.";
    const subTitle="The stage is set, the players are ready – stay tuned for the ultimate showdown! Matches will be announced soon.";

    return (
        <Stack pb={4} sx={{ flexGrow: 1, flexShrink: 1, flexBasis: 'auto', overflowX: 'hidden' }}>
            <DefaultHeader title='Matches' image={bgImage} subtitle={subTitle} height="110vh" showArrow={false} />
            {user?.role === 'admin' && (
                <Paper>
                    <Stack py={2} sx={{ alignItems: 'center' }}>
                        <Button variant='outlined' size='large' onClick={() => navigate('/matches/create')}>
                            Create match
                        </Button>
                    </Stack>
                </Paper>
            )}
            {/* <MatchSection /> */}
            {/* <StayTuned/> */}
        </Stack>
    )
}

export default Matches