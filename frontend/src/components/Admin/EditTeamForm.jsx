import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, MenuItem, FormControl, InputLabel, Select, Typography, Stack, Alert, Box } from '@mui/material';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchTeams, fetchUsers, updateTeam, deleteTeam, queryClient } from '../../services/http';
import residenceList from '../../data/residence';
import eventsList from '../../data/events';

const EditTeamForm = ({ onClose }) => {
    const [submitError, setSubmitError] = useState(null);
    const [selectedTeamId, setSelectedTeamId] = useState('');

    const { data: teams = [] } = useQuery({
        queryKey: ['teams'],
        queryFn: () => fetchTeams(),
    });

    const selectedTeam = teams.find(t => t._id === selectedTeamId);

    const { data: players = [] } = useQuery({
        queryKey: ['users', { residence: selectedTeam?.residence }],
        queryFn: ({ queryKey }) => fetchUsers({ residence: queryKey[1].residence }),
        enabled: !!selectedTeam?.residence,
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            residence: '',
            event: '',
            players: [],
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Team Name is required'),
            residence: Yup.string().required('Residence is required'),
            event: Yup.string().required('Event is required'),
            players: Yup.array().min(1, 'At least one player is required').required('Players are required'),
        }),
        enableReinitialize: true,
        onSubmit: (values) => {
            if (!selectedTeamId) return;
            updateTeamMutate({
                id: selectedTeamId,
                ...values,
                players: values.players.map(p => p._id || p), // Handle existing objects vs new IDs
            });
        },
    });

    // Populate form when team is selected
    useEffect(() => {
        if (selectedTeam) {
            formik.setValues({
                name: selectedTeam.name,
                residence: selectedTeam.residence,
                event: selectedTeam.event,
                players: selectedTeam.players,
            });
        }
    }, [selectedTeam]);

    const { mutate: updateTeamMutate, isPending: isUpdating } = useMutation({
        mutationFn: updateTeam,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['teams'] });
            onClose();
        },
        onError: (error) => {
            setSubmitError(error.response?.data?.error || 'Failed to update team');
        }
    });

    const { mutate: deleteTeamMutate, isPending: isDeleting } = useMutation({
        mutationFn: deleteTeam,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['teams'] });
            onClose();
        },
        onError: (error) => {
            setSubmitError(error.response?.data?.error || 'Failed to delete team');
        }
    });

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this team?')) {
            deleteTeamMutate(selectedTeamId);
        }
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <Stack spacing={3} sx={{ mt: 1 }}>
                {submitError && <Alert severity="error">{submitError}</Alert>}

                <FormControl fullWidth>
                    <InputLabel id="team-select-label">Select Team to Edit</InputLabel>
                    <Select
                        labelId="team-select-label"
                        value={selectedTeamId}
                        label="Select Team to Edit"
                        onChange={(e) => {
                            setSelectedTeamId(e.target.value);
                            setSubmitError(null);
                        }}
                    >
                        {teams.map((team) => (
                            <MenuItem key={team._id} value={team._id}>
                                {team.name} ({team.residence} - {team.event})
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {selectedTeam && (
                    <>
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="Team Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />

                        <FormControl fullWidth error={formik.touched.residence && Boolean(formik.errors.residence)}>
                            <InputLabel id="residence-label">Residence</InputLabel>
                            <Select
                                labelId="residence-label"
                                id="residence"
                                name="residence"
                                value={formik.values.residence}
                                label="Residence"
                                onChange={(e) => {
                                    formik.handleChange(e);
                                    formik.setFieldValue('players', []); // Reset players on residence change
                                }}
                            >
                                {residenceList.map((res) => (
                                    <MenuItem key={res.name} value={res.name}>
                                        {res.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            {formik.touched.residence && formik.errors.residence && (
                                <Typography variant="caption" color="error">{formik.errors.residence}</Typography>
                            )}
                        </FormControl>

                        <FormControl fullWidth error={formik.touched.event && Boolean(formik.errors.event)}>
                            <InputLabel id="event-label">Event</InputLabel>
                            <Select
                                labelId="event-label"
                                id="event"
                                name="event"
                                value={formik.values.event}
                                label="Event"
                                onChange={formik.handleChange}
                            >
                                {eventsList.map((ev) => (
                                    <MenuItem key={ev.event} value={ev.event}>
                                        {ev.label}
                                    </MenuItem>
                                ))}
                            </Select>
                            {formik.touched.event && formik.errors.event && (
                                <Typography variant="caption" color="error">{formik.errors.event}</Typography>
                            )}
                        </FormControl>

                        <FormControl fullWidth error={formik.touched.players && Boolean(formik.errors.players)}>
                            <InputLabel id="players-label">Players</InputLabel>
                            <Select
                                labelId="players-label"
                                id="players"
                                name="players"
                                multiple
                                value={formik.values.players}
                                label="Players"
                                onChange={(e) => {
                                    const value = e.target.value;
                                    // Ensure we're storing complete objects if possible or just IDs? 
                                    // The select returns whatever is in 'value'. 
                                    // Let's rely on Mui behaviour, it usually returns array of values.
                                    formik.setFieldValue('players', value);
                                }}
                                renderValue={(selected) => selected.map(p => p.name || players.find(u => u._id === p)?.name).join(', ')}
                            >
                                {players.map((player) => (
                                    <MenuItem key={player._id} value={player}>
                                        {player.name} ({player.email})
                                    </MenuItem>
                                ))}
                            </Select>
                            {formik.touched.players && formik.errors.players && (
                                <Typography variant="caption" color="error">{formik.errors.players}</Typography>
                            )}
                        </FormControl>

                        <Stack direction="row" spacing={2}>
                            <Button
                                color="primary"
                                variant="contained"
                                fullWidth
                                type="submit"
                                disabled={isUpdating}
                            >
                                {isUpdating ? 'Updating...' : 'Update Team'}
                            </Button>
                            <Button
                                color="error"
                                variant="outlined"
                                fullWidth
                                onClick={handleDelete}
                                disabled={isDeleting}
                            >
                                {isDeleting ? 'Deleting...' : 'Delete Team'}
                            </Button>
                        </Stack>
                    </>
                )}
            </Stack>
        </form>
    );
};

export default EditTeamForm;
