import { Button, Grid, IconButton, Paper, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import UserCard from '../../../../UI/UserCard'
import axios from '../../../../services/axiosinstance'

export default function PlayerSection({ residence }) {

    const [playerList, setPlayerList] = useState([])

    const fetchPlayer = async () => {
        try {
            const users = await axios.get('/user', { params: { residence: residence.name } })
            return users.data
        }
        catch (e) {
            console.log(e)
            return []
        }
    }

    useEffect(() => {
        fetchPlayer().then((data) => setPlayerList(data))
    }, [residence])

    return (
        <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'center', p: { xs: 2, md: 4 } }}>
            {playerList.map((user) => {
                return <UserCard key={user.name} user={user} />
            })}
        </Grid>
    )
}