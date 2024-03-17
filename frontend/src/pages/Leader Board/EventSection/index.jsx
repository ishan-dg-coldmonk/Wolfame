import React, { useEffect, useState } from 'react'
import { Button, Grid, IconButton, Paper, Stack, Typography } from '@mui/material'
import TeamCard from '../../../UI/TeamCard'

import axios from '../../../services/axiosinstance'

function TeamSection({ event }) {

    const [teamList, setTeamList] = useState([])

    const fetchTeams = async () => {
        try {
            const teams = await axios.get('/team', { params: { event } })
            return teams.data
        }
        catch (e) {
            return []
        }
    }

    useEffect(() => {
        fetchTeams().then((data) => setTeamList(data))
    }, [])

    return (
        <Grid container spacing={1} sx={{ display: 'flex', justifyContent: 'center', p: { xs: 2, md: 4 } }}>
            {teamList.map((team) => {
                return <TeamCard key={team.name} team={team} />
            })}
        </Grid>
    )
}

function MatchSection() {
    return <></>
}

export default function EventSection({ event }) {

    const bodyItems = [
        {
            name: 'Teams',
            element: () => <TeamSection event={event} />
        },
        {
            name: 'Matches',
            element: () => <MatchSection event={event} />
        },
    ]

    const [selectedMenu, setSelectedMenu] = useState(bodyItems[0])

    const menuChangeHandler = (menuItem) => {
        setSelectedMenu(menuItem)
    }

    return (
        <Stack py={2}>
            <Grid container spacing={1} sx={{ justifyContent: 'center', width: 1, p: 1 }} >
                {
                    bodyItems.map((menuItem) => {
                        const { name } = menuItem
                        const isSelected = selectedMenu.name === name
                        return (
                            <Grid key={name} item xs={6}>
                                <Button
                                    size='large'
                                    fullWidth
                                    variant={isSelected ? 'contained' : 'outlined'}
                                    onClick={() => menuChangeHandler(menuItem)}
                                >
                                    <Typography variant='body1' fontWeight={700} sx={{ opacity: 0.8, color: isSelected ? 'white' : 'red' }} >
                                        {name}
                                    </Typography>
                                </Button>
                            </Grid>
                        )
                    })
                }
            </Grid>
            {selectedMenu?.element()}
        </Stack >
    )
}
