import React, { useEffect, useState } from 'react'
import { Button, FormControl, Grid, IconButton, InputLabel, Paper, Select, Stack, Typography, MenuItem, Box } from '@mui/material'
import MatchCard from '../Cards/MatchCard'

import LoadingIndicator from '../../UI/LoadingIndicator'
import EmptyBlock from '../../UI/EmptyBlock'
import ErrorBlock from '../../UI/ErrorBlock'

import { useQuery } from '@tanstack/react-query';
import { fetchMatches } from '../../services/http';

import residenceList from '../../data/residence'
import eventsList from '../../data/events'
import CustomSelect from './CustomSelect'


export default function MatchSection({ params = {}, sx = {}, hide = {} }) {

    const { data: matchList, isPending, isError } = useQuery({
        queryKey: ['matches', params],
        queryFn: () => fetchMatches(params),
    })

    const [filters, setFilters] = useState({ date: 'All', event: 'All', residence: 'All' })

    if (isPending) {
        return <LoadingIndicator />
    }

    if (isError) {
        return <ErrorBlock />
    }

    if (matchList.length === 0) {
        return <EmptyBlock />
    }

    const filteredList = matchList.filter(({ time, event, teams }) => {
        if (filters.date != 'All' && new Date(time).getDate() != filters.date) {
            return false
        }
        if (filters.event != 'All' && event != filters.event) {
            return false
        }
        if (filters.residence != 'All' && !teams.some(({ residence }) => residence == filters?.residence)) {
            return false
        }
        return true
    })

    return (
        <Grid container sx={{ display: 'flex', justifyContent: 'space-evenly', p: { xs: 2, md: 4 }, ...sx }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <Grid container p={1} sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <CustomSelect xs={6} hide={hide?.date} label={'Date'} value={filters} setValue={setFilters}>
                        <MenuItem value={'19'}>19th March</MenuItem>
                        <MenuItem value={'20'}>20th March</MenuItem>
                        <MenuItem value={'21'}>21st March</MenuItem>
                        <MenuItem value={'22'}>22nd March</MenuItem>
                    </CustomSelect>
                    <CustomSelect xs={6} hide={hide?.residence} label={'Residence'} value={filters} setValue={setFilters}>
                        {residenceList.map(({ name }) => {
                            return <MenuItem key={name} value={name}>{name}</MenuItem>
                        })}
                    </CustomSelect>
                    <CustomSelect xs={12} hide={hide?.event} label={'Event'} value={filters} setValue={setFilters}>
                        {eventsList.map(({ label }) => {
                            return <MenuItem key={label} value={label}>{label}</MenuItem>
                        })}
                    </CustomSelect>
                </Grid>
            </Paper>
            {filteredList.length === 0 && <EmptyBlock />}
            {filteredList.map((match) => {
                return <MatchCard key={match._id} match={match} />
            })}
        </Grid>
    )
}