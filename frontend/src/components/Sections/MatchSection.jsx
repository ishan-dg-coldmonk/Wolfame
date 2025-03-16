import React, { useEffect, useState } from 'react';
import { Grid, Paper, MenuItem, Box } from '@mui/material';
import MatchCard from '../Cards/MatchCard';

import LoadingIndicator from '../../UI/LoadingIndicator';
import ErrorBlock from '../../UI/ErrorBlock';

import { useQuery } from '@tanstack/react-query';
import { fetchMatches } from '../../services/http';

import residenceList from '../../data/residence';
import eventsList from '../../data/events';
import CustomSelect from './CustomSelect';
// import StayTuned from '../StayTuned'

export default function MatchSection({ params = {}, sx = {}, hide = {} }) {
    const { data: matchList, isPending, isError } = useQuery({
        queryKey: ['matches', params],
        queryFn: () => fetchMatches(params),
    });

    const [filters, setFilters] = useState({ date: '17', event: 'All', residence: 'All' });

    if (isPending) {
        return <LoadingIndicator />;
    }

    if (isError) {
        return <ErrorBlock />;
    }

    const filteredList = matchList.filter(({ time, event, teams }) => {
        if (filters.date !== 'All' && new Date(time).getDate().toString() !== filters.date) {
            return false;
        }
        if (filters.event !== 'All' && event !== filters.event) {
            return false;
        }
        if (filters.residence !== 'All' && !teams.some(({ residence }) => residence === filters.residence)) {
            return false;
        }
        return true;
    });

    return (
        <Grid container sx={{ display: 'flex', justifyContent: 'space-evenly', p: { xs: 2, md: 4 }, ...sx }}>
            {/* Filter Bar */}
            <Box sx={{ width: '100%', mb: 4, mt: 4 }}>
                <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
                    <Grid container spacing={2} p={1} sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <CustomSelect xs={6} hide={hide?.date} label={'Date'} value={filters} setValue={setFilters}>
                            <MenuItem value={'17'}>17th March</MenuItem>
                            <MenuItem value={'18'}>18th March</MenuItem>
                            <MenuItem value={'19'}>19th March</MenuItem>
                            <MenuItem value={'20'}>20th March</MenuItem>
                        </CustomSelect>
                        <CustomSelect xs={6} hide={hide?.residence} label={'Residence'} value={filters} setValue={setFilters}>
                            {residenceList.map(({ name }) => (
                                <MenuItem key={name} value={name}>{name}</MenuItem>
                            ))}
                        </CustomSelect>
                        <CustomSelect xs={12} hide={hide?.event} label={'Event'} value={filters} setValue={setFilters}>
                            {eventsList.map(({ label }) => (
                                <MenuItem key={label} value={label}>{label}</MenuItem>
                            ))}
                        </CustomSelect>
                    </Grid>
                </Paper>
            </Box>

            {/* Match Cards */}
            {filteredList.length > 0 ? (
                filteredList.map((match) => (
                    <MatchCard key={match._id} match={match} />
                ))
            ) : null}
        </Grid>
    );
}
