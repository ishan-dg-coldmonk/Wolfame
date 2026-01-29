import React from 'react'
import { Avatar, Link, Paper, Stack, Typography } from '@mui/material'

import residenceList from '../../data/residence'
import { useQuery } from '@tanstack/react-query'
import { fetchLeaderboard } from '../../services/http'

import axios from '../../services/axiosinstance'

function TableCard({ name, image, odd, points = 0, rank }) {
    return (
        <Paper elevation={odd ? 4 : 8} sx={{ ":hover": { transform: 'scaleY(1.2) scaleX(1.05)' }, width: '100%' }}>
            <Stack direction='row' p={1} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <Link href={`/residence/${name.replaceAll(' ', '')}`} sx={{ textDecoration: 'none', color: 'white', ':hover': { color: 'red' } }}>
                    <Stack direction='row' gap={2} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Paper sx={{ width: '2rem', height: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                            <Typography variant='h6' fontWeight={700} sx={{ opacity: 0.8 }}>
                                {rank}
                            </Typography>
                        </Paper>
                        <Avatar src={image} variant="rounded">{name?.[0]}</Avatar>
                        <Typography variant='h5' fontWeight={500} sx={{ textAlign: "center", opacity: 0.6, color: 'inherit' }} >
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

function PointsBlock({ label, leaderboard }) {

    // Merge static residence data (images, category) with dynamic points from DB
    const processedList = residenceList
        .filter(({ category }) => category.toLowerCase() === label.toLowerCase())
        .map((resData) => {
            const dbEntry = leaderboard.find(l => l.residence === resData.name);
            return {
                ...resData,
                points: dbEntry ? dbEntry.points : 0
            };
        })
        .sort((a, b) => b.points - a.points);

    return (
        <Stack gap={3} sx={{ width: '100%', alignItems: 'center' }}>
            <Typography variant='h2' fontWeight={700}>
                {label}
            </Typography>
            <Stack gap={1} sx={{ width: '100%', alignItems: 'center' }}>
                {processedList.map((data, i) => {
                    return <TableCard key={data.name} {...data} odd={i & 1} rank={i + 1} />
                })}
            </Stack>
        </Stack>
    )
}

function PointsTable() {

    const { data: leaderboard = [], isPending, isError } = useQuery({
        queryKey: ['leaderboard'],
        queryFn: fetchLeaderboard,
    })

    return (
        <Stack py={2} gap={3} pr={{ xs: 0, md: 2 }}>
            <PointsBlock label={'Men'} leaderboard={leaderboard} />
            <PointsBlock label={'Women'} leaderboard={leaderboard} />
        </Stack>
    )
}

export default PointsTable
