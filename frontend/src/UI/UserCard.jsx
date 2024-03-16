import { Grid, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import Tilt from 'react-parallax-tilt';

import PhoneIcon from '@mui/icons-material/Phone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

import { Link } from 'react-router-dom';
import ProfileImage from './ProfileImage';

export default function UserCard({ user, hide = {} }) {

    const userPathName = encodeURIComponent(user.name) 

    return (
        <Grid item>
            <Tilt
                scale={1.15}
                tiltReverse={true}
                perspective={500}
                glareEnable={true}
                glareMaxOpacity={0.45}
                glareBorderRadius='1rem'
                className='parallax-effect'
                style={{
                    // height: '15rem',
                    width: '12rem',
                    borderRadius: '1rem',
                    backgroundColor: 'rgba(60, 60, 60, 0.2)',
                    // backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    cursor: 'pointer',
                    padding: '0.5rem',
                    boxSizing: 'border-box'
                }}
            >
                <Link to={`/users/${userPathName}`}>
                    <ProfileImage image={user.image} />
                </Link>

                <Stack
                    className='inner-element'
                    p={2}
                    gap={1}
                    alignItems='center'
                >
                    <Link to={`/users/${userPathName}`} style={{textDecoration: 'none'}}>
                        <Typography
                            variant='h5'
                            fontWeight={700}
                            textAlign='center'
                            sx={{ textShadow: '0px 2px 0 #000' }}
                        >
                            {user.name}
                        </Typography>
                    </Link>
                    {!hide.phone_number && user.phone_number && <Stack direction='row' gap={1} sx={{ opacity: 0.7 }}>
                        <PhoneIcon sx={{ color: 'white' }} />
                        <Link to={`tel:${user.phone_number}`} target='_blank' style={{ textDecoration: 'none' }}>
                            <Typography
                                variant='body1'
                                fontWeight={700}
                                textAlign='center'
                                sx={{ textShadow: '0px 2px 0 #000' }}
                            >
                                {user.phone_number || '----------'}
                            </Typography>
                        </Link>
                    </Stack>}
                    <Stack direction='row' gap={1} sx={{}}>
                        {!hide.linkedin && user?.linkedin && <Link to={user.linkedin} target='_blank' style={{ textDecoration: 'none' }}>
                            <LinkedInIcon fontSize='large' sx={{ color: 'white', ":hover": { color: 'red' } }} />
                        </Link>}
                        {!hide.email && user?.email && <Link to={`mailto:${user.email}`} target='_blank' style={{ textDecoration: 'none' }}>
                            <EmailIcon fontSize='large' sx={{ color: 'white', ":hover": { color: 'red' } }} />
                        </Link>}
                    </Stack>
                </Stack>
            </Tilt >
        </Grid>
    )
}
