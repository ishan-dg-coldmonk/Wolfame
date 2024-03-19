import React, { Fragment, useEffect, useState } from 'react'
import { Button, Grid, List, ListItem, Paper, Stack, Typography } from '@mui/material'
import Mirror from '../UI/Mirror'
import Tilt from 'react-parallax-tilt'
import { Link } from 'react-router-dom';
import PhoneIcon from '@mui/icons-material/Phone';
import eventsList from '../data/events'
import registration from '../data/registration'
import { useNavigate } from 'react-router'

function CoordinatorBlock({ coordinators = [], disableButton }) {
    return (
        <Stack>
            <Tilt
                tiltEnable={false}
                glareEnable={true}
                glareMaxOpacity={0.3}
                glareColor="white"
                glarePosition="all"
                glareBorderRadius="10px"
            >
                <Mirror elevation={3} sx={{ height: 1, p: 2, borderRadius: '10px', boxSizing: 'border-box' }}>
                    <Stack gap={4} sx={{ alignItems: 'center', height: 1 }}>
                        <Typography variant='h2' fontWeight={700} sx={{ opacity: 0.7 }} >
                            Coordinator
                        </Typography>
                        <Stack direction='row' overflow='auto' gap={4} sx={{ flexGrow: 1, flexShrink: 1, flexBasis: 'auto', p: 1 }}>
                            {coordinators?.map(({ name, contact }) => {
                                return (
                                    <Stack gap={1} sx={{ alignItems: 'center' }}>
                                        <Typography variant='h4' fontWeight={500} sx={{ opacity: 0.8, color: 'inherit' }} >
                                            {name}
                                        </Typography>
                                        <Stack direction='row' gap={1} sx={{ opacity: 0.7 }}>
                                            <PhoneIcon sx={{ color: 'white' }} />
                                            <Link to={`tel:${contact}`} target='_blank' style={{ textDecoration: 'none' }}>
                                                <Typography
                                                    variant='h5'
                                                    fontWeight={700}
                                                    textAlign='center'
                                                    sx={{ textShadow: '0px 2px 0 #000' }}
                                                >
                                                    {contact}
                                                </Typography>
                                            </Link>
                                        </Stack>
                                    </Stack>
                                )
                            })}
                        </Stack>
                    </Stack>
                </Mirror>
            </ Tilt>
        </Stack>
    )
}

function PointsCard({ points = [] }) {

    const navigate = useNavigate()

    return (
        <Fragment>
            <Tilt
                tiltEnable={false}
                glareEnable={true}
                glareMaxOpacity={0.3}
                glareColor="white"
                glarePosition="all"
                glareBorderRadius="10px"
                style={{ width: '200px' }}
            >
                <Mirror elevation={3} sx={{ p: 2, borderRadius: '10px', boxSizing: 'border-box', alignItems: 'center' }}>
                    <Stack sx={{ alignItems: 'center' }}>
                        <Typography variant='h2' fontWeight={700} sx={{ opacity: 0.7 }} >
                            {'Points'}
                        </Typography>
                        <List >
                            {points.map((point, index) => {
                                return (
                                    <ListItem sx={{ justifyContent: 'space-between', width: '10rem' }}>
                                        <Typography variant='h5' sx={{ opacity: 0.9 }}>
                                            {`${['1st', '2nd', '3rd'][index]}`}
                                        </Typography>
                                        <Typography variant='h5' sx={{ opacity: 0.9 }}>
                                            {`${point} pts`}
                                        </Typography>
                                    </ListItem>)
                            })}
                        </List>
                    </Stack>
                </Mirror>
            </Tilt>
            <Button size='large' variant='contained' onClick={() => navigate('/teams/create')} >
                <Typography variant='h5' fontWeight={700}  >
                    Register Now
                </Typography>
            </Button>
        </Fragment>
    )
}

function HeroSection({ event, disableButton }) {

    const [eventData, setEventData] = useState({})

    useEffect(() => {
        if (!event || event?.toLowerCase() === 'registration') {
            setEventData(registration)
        }
        else {
            const eventItem = eventsList.find(({ label }) => label.replaceAll(' ', '').toLowerCase() == event.replaceAll(' ', '').toLowerCase())
            setEventData(eventItem)
        }
    }, [event])

    return (
        <Paper
            elevation={5}
            sx={{
                borderRadius: '20px',
                backgroundImage: `url(${eventData?.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                overflow: 'hidden'
            }}>
            <Stack gap={3} px={2} py={3} sx={{ display: 'flex', overflow: 'auto', boxSizing: 'border-box', alignItems: 'center' }}>
                <Typography variant='h1' fontFamily={"'Nosifer', sans-serif"} sx={{ textAlign: 'center' }}>
                    <span className="text-gradient">{eventData?.label}</span>
                </Typography>
                {event && !disableButton && <PointsCard points={eventData?.points} />}
                <Tilt
                    tiltEnable={false}
                    glareEnable={true}
                    glareMaxOpacity={0.3}
                    glareColor="white"
                    glarePosition="all"
                    glareBorderRadius="10px"
                    style={{ height: '100%' }}
                >
                    <Mirror elevation={3} sx={{ height: 1, p: 2, borderRadius: '10px', boxSizing: 'border-box' }}>
                        <Stack sx={{ alignItems: 'center', height: 1 }}>
                            <Typography variant='h2' fontWeight={700} sx={{ opacity: 0.7 }} >
                                Rules
                            </Typography>
                            <Stack overflow='auto' sx={{ flexGrow: 1, flexShrink: 1, flexBasis: 'auto', p: 1 }}>
                                <List sx={{
                                    listStyleType: 'disc',
                                    pl: 2,
                                    '& .MuiListItem-root': {
                                        display: 'list-item',
                                    },
                                }}>
                                    {(eventData?.rules || []).map((rule) => {
                                        return (
                                            <ListItem key={rule}>
                                                <Typography variant='h5' sx={{ opacity: 0.9 }}>
                                                    <div dangerouslySetInnerHTML={{ __html: rule }} />
                                                </Typography>
                                            </ListItem>)
                                    })}
                                </List>
                            </Stack>
                        </Stack>
                    </Mirror>
                </Tilt>
                {eventData?.coordinators && <CoordinatorBlock coordinators={eventData?.coordinators} />}
            </Stack>
        </Paper >
    )
}

export default HeroSection