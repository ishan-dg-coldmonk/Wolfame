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

export default function TeamSection({ params = {}, sx = {}, hide = {} }) {

    const { data: teamList, isPending, isError } = useQuery({
        queryKey: ['teams', params],
        queryFn: () => fetchTeams(params),
    })

    const [filters, setFilters] = useState({ event: 'All', residence: 'All' })

    if (isPending) {
        return <LoadingIndicator />
    }

    if (isError) {
        return <ErrorBlock />
    }

    if (teamList.length === 0) {
        return <EmptyBlock />
    }

    const filteredList = teamList.filter(({ event, residence }) => {
        if (filters.event != 'All' && event != filters.event) {
            return false
        }
        if (filters.residence != 'All' && residence != filters.residence) {
            return false
        }
        return true
    })

    return (
        <Grid container spacing={1} sx={{ display: 'flex', justifyContent: 'center', p: { xs: 2, md: 4 }, ...sx }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <Grid container p={1} sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <CustomSelect xs={12} md={6} hide={hide?.residence} label={'Residence'} value={filters} setValue={setFilters}>
                        {residenceList.map(({ name }) => {
                            return <MenuItem key={name} value={name}>{name}</MenuItem>
                        })}
                    </CustomSelect>
                    <CustomSelect xs={12} md={6} hide={hide?.event} label={'Event'} value={filters} setValue={setFilters}>
                        {eventsList.map(({ label }) => {
                            return <MenuItem key={label} value={label}>{label}</MenuItem>
                        })}
                    </CustomSelect>
                </Grid>
            </Paper>
            {filteredList.length === 0 && <EmptyBlock />}
            {filteredList.map((team) => {
                return <TeamCard key={team._id} team={team} />
            })}
        </Grid>
    )
}