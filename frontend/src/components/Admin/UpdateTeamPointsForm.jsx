import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchTeams, updateTeam, queryClient } from '../../services/http';
import { FormControl, InputLabel, Select, MenuItem, TextField, Button, Stack, Typography, Alert, Box } from '@mui/material';
import eventsList from '../../data/events';

const UpdateTeamPointsForm = ({ onClose }) => {
    const [selectedEvent, setSelectedEvent] = useState('');
    const [pointsData, setPointsData] = useState({}); // { teamId: points }
    const [submitError, setSubmitError] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    const { data: teams = [], isFetching } = useQuery({
        queryKey: ['teams', { event: selectedEvent }],
        queryFn: () => fetchTeams({ event: selectedEvent }),
        enabled: !!selectedEvent,
    });

    // Initialize points data when teams are fetched
    React.useEffect(() => {
        if (teams.length > 0) {
            const initialPoints = {};
            teams.forEach(team => {
                initialPoints[team._id] = team.points || 0;
            });
            setPointsData(initialPoints);
        }
    }, [teams]);

    const handlePointChange = (teamId, val) => {
        setPointsData(prev => ({
            ...prev,
            [teamId]: val
        }));
    };

    const { mutate, isPending } = useMutation({
        mutationFn: ({ id, points }) => updateTeam({ id, points }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['teams'] });
            queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
            queryClient.invalidateQueries({ queryKey: ['winners'] }); // Since winners come from teams now
            setSuccessMsg('Points updated successfully');
            setTimeout(() => setSuccessMsg(null), 3000);
        },
        onError: (error) => {
            setSubmitError('Failed to update points');
        }
    });

    const handleUpdate = (teamId) => {
        setSubmitError(null);
        setSuccessMsg(null);
        mutate({ id: teamId, points: pointsData[teamId] });
    };

    return (
        <Stack spacing={3} sx={{ mt: 1 }}>
            {submitError && <Alert severity="error">{submitError}</Alert>}
            {successMsg && <Alert severity="success">{successMsg}</Alert>}

            <FormControl fullWidth>
                <InputLabel id="event-select-label">Select Event</InputLabel>
                <Select
                    labelId="event-select-label"
                    value={selectedEvent}
                    label="Select Event"
                    onChange={(e) => setSelectedEvent(e.target.value)}
                >
                    {eventsList.map((ev) => (
                        <MenuItem key={ev.event} value={ev.event}>
                            {ev.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {selectedEvent && teams.length === 0 && !isFetching && (
                <Typography>No teams found for this event.</Typography>
            )}

            {selectedEvent && teams.map((team) => (
                <Stack key={team._id} direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1" fontWeight="bold">{team.name}</Typography>
                        <Typography variant="caption" color="textSecondary">{team.residence}</Typography>
                    </Box>
                    <TextField
                        type="number"
                        label="Points"
                        size="small"
                        sx={{ width: '100px' }}
                        value={pointsData[team._id] ?? ''}
                        onChange={(e) => handlePointChange(team._id, e.target.value)}
                    />
                    <Button
                        variant="contained"
                        size="small"
                        disabled={isPending}
                        onClick={() => handleUpdate(team._id)}
                    >
                        Update
                    </Button>
                </Stack>
            ))}

            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={onClose}>Close</Button>
            </Box>
        </Stack>
    );
};

export default UpdateTeamPointsForm;
