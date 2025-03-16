import React, { useContext } from 'react';
import { Avatar, Grid, Paper, Stack, Typography, Link, AvatarGroup, Tooltip, Button, CircularProgress, Box } from '@mui/material';
import Tilt from 'react-parallax-tilt';

import residenceList from '../../data/residence';
import eventsList from '../../data/events';
import chroma from 'chroma-js';
import moment from 'moment';
import PlayerCard from '../../UI/PlayerCard';
import { AuthContext } from '../../context/AuthProvider';

import axios from '../../services/axiosinstance';
import { useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../services/http';

const vsImage = 'https://upload.wikimedia.org/wikipedia/commons/7/70/Street_Fighter_VS_logo.png';

function TeamBox({ team = { name: '', residence: '', players: [], _id: '' }, winner }) {
    const { name, residence, players, _id } = team;
    const residenceData = residenceList.find((data) => data.name === residence);
    const playersList = (
        <Stack p={2} gap={2} sx={{ alignItems: 'center' }}>
            <Typography variant='h4' fontWeight={700} >
                Players
            </Typography>
            <Stack gap={1}>
                {players?.map((player, index) => {
                    return <PlayerCard key={player._id} player={player} index={index} />;
                })}
            </Stack>
        </Stack>
    );

    return (
        <Box width={{ xs: '8rem', md: '10rem' }} sx={{ minHeight: { xs: '10rem', md: '12rem' } }}>
            <Tilt
                scale={1.15}
                tiltReverse={true}
                perspective={500}
                glareEnable={true}
                glareMaxOpacity={0.45}
                glareBorderRadius='1rem'
                className='parallax-effect'
                style={{
                    minHeight: '10rem',
                    width: '100%',
                    height: '100%',
                    borderRadius: '0.8rem',
                    backgroundColor: chroma(residenceData?.color || 'black').hex(),
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    border: 'none',
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
                            variant='h5'
                            fontWeight={700}
                            textAlign='center'
                            sx={{ textShadow: '0px 2px 0 #000' }}
                        >
                            {residence}
                        </Typography>
                    </Link>
                    <Tooltip title={playersList}>
                        <AvatarGroup max={2}>
                            {players.map((player) => {
                                const { name, image, _id } = player;
                                return <Avatar key={_id} src={image}>{name[0]}</Avatar>;
                            })}
                        </AvatarGroup>
                    </Tooltip>
                    {_id == winner && (
                        <Paper sx={{ p: 1, bgcolor: chroma(residenceData?.color || 'black').darken().hex() }}>
                            <Typography variant='h4' fontWeight={700} textAlign='center'>
                                Winner
                            </Typography>
                        </Paper>
                    )}
                </Stack>
            </Tilt>
        </Box>
    );
}

export default function MatchCard({ match, ...props }) {
    const { teams, event, time, _id, winner } = match; // Destructure `winner` from `match`
    const navigate = useNavigate();

    return (
        <Paper elevation={10} sx={{ m: 1, my: 2 }}>
            <Paper elevation={1} onClick={() => navigate(`/matches/${_id}`)} sx={{ cursor: 'pointer', p: 2 }}>
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
            <Stack direction='row' p={{ xs: 1, md: 2 }} gap={{ xs: 1, md: 3 }} sx={{ alignItems: 'stretch', justifyContent: 'space-evenly' }}>
                <TeamBox team={teams[0]} winner={winner} /> {/* Pass `winner` to TeamBox */}
                <img src={vsImage} style={{ height: '4rem' , alignSelf:"center"}} />
                <TeamBox team={teams[1]} winner={winner} /> {/* Pass `winner` to TeamBox */}
            </Stack>
        </Paper>
    );
}