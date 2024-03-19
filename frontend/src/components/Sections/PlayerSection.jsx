import { Button, Grid, IconButton, Paper, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import UserCard from '../Cards/UserCard'

import LoadingIndicator from '../../UI/LoadingIndicator'
import EmptyBlock from '../../UI/EmptyBlock'
import ErrorBlock from '../../UI/ErrorBlock'

import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../../services/http'


export default function PlayerSection({ params = {} }) {

    const { data: userList, isPending, isError } = useQuery({
        queryKey: ['users', params],
        queryFn: () => fetchUsers(params),
    })

    if (isPending) {
        return <LoadingIndicator />
    }

    if (isError) {
        return <ErrorBlock />
    }

    if (userList.length === 0) {
        return <EmptyBlock />
    }

    return (
        <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'center', p: { xs: 2, md: 4 } }}>
            {userList.map((user) => {
                return <UserCard key={user.name} user={user} />
            })}
        </Grid>
    )
}