import { Button, Grid, IconButton, Paper, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Tilt from 'react-parallax-tilt';

import { Link, NavLink } from 'react-router-dom';
import residenceList from '../../data/residence'


function ResidenceCard({ to, label = '', residence, image, ...other }) {

    const route = label.replaceAll(' ', '')

    return (
        <Grid item w='16rem' h='20rem'>
            <NavLink to={to || `./${route}`} style={{ textDecoration: 'none' }} {...other} >
                {({ isActive }) => {
                    return (
                        <Tilt
                            scale={1.15}
                            tiltReverse={true}
                            perspective={500}
                            glareEnable={true}
                            glareMaxOpacity={0.45}
                            glareBorderRadius='1rem'
                            className='parallax-effect'
                            style={{
                                width: '16rem',
                                height: '20rem',
                                borderRadius: '0.8rem',
                                backgroundImage: `url(${image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                cursor: 'pointer',
                                border: isActive ? 'solid red' : 'none',
                                borderColor: 'red',
                            }}
                        >
                            <Typography
                                variant='h3'
                                className='inner-element'
                                fontWeight={700}
                                textAlign='center'
                                sx={{ textShadow: '0px 2px 0 #000' }}
                            >
                                {residence}
                            </Typography>
                        </Tilt >
                    )
                }}
            </NavLink >
        </Grid>
    )
}


function ResidenceSection() {

    return (
        <Grid container spacing={4} sx={{ mt: 2, justifyContent: 'center' }}>
            {residenceList.map(({ name, image }) => {
                return <ResidenceCard key={name} label={name} residence={name} image={image} />
            })}
        </Grid>
    )
}

export default ResidenceSection