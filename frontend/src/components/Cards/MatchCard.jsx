import React, { useContext } from 'react'
import { Avatar, Grid, Paper, Stack, Typography, Link, AvatarGroup, Tooltip, Button } from '@mui/material'
import Tilt from 'react-parallax-tilt';


import residenceList from '../../data/residence'
import eventsList from '../../data/events'
import chroma from 'chroma-js';
import moment from 'moment'
import PlayerCard from '../../UI/PlayerCard';
import { AuthContext } from '../../context/AuthProvider';

import axios from '../../services/axiosinstance'
import { useNavigate } from 'react-router';

const vsImage = 'https://upload.wikimedia.org/wikipedia/commons/7/70/Street_Fighter_VS_logo.png'

function TeamBox({ team, winner }) {
    const { name, residence, players, _id } = team
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
                <Link href={`/teams/${_id}`} sx={{ textDecoration: 'none', 'hover': { color: 'red' } }}>
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
                    <AvatarGroup max={3}>
                        {players.map((player) => {
                            const { name, image, _id } = player
                            return <Avatar key={_id} src={image}>{name[0]}</Avatar>
                        })}
                    </AvatarGroup>
                </Tooltip>
                {_id == winner && <Paper sx={{p: 1}}><Typography
                    variant='h3'
                    fontWeight={700}
                    textAlign='center'
                    sx={{ textShadow: '0px 2px 0 #000', }}
                >
                    Winner
                </Typography></Paper>}
            </Stack>
        </Tilt>
    )
}

export default function MatchCard({ match, ...props }) {


    const { teams, event, time, _id } = match
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    const isAdmin = user?.role === 'admin'

    const deleteMatchHandler = async () => {
        try {
            await axios.delete(`/match/${_id}`)
        }
        catch (e) {

        }
    }

    return (
        <Paper elevation={5} sx={{ m: 1 }} >
            <Paper elevation={1} sx={{ p: 2 }}>
                <Stack sx={{ alignItems: 'center' }}>
                    <Typography
                        variant='h4'
                        fontWeight={700}
                        textAlign='center'
                        letterSpacing={'1px'}
                        sx={{ mb: 1 }}
                    >
                        <span className="text-gradient">{event}</span>
                    </Typography>
                    {!props?.hideSummary && <Button size='large' variant='contained' sx={{ mb: 2 }} onClick={() => navigate(`/matches/${_id}`)}>
                        Show Match Summary
                    </Button>}
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
                </Stack>
            </Paper>
            <Stack direction='row' p={{ xs: 1, md: 2 }} gap={{ xs: 1, md: 3 }} sx={{ alignItems: 'center', justifyContent: 'space-evenly' }}>
                <TeamBox team={teams[0]} winner={match?.winner} />
                <img src={vsImage} style={{ height: '4rem' }} />
                <TeamBox team={teams[1]} winner={match?.winner} />
            </Stack>
            {isAdmin && (
                <Button size='large' variant='contained' fullWidth onClick={deleteMatchHandler}>
                    Delete Match
                </Button>
            )}
        </Paper>
    )
}
