import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Stack, Grid, Typography, Paper, Avatar, Snackbar, Alert, MenuItem, Select, InputLabel, FormControl, useTheme, Button, IconButton } from '@mui/material'
import TextField from "@mui/material/TextField";
import { useFormik } from 'formik'
import axios from '../../services/axiosinstance';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';

import residenceList from '../../data/residence'
import eventsList from '../../data/events'

import { matchSchema } from '../../schemas/match'

import { useMutation, useQuery } from '@tanstack/react-query';

import TeamSelectInput from '../../components/TeamSelectInput'
import { winnerSchema } from '../../schemas/winner';
import { queryClient } from '../../services/http';

export default function Winners() {

    const initialValues = {
        category: '',
        event: '',
        team: '',
        rank: '',
    }

    const navigate = useNavigate()

    const { mutate, isPending, isError } = useMutation({
        mutationFn: (body) => axios.post('/winner', body).then(response => response.data),
        onSuccess: () => {
            queryClient.invalidateQueries(['winners'])
            // resetForm({})
        }
    })

    const { values, handleBlur, handleChange, handleSubmit, errors, touched, setFieldValue, resetForm } =
        useFormik({
            initialValues,
            validationSchema: winnerSchema,
            validateOnChange: true,
            validateOnBlur: false,
            //// By disabling validation onChange and onBlur formik will validate on submit.
            onSubmit: async (values, action) => {
                mutate(values)
            },
        });

    const { data: teamsList = [] } = useQuery({
        queryKey: ['teams', values?.event],
        queryFn: () => axios.get('/team', { params: { event: values?.event } }).then(response => response.data),
        // enabled: values?.event
    })

    useEffect(() => {
        setFieldValue('team', '')
    }, [values?.event])

    const setTeams = (newTeamsList) => {
        console.log(newTeamsList)
        setFieldValue('team', newTeamsList?.[0])
    }

    const filteredTeamList = teamsList.filter(({ residence }) => {
        const residenceData = residenceList.find(({ name }) => name == residence)
        return residenceData.category?.toLowerCase() === values?.category?.toLowerCase()
    }
    )

    // const eventData = eventsList.find(({ label }) => label === values.event)

    return (
        <Stack p={4} mt={8} mb={6} component="form" onSubmit={handleSubmit} gap={3} px={2} sx={{ alignItems: 'center', justifyContent: 'center' }} >
            <Typography variant='h2' fontWeight={700} sx={{ opacity: 0.6 }} >
                Create Winner
            </Typography>
            <Stack gap={2} sx={{ width: { xs: '100%', md: '50%', alignItems: 'center', justifyContent: 'center' } }}>
                <FormControl fullWidth sx={{ maxWidth: '500px' }}>
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
                            return <MenuItem key={label} value={label}>{label}</MenuItem>
                        })}
                    </Select>
                </FormControl>
                {errors.event && touched.event && (
                    <Typography color='error'>
                        {errors.event}
                    </Typography>
                )}
                <FormControl fullWidth sx={{ maxWidth: '500px' }}>
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                        labelId='category-label'
                        id="category"
                        fullWidth
                        value={values.category}
                        label="Category"
                        name='category'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.category && touched.category}
                    >
                        {['Men', 'Women'].map((categoryName) => {
                            return <MenuItem key={categoryName} value={categoryName}>{categoryName}</MenuItem>
                        })}
                    </Select>
                </FormControl>
                {errors.category && touched.category && (
                    <Typography color='error'>
                        {errors.category}
                    </Typography>
                )}
                <TeamSelectInput index={0} selectedTeams={[values.team || '']} teamsList={filteredTeamList} setTeams={setTeams} />
                {errors.team && touched.team && (
                    <Typography color='error'>
                        {errors.team}
                    </Typography>
                )}
                <TextField
                    margin="normal"
                    type={'number'}
                    required
                    fullWidth
                    id="rank"
                    label="Rank"
                    name="rank"
                    value={values.rank}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.rank && touched.rank}
                    autoFocus
                />
                {errors.rank && touched.rank && (
                    <Typography color='error'>
                        {errors.rank}
                    </Typography>
                )}
            </Stack>
            <Stack direction='row' gap={2} width={{ xs: '100%', md: '50%' }}>
                <Button fullWidth type="submit" size='large' variant='contained' disabled={isPending}>
                    {isPending ? 'Creating...' : 'Create'}
                </Button>
                <Button fullWidth size='large' variant='contained' onClick={() => navigate('/')}>
                    Cancel
                </Button>
            </Stack>
        </ Stack>
    )
}
