import React, { useEffect, useState } from 'react'
import { Button, Grid, IconButton, Paper, Stack, Typography } from '@mui/material'
import TeamCard from '../UI/TeamCard'

import axios from '../services/axiosinstance'

export default function TeamSection({ params, sx = {} }) {

    const [teamList, setTeamList] = useState([])

    const fetchTeams = async () => {
        try {
            const teams = await axios.get('/team', { params })
            return teams.data
        }
        catch (e) {
            return []
        }
    }

    useEffect(() => {
        fetchTeams().then((data) => setTeamList(data))
    }, [params])

    return (
        <Grid container spacing={1} sx={{ display: 'flex', justifyContent: 'center', p: { xs: 2, md: 4 }, ...sx }}>
            {teamList.length === 0 && (<Typography sx={{ fontSize: '2rem', opacity: 0.4 }}>
                Empty
            </Typography>)}
            {teamList.map((team) => {
                return <TeamCard key={team.name} team={team} />
            })}
        </Grid>
    )
}