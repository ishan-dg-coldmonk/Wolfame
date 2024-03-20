import React, { useEffect, useState } from 'react'
import { Button, FormControl, Grid, IconButton, InputLabel, Paper, Select, Stack, Typography, MenuItem, Box } from '@mui/material'

export default function CustomSelect({ value, setValue, label, children, hide, ...props }) {

    if (hide) return <></>

    const name = label.toLowerCase()

    return (
        <Grid item md={4} {...props} sx={{width: '100%'}}>
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