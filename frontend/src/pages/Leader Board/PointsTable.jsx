import React from 'react'
import { Avatar, Link, Paper, Stack, Typography } from '@mui/material'

import residenceList from '../../data/residence'

function ValueCard({ label, children, value }) {
    return (
        <Stack>
            <Typography variant='body2'>
                {label}
            </Typography>
            {children || (<Typography variant='h5' fontWeight={500} sx={{ opacity: 0.6, color: 'inherit' }} >
                {value}
            </Typography>)}
        </Stack>
    )
}

function TableCard({ name, image, odd, points = 0 }) {
    return (
        <Paper elevation={odd ? 4 : 8} sx={{ ":hover": { transform: 'scaleY(1.2) scaleX(1.05)' } }}>
            <Stack direction='row' p={1} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <Link href={`/residence/${name.replaceAll(' ', '')}`} sx={{ textDecoration: 'none', color: 'white', ':hover': { color: 'red' } }}>
                    <Stack direction='row' gap={2} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Avatar src={image} variant="rounded">{name?.[0]}</Avatar>
                        <Typography variant='h5' fontWeight={500} sx={{ opacity: 0.6, color: 'inherit' }} >
                            {name}
                        </Typography>
                    </Stack>
                </Link>
                <Paper sx={{ backgroundImage: 'linear-gradient(135deg, #cc0000 2.34%, #e96214d6 100.78%)', width: '3rem', height: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '1rem' }}>
                    <Typography variant='h5' fontWeight={500} sx={{ textAlign: 'center', margin: 'auto' }} >
                        {points}
                    </Typography>
                </Paper>
            </Stack >
        </Paper >
    )
}

function PointsTable({ players }) {
    return (
        <Stack py={2} gap={1} pr={{ xs: 0, md: 2 }}>
            {residenceList.map((data, i) => <TableCard key={data.name} {...data} odd={i & 1} />)}
        </Stack>
    )
}

export default PointsTable
