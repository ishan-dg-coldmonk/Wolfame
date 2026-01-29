import { CircularProgress, Stack } from '@mui/material'
import React from 'react'

export default function LoadingIndicator(props) {
    return (
        <Stack p={8} sx={{ alignItems: 'center', ...props }}>
            <CircularProgress />
        </Stack>
    )
}
