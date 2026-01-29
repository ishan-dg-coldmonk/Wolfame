import React, { useEffect, useState } from 'react';
import { Grid, Paper, MenuItem, Box } from '@mui/material';
import TeamCard from '../Cards/TeamCard';

import LoadingIndicator from '../../UI/LoadingIndicator';
import EmptyBlock from '../../UI/EmptyBlock';
import ErrorBlock from '../../UI/ErrorBlock';

import { useQuery } from '@tanstack/react-query';
import { fetchTeams } from '../../services/http';

import residenceList from '../../data/residence';
import eventsList from '../../data/events';
import CustomSelect from './CustomSelect';

export default function TeamSection({ params = {}, sx = {}, hide = {} }) {
    const { data: teamList, isPending, isError } = useQuery({
        queryKey: ['teams', params],
        queryFn: () => fetchTeams(params),
    });

    const [filters, setFilters] = useState({ event: 'All', residence: 'All' });

    if (isPending) {
        return <LoadingIndicator />;
    }

    if (isError) {
        return <ErrorBlock />;
    }

    const filteredList = teamList.filter(({ event, residence }) => {
        if (filters.event !== 'All' && event !== filters.event) {
            return false;
        }
        if (filters.residence !== 'All' && residence !== filters.residence) {
            return false;
        }
        return true;
    });

    return (
        <Grid container spacing={1} sx={{ display: 'flex', justifyContent: 'center', p: { xs: 2, md: 4 }, ...sx }}>
            {/* Filter Bar */}
            <Box sx={{ width: '100%', mb: 4, mt: 4 }}>
                <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
                    <Grid container spacing={2} p={1} sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <CustomSelect xs={6} hide={hide?.residence} label={'Residence'} value={filters} setValue={setFilters}>
                            {residenceList.map(({ name }) => (
                                <MenuItem key={name} value={name}>{name}</MenuItem>
                            ))}
                        </CustomSelect>
                        <CustomSelect xs={6} hide={hide?.event} label={'Event'} value={filters} setValue={setFilters}>
                            {eventsList.map(({ label, event }) => (
                                <MenuItem key={event} value={event}>{label}</MenuItem>
                            ))}
                        </CustomSelect>
                    </Grid>
                </Paper>
            </Box>

            {/* Team Cards */}
            {filteredList.length === 0 ? (
                null
            ) : (
                filteredList.map((team) => (
                    <TeamCard key={team._id} team={team} />
                ))
            )}
        </Grid>
    );
}
