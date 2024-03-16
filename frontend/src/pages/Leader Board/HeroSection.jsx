import React, { Fragment } from 'react'
import { Button, Grid, List, ListItem, Paper, Stack, Typography } from '@mui/material'
import Mirror from '../../UI/Mirror'
import Tilt from 'react-parallax-tilt'

function PointsCard({ points }) {
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
            <Button size='large' variant='contained' >
                <Typography variant='h5' fontWeight={700}  >
                    Register Now
                </Typography>
            </Button>
        </Fragment>
    )
}

function HeroSection({ name, image, children, rules = [], title = 'Rules', points = [], endBlock }) {
    return (
        <Paper
            elevation={5}
            sx={{
                borderRadius: '20px',
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                overflow: 'hidden'
            }}>
            <Stack gap={3} px={2} py={3} sx={{ display: 'flex', overflow: 'auto', boxSizing: 'border-box', alignItems: 'center' }}>
                <Typography variant='h1' fontFamily={"'Nosifer', sans-serif"} sx={{ textAlign: 'center' }}>
                    <span className="text-gradient">{name}</span>
                </Typography>
                {children || <PointsCard points={points} />}
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
                                {title}
                            </Typography>
                            <Stack overflow='auto' sx={{ flexGrow: 1, flexShrink: 1, flexBasis: 'auto', p: 1 }}>
                                <List sx={{
                                    listStyleType: 'disc',
                                    pl: 2,
                                    '& .MuiListItem-root': {
                                        display: 'list-item',
                                    },
                                }}>
                                    {(rules || []).map((rule) => {
                                        return (
                                            <ListItem>
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
                {endBlock}
            </Stack>

            {/* <img src={trophyPhoto} style={{ height: '100%', width: '100%', objectFit: 'contain' }} /> */}
        </Paper >
    )
}

export default HeroSection