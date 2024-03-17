import { Button, Grid, IconButton, Paper, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TeamCard from '../../UI/TeamCard'
import axios from '../../services/axiosinstance'

export default function TeamSection() {

    const [teamList, setTeamList] = useState([])

    const fetchTeams = async () => {
        try {
            const teams = await axios.get('/team', {})
            return teams.data
        }
        catch (e) {
            return []
        }
    }

    useEffect(() => {
        fetchTeams().then((data) => setTeamList(data))
    }, [])

    return (
        <Grid container spacing={1} sx={{ display: 'flex', justifyContent: 'center', p: { xs: 2, md: 4 } }}>
            {teamList.map((team) => {
                return <TeamCard key={team.name} team={team} md={7} />
            })}
        </Grid>
    )
}