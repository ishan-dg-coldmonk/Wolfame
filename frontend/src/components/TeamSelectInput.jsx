import React from 'react'
import { Stack, Typography, Avatar, MenuItem, Select, InputLabel, FormControl } from '@mui/material'

import residenceList from '../data/residence'

export default function TeamSelectInput({ index = 0, selectedTeams = [], teamsList = [], setTeams }) {
    const filteredTeamsList = teamsList.filter(
        (team) => !selectedTeams.find(
            (id, i) => index !== i && team?._id === id)
    )

    return (
        <FormControl fullWidth sx={{ maxWidth: '500px' }}>
            <InputLabel id={`team-label-${index}`}>{`Team`}</InputLabel>
            <Select
                labelId={`team-label-${index}`}
                id={`team-${index}`}
                fullWidth
                defaultValue={'Select Team'}
                value={selectedTeams?.[index]}
                onChange={(e) => {
                    const newTeamsList = [...selectedTeams]
                    newTeamsList[index] = e.target.value
                    setTeams(newTeamsList)
                }}
                label="Team"
                name='team'
            > {
                    filteredTeamsList.length === 0 && (<Stack sx={{ alignItems: 'center', p: 2 }}><Typography variant='h4'>No Team</Typography></Stack>)
                }
                {filteredTeamsList.map((team) => {
                    const { name, residence, _id } = team
                    const residenceData = residenceList.find((data) => data.name === residence)
                    return (
                        <MenuItem key={name} value={_id} selected={_id == selectedTeams[index]}>
                            <Stack direction='row' gap={2} sx={{ alignItems: 'center' }}>
                                <Avatar src={residenceData?.image} variant="rounded">{name?.[0]}</Avatar>
                                <Typography variant='h5' fontWeight={500} sx={{ opacity: 0.6, color: 'inherit' }} >
                                    {name}
                                </Typography>
                                <Typography variant='h5' fontWeight={700} sx={{ opacity: 0.6, color: residenceData?.color }} >
                                    {residence}
                                </Typography>
                            </Stack>
                        </MenuItem>
                    )
                })}
            </Select>
        </FormControl>
    )
}