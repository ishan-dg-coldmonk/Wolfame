import React, { useEffect, useState } from 'react'
import { Avatar, Grid, Link, Paper, Stack, Switch, Typography } from '@mui/material'

import PhoneIcon from '@mui/icons-material/Phone'

export default function PlayerCard({ player, index }) {
    const { name, image = '', phone_number, _id } = player
    return (
        <Paper elevation={index & 1 ? 4 : 8} sx={{ ":hover": { transform: 'scaleY(1.2) scaleX(1.05)' } }}>
            <Stack direction='row' p={1} px={2} gap={2} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                {/* <Link href={`/users/${_id}`} sx={{ textDecoration: 'none', color: 'white', ':hover': { color: 'red' } }}> */}
                    <Stack direction='row' gap={2} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Avatar src={image} variant="rounded">{name?.[0]}</Avatar>
                        <Typography variant='h5' fontWeight={500} sx={{ opacity: 0.6, color: 'inherit' }} >
                            {name}
                        </Typography>
                    </Stack>

                <Link href={`tel:${phone_number}`} sx={{ textDecoration: 'none', color: 'white', ':hover': { color: 'red' } }}>
                    <Stack direction='row' gap={1} sx={{ color: 'inherit' }}>
                        <PhoneIcon sx={{ color: 'inherit' }} />
                        <Typography
                            variant='body1'
                            fontWeight={700}
                            textAlign='center'
                            sx={{ textShadow: '0px 2px 0 #000', color: 'inherit' }}
                        >
                            {phone_number}
                        </Typography>
                    </Stack>
                </Link>
            </Stack >
        </Paper >
    )
}