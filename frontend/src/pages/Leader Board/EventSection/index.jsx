import React, { useEffect, useState } from 'react'
import { Button, Grid, IconButton, Paper, Stack, Typography } from '@mui/material'

import TeamSection from '../../../components/TeamSection'

function MatchSection() {
    return <></>
}

export default function EventSection({ event }) {

    const [selectedMenu, setSelectedMenu] = useState('Teams')

    const menuChangeHandler = (menuItem) => {
        setSelectedMenu(menuItem)
    }

    return (
        <Stack py={2}>
            <Grid container spacing={1} sx={{ justifyContent: 'center', width: 1, p: 1 }} >
                {
                    ['Teams', 'Matches'].map((name) => {
                        const isSelected = selectedMenu === name
                        return (
                            <Grid key={name} item xs={6}>
                                <Button
                                    size='large'
                                    fullWidth
                                    variant={isSelected ? 'contained' : 'outlined'}
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
            {selectedMenu === 'Teams' && <TeamSection params={{ event }} />}
            {selectedMenu === 'Matches' && <MatchSection event={event} />}
        </Stack >
    )
}
