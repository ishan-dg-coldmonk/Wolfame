import { Button, Grid, Paper, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'

import PlayerSection from '../../../components/Sections/PlayerSection'
import TeamSection from '../../../components/Sections/TeamSection'
import MatchSection from '../../../components/Sections/MatchSection'


function BodySection({ residence }) {

    const [selectedMenu, setSelectedMenu] = useState('Players')

    const menuChangeHandler = (menuItem) => {
        setSelectedMenu(menuItem)
    }

    return (
        <Stack>
            <Paper>
                <Grid container spacing={1} sx={{ justifyContent: 'center', width: 1, p: 1, m: 1 }} >
                    {
                        ['Players', 'Teams', 'Matches'].map((name) => {
                            const isSelected = selectedMenu === name
                            return (
                                <Grid key={name} item>
                                    <Button
                                        size='large'
                                        variant={isSelected ? 'contained' : 'text'}
                                        onClick={() => menuChangeHandler(name)}
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
            </Paper>
            {selectedMenu === 'Players' && <PlayerSection params={{ residence: residence.name }} />}
            {selectedMenu === 'Teams' && <TeamSection params={{ residence: residence.name }} hide={{ residence: true }} />}
            {selectedMenu === 'Matches' && <MatchSection params={{ residence: residence.name }} hide={{ residence: true }} />}
        </Stack >
    )
}

export default BodySection