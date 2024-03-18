import React, { useContext } from 'react'
import { Stack, Paper, Typography, Link } from '@mui/material'
import DefaultHeader from '../../UI/DefaultHeader'
import MatchSection from '../../components/MatchSection'
import { AuthContext } from '../../context/AuthProvider'

function Matches() {
    const { user } = useContext(AuthContext)
    return (
        <Stack pb={4} sx={{ flexGrow: 1, flexShrink: 1, flexBasis: 'auto', overflowX: 'hidden' }}>
            <DefaultHeader title='Matches' />
            {user?.role === 'admin' && (
                <Paper>
                    <Stack py={2} sx={{ alignItems: 'center' }}>
                        <Link href='/matches/create' sx={{ textDecoration: 'none', color: 'white', ':hover': { color: 'red' } }}>
                            <Typography variant='h4' fontWeight={700} sx={{ color: 'inherit' }}>
                                Create a Match
                            </Typography>
                        </Link>
                    </Stack>
                </Paper>
            )}
            <MatchSection />
        </Stack>
    )
}

export default Matches