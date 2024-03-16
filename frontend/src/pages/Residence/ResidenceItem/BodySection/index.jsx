import { Button, Grid, IconButton, Paper, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

import PlayerSection from './PlayerSection'
import TeamSection from './TeamSection'
import MatchSection from './MatchSection'


function BodySection({ residence }) {

    const bodyItems = [
        {
            name: 'Players',
            element: () => <PlayerSection residence={residence} />
        },
        {
            name: 'Teams',
            element: () => <TeamSection />
        },
        {
            name: 'Matches',
            element: () => <MatchSection />
        },
    ]

    const [selectedMenu, setSelectedMenu] = useState(bodyItems[0])

    const menuChangeHandler = (menuItem) => {
        setSelectedMenu(menuItem)
    }

    return (
        <Stack>
            <Paper>
                <Grid container spacing={1} sx={{ justifyContent: 'center', width: 1, p: 1 }} >
                    {
                        bodyItems.map((menuItem) => {
                            const { name } = menuItem
                            const isSelected = selectedMenu.name === name
                            return (
                                <Grid key={name} item>
                                    <Button
                                        size='large'
                                        variant={isSelected ? 'contained' : 'text'}
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
            </Paper>
            {selectedMenu?.element()}
        </Stack >
    )
}

export default BodySection