import { Stack, Typography } from '@mui/material'
import React from 'react'

export default function ErrorBlock(props) {
    return (
        <Stack p={8} sx={{ alignItems: 'center', ...props }}>
            <Typography variant='h2' fontWeight={700} color='red' sx={{opacity: 0.6}}>
                Unknown Error Occured
            </Typography>
        </Stack>
    )
}