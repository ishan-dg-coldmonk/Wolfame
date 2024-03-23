import React, { useContext } from 'react'
import { Stack, Paper, Typography, Link, Button } from '@mui/material'
import DefaultHeader from '../../UI/DefaultHeader'
import MatchSection from '../../components/Sections/MatchSection'
import { AuthContext } from '../../context/AuthProvider'
import { useNavigate } from 'react-router'

function Matches() {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    return (
        <Stack pb={4} sx={{ flexGrow: 1, flexShrink: 1, flexBasis: 'auto', overflowX: 'hidden' }}>
            <DefaultHeader title='Matches' />
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
        </Stack>
    )
}

export default Matches