import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, MenuItem, FormControl, InputLabel, Select, Typography, Stack, Alert } from '@mui/material';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchMatches, updateMatch, deleteMatch, queryClient } from '../../services/http';

const EditMatchForm = ({ onClose }) => {
    const [submitError, setSubmitError] = useState(null);
    const [selectedMatchId, setSelectedMatchId] = useState('');

    const { data: matches = [] } = useQuery({
        queryKey: ['matches'],
        queryFn: () => fetchMatches(),
    });

    const selectedMatch = matches.find(m => m._id === selectedMatchId);

    const formik = useFormik({
        initialValues: {
            date: '',
            clockTime: '',
            matchType: 'League Stage',
        },
        validationSchema: Yup.object({
            date: Yup.string().required('Date is required'),
            clockTime: Yup.string().required('Time is required'),
        }),
        enableReinitialize: true,
        onSubmit: (values) => {
            if (!selectedMatchId) return;

            // Combine date and time
            const dateTimeString = `${values.date}T${values.clockTime}`;
            const finalDate = new Date(dateTimeString);

            updateMatchMutate({
                id: selectedMatchId,
                time: finalDate.toISOString(),
                matchType: values.matchType,
            });
        },
    });

    useEffect(() => {
        if (selectedMatch && selectedMatch.time) {
            const dateObj = new Date(selectedMatch.time);
            // Handling offset for local date/time extraction consistently
            // Or simply formatted as ISO YYYY-MM-DD
            const isoString = dateObj.toISOString();
            const date = isoString.split('T')[0];
            const time = isoString.split('T')[1].slice(0, 5); // HH:MM

            formik.setValues({
                date: date,
                clockTime: time,
                matchType: selectedMatch.matchType || 'League Stage',
            });
        }
    }, [selectedMatch]);

    const { mutate: updateMatchMutate, isPending: isUpdating } = useMutation({
        mutationFn: updateMatch,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['matches'] });
            onClose();
        },
        onError: (error) => {
            setSubmitError(error.response?.data?.error || 'Failed to update match');
        }
    });

    const { mutate: deleteMatchMutate, isPending: isDeleting } = useMutation({
        mutationFn: deleteMatch,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['matches'] });
            queryClient.invalidateQueries({ queryKey: ['leaderboard'] }); // In case winner points were reverted
            onClose();
        },
        onError: (error) => {
            setSubmitError(error.response?.data?.error || 'Failed to delete match');
        }
    });

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this match? If it had a winner, points will be reverted.')) {
            deleteMatchMutate(selectedMatchId);
        }
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <Stack spacing={3} sx={{ mt: 1 }}>
                {submitError && <Alert severity="error">{submitError}</Alert>}

                <FormControl fullWidth>
                    <InputLabel id="match-select-label">Select Match to Edit/Delete</InputLabel>
                    <Select
                        labelId="match-select-label"
                        value={selectedMatchId}
                        label="Select Match to Edit/Delete"
                        onChange={(e) => {
                            setSelectedMatchId(e.target.value);
                            setSubmitError(null);
                        }}
                    >
                        {matches.map((match) => (
                            <MenuItem key={match._id} value={match._id}>
                                {match.event}: {match.teams[0]?.name} vs {match.teams[1]?.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {selectedMatch && (
                    <>
                        <Typography variant="subtitle2" color="textSecondary">
                            Event: {selectedMatch.event} <br />
                            Winner: {selectedMatch.winner ? (selectedMatch.teams.find(t => t._id === selectedMatch.winner)?.name || 'Unknown') : 'Not set'}
                        </Typography>

                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel id="match-type-edit-label">Match Type</InputLabel>
                            <Select
                                labelId="match-type-edit-label"
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

                        <Stack direction="row" spacing={2}>
                            <Button
                                color="primary"
                                variant="contained"
                                fullWidth
                                type="submit"
                                disabled={isUpdating}
                            >
                                {isUpdating ? 'Updating...' : 'Update Time'}
                            </Button>
                            <Button
                                color="error"
                                variant="outlined"
                                fullWidth
                                onClick={handleDelete}
                                disabled={isDeleting}
                            >
                                {isDeleting ? 'Deleting...' : 'Delete Match'}
                            </Button>
                        </Stack>
                    </>
                )}
            </Stack>
        </form>
    );
};

export default EditMatchForm;
