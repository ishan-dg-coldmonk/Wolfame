import React, { useContext, useState } from 'react';
import { Box, Button, Container, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import { AuthContext } from '../../context/AuthProvider';
import { Navigate } from 'react-router-dom';
import CreateTeamForm from '../../components/Admin/CreateTeamForm';
import CreateMatchForm from '../../components/Admin/CreateMatchForm';
import UpdateMatchForm from '../../components/Admin/UpdateMatchForm';
import EditTeamForm from '../../components/Admin/EditTeamForm';
import EditMatchForm from '../../components/Admin/EditMatchForm';
import UpdateTeamPointsForm from '../../components/Admin/UpdateTeamPointsForm';
import DefaultHeader from '../../UI/DefaultHeader';
import bgImage from '../../assets/teams-page/hero-bg.webp';

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const [openTeamModal, setOpenTeamModal] = useState(false);
    const [openMatchModal, setOpenMatchModal] = useState(false);
    const [openUpdateMatchModal, setOpenUpdateMatchModal] = useState(false);
    const [openEditTeamModal, setOpenEditTeamModal] = useState(false);
    const [openEditMatchModal, setOpenEditMatchModal] = useState(false);
    const [openUpdatePointsModal, setOpenUpdatePointsModal] = useState(false);

    if (user?.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return (
        <Box>
            <DefaultHeader title="Admin Dashboard" image={bgImage} height="50vh" subtitle="Manage Teams and Matches" showArrow={false} />
            <Container sx={{ mt: 15, display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                <Typography variant="h4" gutterBottom>Admin Actions</Typography>

                <Button
                    variant="contained"
                    color="error"
                    size="large"
                    onClick={() => setOpenTeamModal(true)}
                    sx={{ width: '300px', p: 2 }}
                >
                    Create a Team
                </Button>

                <Button
                    variant="contained"
                    color="success"
                    size="large"
                    onClick={() => setOpenUpdatePointsModal(true)}
                    sx={{ width: '300px', p: 2 }}
                >
                    Update Team Points
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => setOpenMatchModal(true)}
                    sx={{ width: '300px', p: 2 }}
                >
                    Schedule a Match
                </Button>

                <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={() => setOpenUpdateMatchModal(true)}
                    sx={{ width: '300px', p: 2 }}
                >
                    Update Match Winner
                </Button>

                <Button
                    variant="contained"
                    color="warning"
                    size="large"
                    onClick={() => setOpenEditTeamModal(true)}
                    sx={{ width: '300px', p: 2 }}
                >
                    Edit / Delete Team
                </Button>

                <Button
                    variant="contained"
                    color="warning" // Or another color
                    size="large"
                    onClick={() => setOpenEditMatchModal(true)}
                    sx={{ width: '300px', p: 2 }}
                >
                    Edit / Delete Match
                </Button>

                <Dialog open={openTeamModal} onClose={() => setOpenTeamModal(false)} maxWidth="sm" fullWidth>
                    <DialogTitle>Create a New Team</DialogTitle>
                    <DialogContent>
                        <CreateTeamForm onClose={() => setOpenTeamModal(false)} />
                    </DialogContent>
                </Dialog>

                <Dialog open={openUpdatePointsModal} onClose={() => setOpenUpdatePointsModal(false)} maxWidth="sm" fullWidth>
                    <DialogTitle>Update Team Points</DialogTitle>
                    <DialogContent>
                        <UpdateTeamPointsForm onClose={() => setOpenUpdatePointsModal(false)} />
                    </DialogContent>
                </Dialog>

                <Dialog open={openMatchModal} onClose={() => setOpenMatchModal(false)} maxWidth="sm" fullWidth>
                    <DialogTitle>Schedule a Match</DialogTitle>
                    <DialogContent>
                        <CreateMatchForm onClose={() => setOpenMatchModal(false)} />
                    </DialogContent>
                </Dialog>

                <Dialog open={openEditTeamModal} onClose={() => setOpenEditTeamModal(false)} maxWidth="sm" fullWidth>
                    <DialogTitle>Edit or Delete Team</DialogTitle>
                    <DialogContent>
                        <EditTeamForm onClose={() => setOpenEditTeamModal(false)} />
                    </DialogContent>
                </Dialog>

                <Dialog open={openUpdateMatchModal} onClose={() => setOpenUpdateMatchModal(false)} maxWidth="sm" fullWidth>
                    <DialogTitle>Update Match Result</DialogTitle>
                    <DialogContent>
                        <UpdateMatchForm onClose={() => setOpenUpdateMatchModal(false)} />
                    </DialogContent>
                </Dialog>

                <Dialog open={openEditMatchModal} onClose={() => setOpenEditMatchModal(false)} maxWidth="sm" fullWidth>
                    <DialogTitle>Edit or Delete Match</DialogTitle>
                    <DialogContent>
                        <EditMatchForm onClose={() => setOpenEditMatchModal(false)} />
                    </DialogContent>
                </Dialog>
            </Container>
        </Box>
    );
};

export default AdminDashboard;
