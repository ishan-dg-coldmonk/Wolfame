import { Button, Grid, IconButton, Paper, Stack, Typography, MenuItem, Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import UserCard from '../Cards/UserCard'

import LoadingIndicator from '../../UI/LoadingIndicator'
import EmptyBlock from '../../UI/EmptyBlock'
import ErrorBlock from '../../UI/ErrorBlock'

import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../../services/http'
import residenceList from '../../data/residence';
import CustomSelect from './CustomSelect';


export default function PlayerSection({ params = {}, hide = {} }) {

    const { data: userList, isPending, isError } = useQuery({
        queryKey: ['users', params],
        queryFn: () => fetchUsers(params),
    })

    const [filters, setFilters] = useState({ residence: 'All' });

    if (isPending) {
        return <LoadingIndicator />
    }

    if (isError) {
        return <ErrorBlock />
    }

    const filteredList = userList.filter((user) => {
        if (filters.residence !== 'All' && user.residence !== filters.residence) {
            return false;
        }
        return true;
    });

    return (
        <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'center', p: { xs: 2, md: 4 } }}>
            {/* Filter Bar */}
            <Box sx={{ width: '100%', mb: 4, mt: 0, px: 2 }}>
                <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
                    <Grid container spacing={2} p={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <CustomSelect xs={6} md={4} hide={hide?.residence} label={'Residence'} value={filters} setValue={setFilters}>
                            {residenceList.map(({ name }) => (
                                <MenuItem key={name} value={name}>{name}</MenuItem>
                            ))}
                        </CustomSelect>
                    </Grid>
                </Paper>
            </Box>

            {filteredList.length === 0 ? (
                <EmptyBlock />
            ) : (
                filteredList.map((user) => {
                    return <UserCard key={user.name} user={user} />
                })
            )}
        </Grid>
    )
}