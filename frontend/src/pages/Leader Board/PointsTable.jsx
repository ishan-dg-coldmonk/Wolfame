import React from 'react'
import { Avatar, Link, Paper, Stack, Typography } from '@mui/material'

import residenceList from '../../data/residence'
import eventsList from '../../data/events'
import { useQuery } from '@tanstack/react-query'

import axios from '../../services/axiosinstance'

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
        <Paper elevation={odd ? 4 : 8} sx={{ ":hover": { transform: 'scaleY(1.2) scaleX(1.05)' }, width: '100%' }}>
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

function PointsBlock({ label, winnerList }) {

    const filteredResidenceList = residenceList.filter(({ category }) => category.toLowerCase() === label.toLowerCase()).map((data) => {
        let points = 0
        winnerList.filter(({ team }) => team.residence == data.name).forEach(({ event, rank }) => {
            // console.log(eventData.points?.[parseInt(rank)])
            if (rank > 3) return;
            const eventData = eventsList.find(({ label }) => label == event);
            console.log(data.name, eventData.points[rank - 1], rank)
            points += parseInt(eventData.points?.[parseInt(rank) - 1])
        })
        return { points, ...data }
    }).sort((a, b) => b.points - a.points)

    return (
        <Stack gap={3} sx={{ width: '100%', alignItems: 'center' }}>
            <Typography variant='h2' fontWeight={700}>
                {label}
            </Typography>
            <Stack gap={1} sx={{ width: '100%', alignItems: 'center' }}>
                {filteredResidenceList.map((data, i) => {
                    return <TableCard key={data.name} {...data} odd={i & 1} />
                })}
            </Stack>
        </Stack>
    )
}

function PointsTable() {

    const { data: winnerList = [], isPending, isError } = useQuery({
        queryKey: ['winners'],
        queryFn: () => axios.get('/winner').then(response => response.data),
    })

    return (
        <Stack py={2} gap={3} pr={{ xs: 0, md: 2 }}>
            <PointsBlock label={'Men'} winnerList={winnerList} />
            <PointsBlock label={'Women'} winnerList={winnerList} />
        </Stack>
    )
}

export default PointsTable
