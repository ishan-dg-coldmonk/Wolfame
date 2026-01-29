import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, MenuItem, FormControl, InputLabel, Select, Typography, Stack, Autocomplete, Alert } from '@mui/material';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchUsers, createTeam, queryClient } from '../../services/http';
import residenceList from '../../data/residence';
import eventsList from '../../data/events';

const CreateTeamForm = ({ onClose }) => {
    const [submitError, setSubmitError] = useState(null);

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
            players: Yup.array().min(1, 'At least one player is required'),
        }),
        onSubmit: (values) => {
            mutate(values);
        },
    });

    const { data: users = [] } = useQuery({
        queryKey: ['users', formik.values.residence],
        queryFn: () => fetchUsers({ residence: formik.values.residence }),
        enabled: !!formik.values.residence,
    });

    const { mutate, isPending } = useMutation({
        mutationFn: createTeam,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['teams'] });
            onClose();
        },
        onError: (error) => {
            setSubmitError(error.response?.data?.error || 'Failed to create team');
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Stack spacing={3} sx={{ mt: 1 }}>
                {submitError && <Alert severity="error">{submitError}</Alert>}

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

                <Autocomplete
                    multiple
                    id="players"
                    options={users}
                    getOptionLabel={(option) => `${option.name} (${option.phone_number})`}
                    value={formik.values.players}
                    onChange={(event, newValue) => {
                        formik.setFieldValue('players', newValue);
                    }}
                    isOptionEqualToValue={(option, value) => option._id === value._id}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Players"
                            placeholder="Select players"
                            error={formik.touched.players && Boolean(formik.errors.players)}
                            helperText={formik.touched.players && formik.errors.players}
                        />
                    )}
                    disabled={!formik.values.residence}
                />
                {!formik.values.residence && <Typography variant="caption" color="text.secondary">Select residence to see players</Typography>}


                <Button color="error" variant="contained" fullWidth type="submit" disabled={isPending}>
                    {isPending ? 'Creating...' : 'Create Team'}
                </Button>
            </Stack>
        </form>
    );
};

export default CreateTeamForm;
