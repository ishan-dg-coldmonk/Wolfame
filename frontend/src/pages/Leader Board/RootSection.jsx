import React, { Fragment } from 'react'
import { Button, Grid, Paper, Stack, Typography, useTheme } from '@mui/material'

import HeroSection from './HeroSection';

import trophyPhoto from '../../assets/boards-page/hero-bg.jpg'
import registration from '../../data/registration';
import PointsTable from './PointsTable';


function RootSection() {

    return (
        <Fragment>
            <Grid item xs={12} md={6} order={2}>
                <HeroSection name='Leader Board' image={trophyPhoto} rules={registration.rules} title={'Registration Rules'}>
                    <Button variant='contained' size='large' >
                        <Typography variant='h5' fontWeight={700}  >
                            Register Now
                        </Typography>
                    </Button>
                </HeroSection>
            </Grid>
            <Grid item xs={12} md={6} order={3}>
                <Stack direction='row' gap={1} alignItems='flex-end'>
                    <Typography variant='h3' fontWeight={700} sx={{ opacity: 0.6 }} >
                        All Events
                    </Typography>
                    <Button sx={{ ml: 'auto', mr: { md: 2 }, }}>
                        <Typography variant='h5' fontWeight={700} sx={{ opacity: 0.6, color: 'red' }} >
                            Points
                        </Typography>
                    </Button>
                </Stack>
                <PointsTable />
            </Grid>
        </Fragment>
    )
}

export default RootSection