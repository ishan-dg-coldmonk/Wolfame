import { Avatar, Stack, Typography } from '@mui/material';
import React, { Fragment } from 'react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import timelineList from '../../data/timeline';
import skullPhoto from '../../assets/skull.png'

function TimeLineCard({ title, image, date, events }) {
    const dateItem = (
        <Stack px={2}>
            {date}
        </Stack>
    )
    return (
        <VerticalTimelineElement
            // className="vertical-timeline-element--work"
            contentStyle={{ background: 'red', color: 'white', padding: 0, borderRadius: '10px' }}
            contentArrowStyle={{ borderRight: '7px solid  red' }}
            date={dateItem}
            iconStyle={{ background: '#990000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            icon={<Avatar src={skullPhoto}  />}
        >
            <Stack sx={{ background: `url(${image}) no-repeat`, backgroundSize: 'cover', borderRadius: 'inherit' }}>
                <Stack p={3} gap={2} height={1} width={1} sx={{ backdropFilter: 'blur(2px)', backgroundColor: 'rgba(0, 0, 0, 0.2)', borderRadius: 'inherit' }}>
                    <Typography variant='h3' sx={{ fontWeight: 'bold' }}>
                        <span className="text-gradient"> {title} </span>
                    </Typography>
                    <Stack pt={2}>
                        {events.map((event) => {
                            return (
                                <Stack direction='row' sx={{ alignItems: 'center' }}>
                                    <Typography letterSpacing='1px'>
                                        {event}
                                    </Typography>
                                </Stack>
                            )
                        })}
                    </Stack>
                </Stack>
            </Stack>
        </VerticalTimelineElement>
    )
}

function TimeLine() {
    return (
        <VerticalTimeline>
            {timelineList.map((data) => <TimeLineCard key={data.title} {...data} />)}
        </VerticalTimeline>
    )
}

export default TimeLine