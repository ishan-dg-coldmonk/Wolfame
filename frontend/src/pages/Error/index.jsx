import { Stack, Typography } from '@mui/material'
import React from 'react'
import { useRouteError } from 'react-router-dom';
import skullPhoto from '../../assets/skull.webp'

export default function Error() {
    const error = useRouteError();
    console.error(error);

    return (
        <Stack pb={8} pt={12} gap={4} sx={{ alignItems: 'center' }}>
            <img src={skullPhoto} style={{ width: '16rem' }} />
            <Typography variant='h1' fontFamily={"'Nosifer', sans-serif"} fontSize={{ xs: '3rem', sm: '5rem' }} sx={{ textAlign: 'center' }} >
                <span className="text-gradient">404 Not Found</span>
            </Typography>
            <Typography variant='h6' color="error" sx={{ textAlign: 'center' }}>
                {error?.statusText || error?.message}
            </Typography>
        </Stack>
    )
}