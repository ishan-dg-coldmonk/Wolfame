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

function WinnerBlock({ label, winnerList, event, hide }) {
    // 1. Filter residence list by the current label (Men/Women)
    const filteredResidenceList = residenceList.filter(r => r.category.toLowerCase() === label.toLowerCase());

    // 2. Map residences to winner data or default data
    // 2. Map residences to winner data or default data
    let processedList = [];

    filteredResidenceList.forEach((resData) => {
        // Find ALL teams for this residence in the winnerList
        const residenceTeams = winnerList.filter(w => {
            if (w.category) {
                return w.category.toLowerCase() === label.toLowerCase() && w.team?.residence === resData.name;
            }
            return w.team?.residence === resData.name;
        });

        if (residenceTeams.length > 0) {
            // Add all teams from this residence
            residenceTeams.forEach(winner => {
                processedList.push({
                    ...winner,
                    hasTeam: true
                });
            });
        } else {
            // If no team found, add one dummy data entry
            processedList.push({
                team: {
                    name: "Not Registered",
                    residence: resData.name,
                    event: event,
                    _id: null, // Indicates no team page
                    approved: false
                },
                points: 0,
                hasTeam: false
            });
        }
    });

    // 3. Sort by points descending
    processedList.sort((a, b) => (b.points || 0) - (a.points || 0));

    if (processedList.length === 0) {
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
                        {processedList.map(({ team, rank, points }, index) => {
                            return (
                                <Stack key={team.residence} direction='row' gap={1} sx={{ width: '100%', alignItems: 'center', }}>
                                    <Paper elevation={15} sx={{ height: { xs: '3rem', md: '4rem' }, aspectRatio: '1/1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant='h2' sx={{ fontSize: { xs: '1.5rem', md: '3.75rem' } }}>
                                            {index + 1}
                                        </Typography>
                                    </Paper>
                                    <Paper elevation={15} sx={{ height: { xs: '3rem', md: '4rem' }, minWidth: { xs: '3rem', md: '4rem' }, px: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant='caption' sx={{ lineHeight: 1, fontSize: { xs: '0.6rem', md: '0.75rem' } }}>Pts</Typography>
                                        <Typography variant='h5' fontWeight={700} sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
                                            {points ?? 0}
                                        </Typography>
                                    </Paper>
                                    <TeamCard team={team} hide={hide} />
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

    // Removed EmptyBlock check because we always want to show the residence list now

    return (
        <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'center', p: { xs: 2, md: 4 }, ...sx }}>
            <WinnerBlock label={'Men'} winnerList={winnerList} event={params.event} hide={hide} />
            <WinnerBlock label={'Women'} winnerList={winnerList} event={params.event} hide={hide} />
        </Grid>
    )
}