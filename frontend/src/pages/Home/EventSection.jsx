import React from 'react'
import { Grid, Paper, Stack, Typography } from '@mui/material'
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import eventsList from '../../data/events';
import { Link } from 'react-router-dom';

function EventSection() {
    return (
        <Stack p={4} sx={{ alignItems: 'center' }} gap={5}>
            <Typography variant='h1' fontFamily={"'Nosifer', sans-serif"}>
                <span className="text-gradient">Events</span>
            </Typography>
            <Stack>
                <Swiper
                    effect="coverflow"
                    grabCursor
                    centeredSlides
                    slidesPerView="auto"
                    pagination={{
                        dynamicBullets: true,
                        clickable: false,
                    }}
                    modules={[EffectCoverflow, Pagination]}
                    className="events-swiper"
                >
                    {eventsList.map((eventObj, i) => (

                        <SwiperSlide
                            key={i}
                            className="event-slide"
                            style={{
                                backgroundImage: `url(${eventObj.image})`,
                                backgroundPosition: "center center",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",
                                display: "flex",
                                height: '75vh',
                                width: '75vw',
                            }}
                        >
                            <Stack width='100%' sx={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Link to={`/leaderboard/${eventObj.label.replaceAll(' ', '').toLowerCase()}`} style={{ textDecoration: 'none' }}>
                                    <Typography variant='h2' fontWeight={800}  >
                                        {eventObj.event}
                                    </Typography>
                                </Link>
                                <Typography variant='body1' fontSize={'1rem'} sx={{ py: { xs: 1, md: 2 } }}>
                                    {eventObj.description}
                                </Typography>
                            </Stack>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Stack>
        </Stack >
    )
}

export default EventSection