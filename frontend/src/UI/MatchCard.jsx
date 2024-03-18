import React, { useContext } from 'react'
import { Avatar, Grid, Paper, Stack, Typography, Link, AvatarGroup, Tooltip, Button } from '@mui/material'
import Tilt from 'react-parallax-tilt';


import residenceList from '../data/residence'
import eventsList from '../data/events'
import chroma from 'chroma-js';
import moment from 'moment'
import PlayerCard from './PlayerCard';
import { AuthContext } from '../context/AuthProvider';

import axios from '../services/axiosinstance'

const vsImage = 'https://upload.wikimedia.org/wikipedia/commons/7/70/Street_Fighter_VS_logo.png'

function TeamBox({ team }) {
    const { name, residence, players } = team
    const residenceData = residenceList.find((data) => data.name === residence)
    const playersList = (
        <Stack p={2} gap={2} sx={{ alignItems: 'center' }}>
            <Typography variant='h4' fontWeight={700} >
                Players
            </Typography>
            <Stack gap={1}>
                {players?.map((player, index) => {
                    return <PlayerCard key={player._id} player={player} index={index} />
                })}
            </Stack>
        </Stack>
    )
    return (
        <Tilt
            scale={1.15}
            tiltReverse={true}
            perspective={500}
            glareEnable={true}
            glareMaxOpacity={0.45}
            glareBorderRadius='1rem'
            className='parallax-effect'
            style={{
                width: '10rem',
                height: '12rem',
                borderRadius: '0.8rem',
                backgroundColor: chroma(residenceData.color).darken().alpha(0.6).hex(),
                // backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                // justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                border: 'none',
                // borderColor: 'red',
            }}
        >
            <Stack className='inner-element' p={3} gap={1} sx={{ alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
                <Link href={`/teams/${encodeURIComponent(name)}`} sx={{ textDecoration: 'none', 'hover': { color: 'red' } }}>
                    <Typography
                        variant='h5'
                        fontWeight={700}
                        textAlign='center'
                        sx={{ textShadow: '0px 2px 0 #000' }}
                    >
                        {name}
                    </Typography>
                </Link>
                <Link href={`/residence/${residence.replaceAll(' ', '')}`} sx={{ textDecoration: 'none', ':hover': { color: 'red' } }}>
                    <Typography
                        variant='h6'
                        fontWeight={400}
                        textAlign='center'
                        sx={{ textShadow: '0px 2px 0 #000' }}
                    >
                        {residence}
                    </Typography>
                </Link>
                <Tooltip title={playersList}>
                    <AvatarGroup max={4}>
                        {players.map((player) => {
                            const { name, image, _id } = player
                            return <Avatar key={_id} src={image}>{name[0]}</Avatar>
                        })}
                    </AvatarGroup>
                </Tooltip>
            </Stack>
        </Tilt>
    )
}

export default function MatchCard({ match, ...props }) {


    const { teams, event, time, _id } = match
    const { user } = useContext(AuthContext)

    const isAdmin = user?.role === 'admin'

    const deleteMatchHandler = async () => {
        try {
            await axios.delete(`/match/${_id}`)
        }
        catch (e) {

        }
    }

    return (
        <Paper elevation={5} sx={{m: 1}} >
            <Paper elevation={1} sx={{ p: 2 }}>
                <Paper>
                    <Typography
                        variant='h4'
                        fontWeight={700}
                        textAlign='center'
                        letterSpacing={'1px'}
                        sx={{ mb: 1 }}
                    >
                        <span className="text-gradient">{event}</span>
                    </Typography>
                </Paper>
                <Typography
                    variant='h5'
                    fontWeight={400}
                    textAlign='center'
                    letterSpacing={'1px'}
                    sx={{ textShadow: '0px 2px 0 #000' }}
                >
                    {moment(time).format('LT')}
                </Typography>
                <Typography
                    variant='h5'
                    fontWeight={400}
                    textAlign='center'
                    letterSpacing={'1px'}
                    sx={{ textShadow: '0px 2px 0 #000' }}
                >
                    {moment(time).format('Do MMMM')}
                </Typography>
            </Paper>
            <Stack direction='row' p={{ xs: 1, md: 2 }} gap={{ xs: 1, md: 3 }} sx={{ alignItems: 'center' }}>
                <TeamBox team={teams[0]} />
                <img src={vsImage} style={{ height: '4rem' }} />
                <TeamBox team={teams[1]} />
            </Stack>
            {isAdmin && (
                <Button size='large' fullWidth onClick={deleteMatchHandler}>
                    Delete Match
                </Button>
            )}
        </Paper>
    )
}
