import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Stack, Grid, Typography, Paper, Avatar, Snackbar, Alert, MenuItem, Select, InputLabel, FormControl, useTheme, Button, IconButton } from '@mui/material';
import TextField from "@mui/material/TextField";
import { useFormik } from 'formik';
import axios from '../../services/axiosinstance';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import RuleBook from '../../components/RuleBook';

import residenceList from '../../data/residence';
import eventsList from '../../data/events';

import { teamSchema } from '../../schemas/team';
import CloseIcon from '@mui/icons-material/Close';

import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchUsers, queryClient } from '../../services/http';
import { AuthContext } from '../../context/AuthProvider';

function PlayerSelectInput({ index, selectedPlayers = [], playersList = [], setPlayers }) {
    const filteredPlayersList = playersList.filter(
        (player) => !selectedPlayers.some(
            (id, i) => index !== i && player?._id === id)
    );

    return (
        <FormControl fullWidth>
            <Stack direction='row' gap={1}>
                <InputLabel id={`player-label-${index}`}>{`Player ${index + 1}`}</InputLabel>
                <Select
                    labelId={`player-label-${index}`}
                    id={`player-${index}`}
                    fullWidth
                    defaultValue={'Select Player'}
                    value={selectedPlayers[index]}
                    onChange={(e) => {
                        const newPlayersList = [...selectedPlayers];
                        newPlayersList[index] = e.target.value;
                        setPlayers(newPlayersList);
                    }}
                    label="Player"
                    name='player'
                >
                    {
                        filteredPlayersList.length === 0 && (<Stack sx={{ alignItems: 'center', p: 2 }}><Typography variant='h4'>No Player</Typography></Stack>)
                    }
                    {filteredPlayersList.map((player) => {
                        const { name, image, _id } = player;
                        return (
                            <MenuItem key={name} value={_id} selected={_id == selectedPlayers[index]}>
                                <Stack direction='row' gap={2} sx={{ alignItems: 'center' }}>
                                    <Avatar src={image} variant="rounded">{name?.[0]}</Avatar>
                                    <Typography variant='h5' fontWeight={500} sx={{ opacity: 0.6, color: 'inherit' }} >
                                        {name}
                                    </Typography>
                                </Stack>
                            </MenuItem>
                        );
                    })}
                </Select>
                <Button variant='outlined' onClick={() => {
                    const newPlayersList = [...selectedPlayers];
                    newPlayersList.splice(index, 1);
                    setPlayers(newPlayersList);
                }}>
                    <CloseIcon />
                </Button>
            </Stack>
        </FormControl>
    );
}

export default function CreateTeamSection() {

    const initialValues = {
        name: '',
        residence: '',
        event: '',
        players: [''],
    };

    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const { mutate, isPending } = useMutation({
        mutationFn: (values) => axios.post('/team', values),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['teams'] });
            const { data: team } = response;
            navigate(`/teams/${team._id}`);
        },
        onError: (e) => {
            if (e.response?.status === 406) {
                setErrors(e.response.data);
            }
        }
    });

    const { values, handleBlur, handleChange, handleSubmit, errors, touched, setFieldValue, setErrors } =
        useFormik({
            initialValues,
            validationSchema: teamSchema,
            validateOnChange: true,
            validateOnBlur: false,
            onSubmit: async (values, action) => {
                const filteredPlayers = values.players.filter((value) => value);
                return mutate({ ...values, players: filteredPlayers });
            },
        });

    const { data: playersList } = useQuery({
        queryKey: ['users', values.residence],
        queryFn: () => fetchUsers({ residence: values.residence }),
        enabled: !!values.residence
    });

    const addPlayer = () => {
        setFieldValue('players', [...values.players, '']);
    };

    const setPlayers = (newPlayersList) => {
        setFieldValue('players', newPlayersList);
    };

    const eventData = eventsList.find(({ label }) => label === values.event);

    return (
        <Grid container p={{ xs: 1, md: 3 }} mt={9} mb={6}>
            <Grid item xs={12} md={6} order={{ xs: 3, md: 1 }} py={{ xs: 2, md: 0 }} >
                <RuleBook event={values.event} disableButton />
            </Grid>
            <Grid item xs={12} md={6} order={2} >
                <Stack component="form" onSubmit={handleSubmit} gap={2} px={2} sx={{ alignItems: 'center' }}>
                    <Typography variant='h2' fontWeight={700} sx={{ opacity: 0.6 }} >
                        Create Team
                    </Typography>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Team Name"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.name && touched.name}
                        autoFocus
                    />
                    {errors.name && touched.name && (
                        <Typography color='error'>
                            {errors.name}
                        </Typography>
                    )}
                    <FormControl fullWidth>
                        <InputLabel id="residence-label">Residence</InputLabel>
                        <Select
                            labelId='residence-label'
                            id="residence"
                            fullWidth
                            defaultValue={'Select Residence'}
                            value={values.residence}
                            label="Residence"
                            name='residence'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.residence && touched.residence}
                        >
                            {residenceList.map(({ name }) => {
                                return <MenuItem key={name} value={name}>{name}</MenuItem>;
                            })}
                        </Select>
                    </FormControl>
                    {errors.residence && touched.residence && (
                        <Typography color='error'>
                            {errors.residence}
                        </Typography>
                    )}
                    <FormControl fullWidth>
                        <InputLabel id="event-label">Event</InputLabel>
                        <Select
                            labelId='event-label'
                            id="event"
                            fullWidth
                            defaultValue={'Select Event'}
                            value={values.event}
                            label="Event"
                            name='event'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.event && touched.event}
                        >
                            {eventsList.map(({ label }) => {
                                return <MenuItem key={label} value={label}>{label}</MenuItem>;
                            })}
                        </Select>
                    </FormControl>
                    {errors.event && touched.event && (
                        <Typography color='error'>
                            {errors.event}
                        </Typography>
                    )}
                    <Typography variant='h5'>
                        Select Players
                    </Typography>
                    {values.players.map((value, index) => {
                        return <PlayerSelectInput key={`${index}${value._id}`} index={index} selectedPlayers={values.players} playersList={playersList} setPlayers={setPlayers} />;
                    })}
                    <Button variant='outlined' onClick={addPlayer} size='large' fullWidth>
                        Add Player
                    </Button>
                    {errors.players && (
                        <Typography color='error'>
                            {errors.players}
                        </Typography>
                    )}

                    <Stack direction='row' gap={2} width='100%'>
                        <Button type="submit" size='large' variant='contained' fullWidth disabled={isPending}>
                            Create
                        </Button>
                        <Button size='large' variant='contained' fullWidth>
                            Cancel
                        </Button>
                    </Stack>
                </Stack>
            </Grid>
        </Grid>
    );
}