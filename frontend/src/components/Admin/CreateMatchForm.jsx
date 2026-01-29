import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, MenuItem, FormControl, InputLabel, Select, Typography, Stack, Alert } from '@mui/material';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchTeams, createMatch, queryClient } from '../../services/http';
import eventsList from '../../data/events';

const CreateMatchForm = ({ onClose }) => {
    const [submitError, setSubmitError] = useState(null);

    const formik = useFormik({
        initialValues: {
            event: '',
            team1: '',
            team2: '',
            date: '',
            clockTime: '',
            matchType: 'League Stage',
        },
        validationSchema: Yup.object({
            event: Yup.string().required('Event is required'),
            team1: Yup.string().required('Team 1 is required'),
            team2: Yup.string().required('Team 2 is required')
                .notOneOf([Yup.ref('team1')], 'Teams must be different'),
            date: Yup.string().required('Date is required'),
            clockTime: Yup.string().required('Time is required'),
        }),
        onSubmit: (values) => {
            // Combine date and time
            const dateTimeString = `${values.date}T${values.clockTime}`; // e.g., "2026-02-05T14:30"
            const finalDate = new Date(dateTimeString);

            mutate({
                event: values.event,
                teams: [values.team1, values.team2],
                time: finalDate.toISOString(),
                matchType: values.matchType,
            });
        },
    });

    const { data: teams = [] } = useQuery({
        queryKey: ['teams', { event: formik.values.event }],
        queryFn: () => fetchTeams({ event: formik.values.event }),
        enabled: !!formik.values.event,
    });

    const { mutate, isPending } = useMutation({
        mutationFn: createMatch,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['matches'] });
            onClose();
        },
        onError: (error) => {
            setSubmitError(error.response?.data?.error || 'Failed to create match');
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Stack spacing={3} sx={{ mt: 1 }}>
                {submitError && <Alert severity="error">{submitError}</Alert>}

                <FormControl fullWidth error={formik.touched.event && Boolean(formik.errors.event)}>
                    <InputLabel id="event-label">Event</InputLabel>
                    <Select
                        labelId="event-label"
                        id="event"
                        name="event"
                        value={formik.values.event}
                        label="Event"
                        onChange={(e) => {
                            formik.handleChange(e);
                            formik.setFieldValue('team1', '');
                            formik.setFieldValue('team2', '');
                        }}
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

                <FormControl fullWidth error={formik.touched.team1 && Boolean(formik.errors.team1)}>
                    <InputLabel id="team1-label">Team 1</InputLabel>
                    <Select
                        labelId="team1-label"
                        id="team1"
                        name="team1"
                        value={formik.values.team1}
                        label="Team 1"
                        onChange={formik.handleChange}
                        disabled={!formik.values.event}
                    >
                        {teams.map((team) => (
                            <MenuItem key={team._id} value={team._id}>
                                {team.name} ({team.residence})
                            </MenuItem>
                        ))}
                    </Select>
                    {formik.touched.team1 && formik.errors.team1 && (
                        <Typography variant="caption" color="error">{formik.errors.team1}</Typography>
                    )}
                </FormControl>

                <FormControl fullWidth error={formik.touched.team2 && Boolean(formik.errors.team2)}>
                    <InputLabel id="team2-label">Team 2</InputLabel>
                    <Select
                        labelId="team2-label"
                        id="team2"
                        name="team2"
                        value={formik.values.team2}
                        label="Team 2"
                        onChange={formik.handleChange}
                        disabled={!formik.values.event}
                    >
                        {teams.map((team) => (
                            <MenuItem key={team._id} value={team._id}>
                                {team.name} ({team.residence})
                            </MenuItem>
                        ))}
                    </Select>
                    {formik.touched.team2 && formik.errors.team2 && (
                        <Typography variant="caption" color="error">{formik.errors.team2}</Typography>
                    )}
                </FormControl>

                <Stack direction="row" spacing={2}>
                    <FormControl fullWidth error={formik.touched.date && Boolean(formik.errors.date)}>
                        <InputLabel id="date-label">Date</InputLabel>
                        <Select
                            labelId="date-label"
                            id="date"
                            name="date"
                            value={formik.values.date}
                            label="Date"
                            onChange={formik.handleChange}
                        >
                            <MenuItem value="2026-02-05">5th Feb 2026</MenuItem>
                            <MenuItem value="2026-02-06">6th Feb 2026</MenuItem>
                            <MenuItem value="2026-02-07">7th Feb 2026</MenuItem>
                            <MenuItem value="2026-02-08">8th Feb 2026</MenuItem>
                        </Select>
                        {formik.touched.date && formik.errors.date && (
                            <Typography variant="caption" color="error">{formik.errors.date}</Typography>
                        )}
                    </FormControl>

                    <TextField
                        fullWidth
                        id="clockTime"
                        name="clockTime"
                        label="Time"
                        type="time"
                        InputLabelProps={{ shrink: true }}
                        value={formik.values.clockTime}
                        onChange={formik.handleChange}
                        error={formik.touched.clockTime && Boolean(formik.errors.clockTime)}
                        helperText={formik.touched.clockTime && formik.errors.clockTime}
                    />
                </Stack>

                <FormControl fullWidth>
                    <InputLabel id="match-type-label">Match Type</InputLabel>
                    <Select
                        labelId="match-type-label"
                        id="matchType"
                        name="matchType"
                        value={formik.values.matchType}
                        label="Match Type"
                        onChange={formik.handleChange}
                    >
                        <MenuItem value="League Stage">League Stage</MenuItem>
                        <MenuItem value="Knockout">Knockout</MenuItem>
                        <MenuItem value="Semi Final">Semi Final</MenuItem>
                        <MenuItem value="Final">Final</MenuItem>
                    </Select>
                </FormControl>


                <Button color="primary" variant="contained" fullWidth type="submit" disabled={isPending}>
                    {isPending ? 'Scheduling...' : 'Schedule Match'}
                </Button>
            </Stack>
        </form>
    );
};

export default CreateMatchForm;
