import React, { useEffect, useState } from 'react'
import { Button, Grid, IconButton, Paper, Stack, Typography, CircularProgress } from '@mui/material'
import TeamCard from '../Cards/TeamCard'

import LoadingIndicator from '../../UI/LoadingIndicator'
import EmptyBlock from '../../UI/EmptyBlock'
import ErrorBlock from '../../UI/ErrorBlock'

import { useQuery } from '@tanstack/react-query';
import { fetchTeams } from '../../services/http';

export default function TeamSection({ params = {}, sx = {} }) {

    const { data: teamList, isPending, isError } = useQuery({
        queryKey: ['teams', params],
        queryFn: () => fetchTeams(params),
    })

    if (isPending) {
        return <LoadingIndicator />
    }

    if (isError) {
        return <ErrorBlock />
    }

    if(teamList.length === 0) {
        return <EmptyBlock />
    }

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