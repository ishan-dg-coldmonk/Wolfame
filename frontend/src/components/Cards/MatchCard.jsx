import React, { useContext, useEffect, useState, useRef } from 'react'
import { Avatar, Grid, Paper, Stack, Typography, Link, AvatarGroup, Tooltip, Button, CircularProgress, Box } from '@mui/material'
import Tilt from 'react-parallax-tilt';


import residenceList from '../../data/residence'
import eventsList from '../../data/events'
import chroma from 'chroma-js';
import moment from 'moment'
import PlayerCard from '../../UI/PlayerCard';
import { AuthContext } from '../../context/AuthProvider';

import axios from '../../services/axiosinstance'
import { useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../services/http';

import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

const vsImage = 'https://upload.wikimedia.org/wikipedia/commons/7/70/Street_Fighter_VS_logo.png'

function SelectWinnerSection({ matchId, teams = [], winner }) {
    const [open, setOpen] = useState(false);
    const [winnerTeam, setWinnerTeam] = useState(null)
    const anchorRef = useRef(null);

    const { mutate, isPending } = useMutation({
        mutationFn: (winner) => axios.patch(`/match/${matchId}`, { winner }),
        onMutate: async (winner) => {
            const matchData = queryClient.getQueryData(['matches', {}])
            if (!matchData) return
            const matchDataDummy = [...matchData]
            const index = matchDataDummy.findIndex(({ _id }) => _id === matchId)
            matchDataDummy[index] = { ...matchDataDummy[index], winner }
            queryClient.setQueryData(['matches', {}], matchDataDummy)
            setOpen(false)
        },
        onSettled: () => {
            queryClient.invalidateQueries(['matches', {}])
        }
    })

    useEffect(() => {
        setWinnerTeam(teams.find(({ _id }) => _id == winner))
    }, [winner])

    const handleMenuItemClick = (winnerId) => {
        mutate(winnerId)
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };
    return (
        <Stack gap={2} sx={{ alignItems: 'center', p: 2 }}>
            <Typography
                variant='h5'
                fontWeight={400}
                textAlign='center'
                letterSpacing={'1px'}
                sx={{ textShadow: '0px 2px 0 #000' }}
            >
                Select Winner
            </Typography>
            <ButtonGroup
                fullWidth
                variant="contained"
                ref={anchorRef}
                aria-label="Button group with a nested menu"
            >
                <Button onClick={handleToggle} fullWidth>{winnerTeam?.name || 'None'}</Button>
                <Button
                    sx={{ width: '3rem' }}
                    size="large"
                    aria-controls={open ? 'split-button-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={handleToggle}
                >
                    <ArrowDropDownIcon />
                </Button>
            </ButtonGroup>
            <Popper
                sx={{
                    zIndex: 1,
                    width: '20rem'
                }}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu" autoFocusItem>
                                    <MenuItem onClick={() => handleMenuItemClick(null)} selected={!winner} >None</MenuItem>
                                    {teams.map((team, index) => {
                                        const { _id, name } = team
                                        return <MenuItem
                                            key={_id}
                                            selected={_id === winner}
                                            onClick={() => handleMenuItemClick(_id)}
                                        >
                                            {name}
                                        </MenuItem>
                                    })}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </Stack>
    )
}

function TeamBox({ team = { name: '', residence: '', players: [], _id: '' }, winner }) {
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
                                const { name, image, _id } = player
                                return <Avatar key={_id} src={image}>{name[0]}</Avatar>
                            })}
                        </AvatarGroup>
                    </Tooltip>
                    {_id == winner && <Paper sx={{ p: 1, bgcolor: chroma(residenceData?.color || 'black').darken().hex() }}><Typography
                        variant='h4'
                        fontWeight={700}
                        textAlign='center'
                    >
                        Winner
                    </Typography></Paper>}
                </Stack>
            </Tilt>
        </Box>
    )
}

export default function MatchCard({ match, ...props }) {

    const { teams, event, time, _id } = match
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    const isAdmin = user?.role === 'admin'
    const { mutate: deleteMatchHandler, isPending } = useMutation({
        mutationFn: () => axios.delete(`/match/${_id}`).then(response => response.data),
        onMutate: () => {
            const matchData = queryClient.getQueryData(['matches', {}])
            if (!matchData) return
            const matchDataDummy =  matchData.filter(({ _id: matchId }) => _id !== matchId)
            queryClient.setQueryData(['matches', {}], matchDataDummy)
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['matches', {}] })
        },
    })

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
            <Stack direction='row' p={{ xs: 1, md: 2 }} gap={{ xs: 1, md: 3 }} sx={{ alignItems: 'center', justifyContent: 'space-evenly' }}>
                <TeamBox team={teams[0]} winner={match?.winner} />
                <img src={vsImage} style={{ height: '4rem' }} />
                <TeamBox team={teams[1]} winner={match?.winner} />
            </Stack>
            {isAdmin && (
                <>
                    <SelectWinnerSection matchId={_id} teams={teams} winner={match?.winner} />
                    <Button size='large' variant='contained' fullWidth disabled={isPending} onClick={deleteMatchHandler}>
                        {isPending ? 'Deleting...' : 'Delete Match'}
                    </Button>
                </>
            )}
        </Paper>
    )
}
