import React, { useEffect, useState } from 'react'
import { Button, Grid, IconButton, Paper, Stack, Typography } from '@mui/material'
import MatchCard from '../UI/MatchCard'

import axios from '../services/axiosinstance'

export default function MatchSection({ params, sx = {} }) {

    const [matchList, setMatchList] = useState([])

    const fetchMatches = async () => {
        try {
            const matches = await axios.get('/match', { params })
            return matches.data
        }
        catch (e) {
            return []
        }
    }

    useEffect(() => {
        fetchMatches().then((data) => setMatchList(data))
    }, [params])

    return (
        <Grid container sx={{ display: 'flex', justifyContent: 'center', p: { xs: 2, md: 4 }, ...sx }}>
            {matchList.length === 0 && (<Typography sx={{ fontSize: '2rem', opacity: 0.4 }}>
                Empty
            </Typography>)}
            {matchList.map((match) => {
                return <MatchCard key={match._id} match={match} />
            })}
        </Grid>
    )
}