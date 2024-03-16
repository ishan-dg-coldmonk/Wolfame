import { Button, Grid, IconButton, Paper, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import UserCard from '../../UI/UserCard'
import axios from '../../services/axiosinstance'

export default function UserSection() {

    const [userList, setUserList] = useState([])

    const fetchUsers = async () => {
        try {
            const users = await axios.get('/user', {})
            return users.data
        }
        catch (e) {
            console.log(e)
            return []
        }
    }

    useEffect(() => {
        fetchUsers().then((data) => setUserList(data))
    }, [])

    return (
        <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'center', p: { xs: 2, md: 4 } }}>
            {userList.map((user) => {
                return <UserCard key={user.name} user={user} hide={{ linkedin: true, phone_number: true }} />
            })}
        </Grid>
    )
}