import { Stack, Typography } from '@mui/material'
import React from 'react'

export default function Loading() {
    return (
        <Stack p={8} pt={15} sx={{ alignItems: 'center' }}>
            <Typography variant='h4'>
                Loading
            </Typography>
        </Stack>
    )
}
