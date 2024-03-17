import React from 'react'
import { Avatar, Grid, Paper, Stack, Typography, Link } from '@mui/material'
import Tilt from 'react-parallax-tilt';


import residenceList from '../data/residence'
import eventsList from '../data/events'
import chroma from 'chroma-js';

function ValueCard({ label, children, value }) {
  return (
    <Stack>
      <Typography variant='body2'>
        {label}
      </Typography>
      {children || (<Typography variant='h5' fontWeight={500} sx={{ opacity: 0.6, color: 'inherit' }} >
        {value}
      </Typography>)}
    </Stack>
  )
}

export default function TeamCard({ team, ...props }) {

  const { name, residence, event } = team
  const teamPathName = encodeURIComponent(name)

  const residenceData = residenceList.find(({ name }) => name === residence)
  const eventData = eventsList.find(({ label }) => label === event)


  return (
    <Grid item xs={12} {...props} >
      <Paper elevation={8} sx={{ ":hover": { transform: 'scaleY(1.03) scaleX(1.03)' }, borderColor: residenceData?.color, borderStyle: 'solid', borderWidth: '1px' }}>
        <Stack direction='row' p={1} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href={`/teams/${teamPathName}`} sx={{ textDecoration: 'none', color: 'white', ':hover': { color: 'red' } }}>
            <Stack direction='row' gap={2} sx={{ justifyContent: 'center', alignItems: 'center' }}>
              <Avatar src={residenceData?.image} variant="rounded" sx={{ width: 56, height: 56 }} />
              {/* <Typography variant='h5' fontWeight={500} sx={{ opacity: 0.6, color: 'inherit' }} >
                {name}
              </Typography> */}
              <ValueCard label='Team Name' value={name} />
            </Stack>
          </Link>
          <ValueCard label='Residence' value={residence} />
          <ValueCard label='Event' value={event} />
          <Avatar src={eventData?.image} variant="rounded" sx={{ width: 56, height: 56 }} />
        </Stack >
      </Paper >
      {/* <Tilt
        scale={1.15}
        tiltReverse={true}
        perspective={500}
        glareEnable={true}
        glareMaxOpacity={0.45}
        glareBorderRadius='1rem'
        className='parallax-effect'
        style={{
          height: '15rem',
          width: '25rem',
          borderRadius: '1rem',
          borderColor: residenceData?.color,
          borderStyle: 'solid',
          borderWidth: '4px',
          // backgroundColor: chroma(residenceData?.color).alpha(0.6).hex(),
          backgroundImage: `url(${eventData?.image})`,
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
        <Stack
          className='inner-element'
          p={2}
          gap={2}
          alignItems='center'
        >
          <Link to={`/teams/${teamPathName}`} style={{ textDecoration: 'none' }}>
            <Typography
              variant='h3'
              fontWeight={700}
              textAlign='center'
              sx={{ textShadow: '0px 2px 0 #000' }}
            >
              {name}
            </Typography>

          </Link>
          <Typography
            variant='h4'
            textAlign='center'
            sx={{ textShadow: '0px 2px 0 #000' }}
          >
            {residence}
          </Typography>
        </Stack>
      </Tilt > */}
    </Grid>
  )
}
