import React, { useContext, useEffect, useState } from 'react'
import { Avatar, Button, Grid, Link, Paper, Stack, Switch, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router'
import axios from '../../../services/axiosinstance'

import PhoneIcon from '@mui/icons-material/Phone';
import PlayerCard from '../../../UI/PlayerCard'
import MatchSection from '../../../components/MatchSection';
import { AuthContext } from '../../../context/AuthProvider';

export default function TeamPageSection() {

    const { team } = useParams()
    const [teamData, setTeamData] = useState({})
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    const rightToDelete = !teamData?.approved && (user?.role === 'admin' || (user?.role === 'jmcr' && user?.residence === teamData?.residence) || teamData?.createdBy == user?._id)

    const fetchTeam = async () => {
        try {
            const { data } = await axios.get(`/team/${team}`)
            setTeamData(data)
        }
        catch (e) {

        }
    }

    const deleteTeamHandler = async () => {
        try {
            await axios.delete(`/team/${team}`)
            navigate('../')
        }
        catch (e) {

        }
    }

    const approveChangeHandler = async (event) => {
        try {
            const approved = event.target.checked
            await axios.post('/team/approve', { _id: teamData?._id, approved })
            setTeamData({ ...teamData, approved })
        }
        catch (e) {

        }
    }

    useEffect(() => {
        fetchTeam()
    }, [team])

    if (!teamData?.name) {
        return (
            <Stack p={8} pt={15} sx={{alignItems: 'center'}}>
                <Typography variant='h4'>
                    Loading
                </Typography>
            </Stack>
        )
    }

    return (
        <Grid container spacing={2} p={{ xs: 1, md: 4 }} mt={6} mb={2}>
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
                        <Paper elevation={5}>
                            <Stack gap={2} p={1} py={2}>
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
                            </Stack>
                        </Paper>
                        <Paper elevation={5} >
                            <Stack py={1} sx={{ alignItems: 'center' }}>
                                <Stack direction='row' gap={2} sx={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <Typography variant='h4' >
                                        Approve
                                    </Typography>
                                    <Switch checked={teamData?.approved} disabled={user?.role != 'admin'} onChange={approveChangeHandler} />
                                </Stack>
                                <Typography variant='body1' color='GrayText' >
                                    *Only approved team can participate in matches.
                                </Typography>
                                <Typography variant='body1' color='GrayText' >
                                    Contact your JMCR to get approved.
                                </Typography>
                            </Stack>
                        </Paper>
                        <Paper elevation={5}>
                            <Stack p={2} gap={2} sx={{ alignItems: 'center' }}>
                                <Typography variant='h4' fontWeight={700} >
                                    Players
                                </Typography>
                                <Stack gap={1}>
                                    {teamData?.players?.map((player, index) => {
                                        return <PlayerCard key={player._id} player={player} index={index} />
                                    })}
                                </Stack>
                            </Stack>
                        </Paper>
                        {rightToDelete && <Button size='large' variant='outlined' onClick={deleteTeamHandler}>Delete Team</Button>}
                    </Stack>
                </Paper>
            </Grid>
            <Grid item xs={12} md={8}>
                <Paper elevation={10} sx={{ borderRadius: '2rem', p: 2 }}>
                    <Stack>
                        <Typography
                            variant='h3'
                            fontWeight={700}
                            textAlign='center'
                            sx={{ textShadow: '0px 2px 0 #000', letterSpacing: '2px' }}
                        >
                            Matches
                        </Typography>
                        <MatchSection params={{ teams: teamData._id }} />
                    </Stack>
                </Paper>
            </ Grid>
        </Grid>
    )
}
