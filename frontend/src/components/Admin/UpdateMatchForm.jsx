import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, MenuItem, FormControl, InputLabel, Select, Typography, Stack, Alert } from '@mui/material';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchMatches, updateMatch, queryClient } from '../../services/http';

const UpdateMatchForm = ({ onClose }) => {
    const [submitError, setSubmitError] = useState(null);
    const [selectedMatchId, setSelectedMatchId] = useState('');
    const [selectedSport, setSelectedSport] = useState('All');

    const { data: matches = [] } = useQuery({
        queryKey: ['matches'],
        queryFn: () => fetchMatches(),
    });

    // Extract unique sports from matches
    const sports = ['All', ...new Set(matches.map(m => m.event))];

    // Filter matches based on selected sport
    const filteredMatches = selectedSport === 'All'
        ? matches
        : matches.filter(m => m.event === selectedSport);

    const selectedMatch = matches.find(m => m._id === selectedMatchId);

    // Helper to format date
    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formik = useFormik({
        initialValues: {
            winner: '',
        },
        validationSchema: Yup.object({
            winner: Yup.string().required('Winner is required'),
        }),
        enableReinitialize: true,
        onSubmit: (values) => {
            if (!selectedMatchId) return;
            mutate({
                id: selectedMatchId,
                winner: values.winner,
            });
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: updateMatch,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['matches'] });
            queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
            onClose();
        },
        onError: (error) => {
            setSubmitError(error.response?.data?.error || 'Failed to update match');
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Stack spacing={3} sx={{ mt: 1 }}>
                {submitError && <Alert severity="error">{submitError}</Alert>}

                <FormControl fullWidth>
                    <InputLabel id="sport-select-label">Filter by Sport</InputLabel>
                    <Select
                        labelId="sport-select-label"
                        value={selectedSport}
                        label="Filter by Sport"
                        onChange={(e) => {
                            setSelectedSport(e.target.value);
                            setSelectedMatchId(''); // Reset selected match when sport changes
                            formik.setFieldValue('winner', '');
                        }}
                    >
                        {sports.map((sport) => (
                            <MenuItem key={sport} value={sport}>
                                {sport}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel id="match-select-label">Select Match</InputLabel>
                    <Select
                        labelId="match-select-label"
                        value={selectedMatchId}
                        label="Select Match"
                        onChange={(e) => {
                            setSelectedMatchId(e.target.value);
                            formik.setFieldValue('winner', '');
                        }}
                        disabled={filteredMatches.length === 0}
                    >
                        {filteredMatches.map((match) => (
                            <MenuItem key={match._id} value={match._id}>
                                {match.event} - {match.teams[0]?.name} vs {match.teams[1]?.name} ({match.matchType}, {formatDate(match.time)})
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {selectedMatch && (
                    <FormControl fullWidth error={formik.touched.winner && Boolean(formik.errors.winner)}>
                        <InputLabel id="winner-label">Winner</InputLabel>
                        <Select
                            labelId="winner-label"
                            id="winner"
                            name="winner"
                            value={formik.values.winner}
                            label="Winner"
                            onChange={formik.handleChange}
                        >
                            {selectedMatch.teams.map((team) => (
                                <MenuItem key={team._id} value={team._id}>
                                    {team.name} ({team.residence})
                                </MenuItem>
                            ))}
                        </Select>
                        {formik.touched.winner && formik.errors.winner && (
                            <Typography variant="caption" color="error">{formik.errors.winner}</Typography>
                        )}
                    </FormControl>
                )}

                <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
                    disabled={isPending || !selectedMatchId}
                >
                    {isPending ? 'Updating...' : 'Set Winner'}
                </Button>
            </Stack>
        </form>
    );
};

export default UpdateMatchForm;
