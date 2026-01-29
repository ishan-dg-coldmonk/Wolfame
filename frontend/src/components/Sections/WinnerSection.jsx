import React, { useEffect, useState } from 'react'
import { Button, Grid, IconButton, Paper, Stack, Typography, CircularProgress, MenuItem } from '@mui/material'
import TeamCard from '../Cards/TeamCard'

import LoadingIndicator from '../../UI/LoadingIndicator'
import EmptyBlock from '../../UI/EmptyBlock'
import ErrorBlock from '../../UI/ErrorBlock'

import { useQuery } from '@tanstack/react-query';
import { fetchTeams } from '../../services/http';

import residenceList from '../../data/residence'
import eventsList from '../../data/events'
import CustomSelect from './CustomSelect'
import axios from '../../services/axiosinstance'

function WinnerBlock({ label, winnerList }) {
    const filteredWinerList = winnerList.filter((winner) => {
        // 1. Check if category is explicitly stored in the Winner document (preferred)
        if (winner.category) {
            return label.toLowerCase() === winner.category.toLowerCase();
        }

        // 2. Fallback: Lookup residence category
        const teamResidence = winner.team?.residence;
        const resData = residenceList.find(r => r.name === teamResidence);
        const category = resData ? resData.category : '';
        return label.toLowerCase() == category.toLowerCase();
    })
    if (filteredWinerList.length === 0) {
        return <></>
    }
    return (
        <Grid item xs={12}>
            <Grid container>
                <Stack gap={3} sx={{ width: 1, alignItems: 'center' }}>
                    <Typography variant='h2' fontWeight={700}>
                        {label}
                    </Typography>
                    <Stack gap={1} sx={{ width: 1, alignItems: 'center' }}>
                        {filteredWinerList.map(({ team, rank, points }, index) => {
                            return (
                                <Stack direction='row' gap={1} sx={{ width: '100%', alignItems: 'center', }}>
                                    <Paper elevation={15} sx={{ height: '4rem', aspectRatio: '1/1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant='h2'>
                                            {index + 1}
                                        </Typography>
                                    </Paper>
                                    <Paper elevation={15} sx={{ height: '4rem', minWidth: '4rem', px: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant='caption' sx={{ lineHeight: 1 }}>Pts</Typography>
                                        <Typography variant='h5' fontWeight={700}>
                                            {points ?? 0}
                                        </Typography>
                                    </Paper>
                                    <TeamCard key={team._id} team={team} />
                                </Stack>)
                        })}
                    </Stack>
                </Stack>
            </Grid>
        </Grid>
    )
}

export default function WinnerSection({ params = {}, sx = {}, hide = {} }) {

    const { data: winnerList, isPending, isError } = useQuery({
        queryKey: ['winners', params],
        queryFn: () => axios.get('/winner', { params }).then(response => response.data),
    })

    if (isPending) {
        return <LoadingIndicator />
    }

    if (isError) {
        return <ErrorBlock />
    }

    if (winnerList.length === 0) {
        return <EmptyBlock />
    }


    return (
        <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'center', p: { xs: 2, md: 4 }, ...sx }}>
            <WinnerBlock label={'Men'} winnerList={winnerList} />
            <WinnerBlock label={'Women'} winnerList={winnerList} />
        </Grid>
    )
}