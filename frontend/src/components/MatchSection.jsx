import React, { useEffect, useState } from 'react'
import { Button, FormControl, Grid, IconButton, InputLabel, Paper, Select, Stack, Typography, MenuItem, Box } from '@mui/material'
import MatchCard from '../UI/MatchCard'

import axios from '../services/axiosinstance'

import residenceList from '../data/residence'
import eventsList from '../data/events'

function CustomSelect({ value, setValue, label, children, hide, ...props }) {

    if (hide) {
        return <></>
    }

    const name = label.toLowerCase()

    return (
        <Grid item md={4} {...props}>
            <Box m={1}>
                <FormControl fullWidth>
                    <InputLabel id="match-select">{label}</InputLabel>
                    <Select
                        labelId="match-select"
                        defaultValue={'All'}
                        value={value?.[name]}
                        label={label}
                        onChange={(e) => setValue((values) => { return { ...values, [name]: e.target.value } })}
                    >
                        <MenuItem value={'All'}>All {label}s</MenuItem>
                        {children}
                    </Select>
                </FormControl>
            </Box>
        </Grid>
    )
}

export default function MatchSection({ params, sx = {}, hide = {} }) {

    const [matchList, setMatchList] = useState([])
    const [filters, setFilters] = useState({date: 'All', event: 'All', residence: 'All'})

    const filteredList = matchList.filter(({ time, event, teams }) => {
        if (filters.date != 'All' && new Date(time).getDate() != filters.date) {
            return false
        }
        if (filters.event != 'All' && event != filters.event) {
            return false
        }
        if (filters.residence != 'All' && !teams.some(({ residence }) => residence == filters?.residence)) {
            return false
        }
        return true
    })


    const fetchMatches = async () => {
        try {
            const matches = await axios.get('/match', { params })
            return matches.data
        }
        catch (e) {
            return []
        }
    }

    useEffect(() => {
        fetchMatches().then((data) => setMatchList(data))
    }, [params])

    return (
        <Grid container sx={{ display: 'flex', justifyContent: 'space-evenly', p: { xs: 2, md: 4 }, ...sx }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <Grid container p={1} sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <CustomSelect xs={6} hide={hide?.date} label={'Date'} value={filters} setValue={setFilters}>
                        <MenuItem value={'19'}>19th March</MenuItem>
                        <MenuItem value={'20'}>20th March</MenuItem>
                        <MenuItem value={'21'}>21st March</MenuItem>
                        <MenuItem value={'22'}>22nd March</MenuItem>
                    </CustomSelect>
                    <CustomSelect xs={6} hide={hide?.residence} label={'Residence'} value={filters} setValue={setFilters}>
                        {residenceList.map(({ name }) => {
                            return <MenuItem key={name} value={name}>{name}</MenuItem>
                        })}
                    </CustomSelect>
                    <CustomSelect xs={12} hide={hide?.event} label={'Event'} value={filters} setValue={setFilters}>
                        {eventsList.map(({ label }) => {
                            return <MenuItem key={label} value={label}>{label}</MenuItem>
                        })}
                    </CustomSelect>
                </Grid>
            </Paper>
            {filteredList.length === 0 && (<Typography sx={{ fontSize: '2rem', opacity: 0.4, mt: 3 }}>
                Empty
            </Typography>)}
            {filteredList.map((match) => {
                return <MatchCard key={match._id} match={match} />
            })}
        </Grid>
    )
}