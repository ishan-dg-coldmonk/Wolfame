import { Stack, Typography } from '@mui/material'
import React from 'react'

export default function EmptyBlock(props) {
    return (
        <Stack p={8} sx={{ alignItems: 'center', ...props }}>
            <Typography variant='h2' fontWeight={700} color='GrayText'>
                Empty
            </Typography>
        </Stack>
    )
}
