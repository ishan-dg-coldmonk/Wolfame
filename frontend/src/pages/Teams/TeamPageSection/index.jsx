import React, { useEffect, useState } from 'react'
import { Avatar, Grid, Link, Paper, Stack, Typography } from '@mui/material'
import { useParams } from 'react-router'
import axios from '../../../services/axiosinstance'

export default function TeamPageSection() {

    const { team } = useParams()
    const [teamData, setTeamData] = useState({})

    const fetchTeam = async () => {
        try {
            const { data } = await axios.get(`/team/${team}`)
            setTeamData(data)
        }
        catch (e) {

        }
    }

    useEffect(() => {
        fetchTeam()
    }, [team])

    return (
        <Grid container spacing={2} p={4} mt={6} mb={2}>
            <Grid item xs={12} md={4}>
                <Paper elevation={10} sx={{ borderRadius: '2rem', p: 2 }}>
                    <Stack gap={2}>
                        <Typography
                            variant='h3'
                            fontWeight={700}
                            textAlign='center'
                            sx={{ textShadow: '0px 2px 0 #000', letterSpacing: '2px' }}
                        >
                            {teamData?.name}
                        </Typography>
                        <Link href={`/residence/${teamData?.residence?.replaceAll(' ', '')}`} sx={{ textDecoration: 'none' }}>
                            <Typography
                                variant='h4'
                                fontWeight={500}
                                textAlign='center'
                                sx={{ textShadow: '0px 2px 0 #000', ':hover': { color: 'red' } }}
                            >
                                <b>Residence</ b> : {teamData?.residence}
                            </Typography>
                        </Link>
                        <Link href={`/leaderboard/${teamData?.event?.replaceAll(' ', '')}`} sx={{ textDecoration: 'none' }}>
                            <Typography
                                variant='h4'
                                fontWeight={500}
                                textAlign='center'
                                sx={{ textShadow: '0px 2px 0 #000', ':hover': { color: 'red' } }}
                            >
                                <b>Event</b> : {teamData?.event}
                            </Typography>
                        </Link>
                        <Paper elevation={5}>
                            <Stack p={2} gap={2} sx={{ alignItems: 'center' }}>
                                <Typography variant='h4' fontWeight={700} sx={{ opacity: 0.6 }} >
                                    Players
                                </Typography>
                                <Stack gap={1}>
                                    {teamData?.players?.map(({ name, image = '' }, index) => {
                                        return (
                                            <Paper elevation={index & 1 ? 4 : 8} sx={{ ":hover": { transform: 'scaleY(1.2) scaleX(1.05)' } }}>
                                                <Stack direction='row' p={1} gap={2} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <Link href={`/users/${encodeURIComponent(name)}`} sx={{ textDecoration: 'none', color: 'white', ':hover': { color: 'red' } }}>
                                                        <Stack direction='row' gap={2} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                                                            <Avatar src={image} variant="rounded">{name?.[0]}</Avatar>
                                                            <Typography variant='h5' fontWeight={500} sx={{ opacity: 0.6, color: 'inherit' }} >
                                                                {name}
                                                            </Typography>
                                                        </Stack>
                                                    </Link>
                                                </Stack >
                                            </Paper >)
                                    })
                                    }
                                </Stack>
                            </Stack>
                        </Paper>
                    </Stack>
                </Paper>
            </Grid>
        </Grid>
    )
}
