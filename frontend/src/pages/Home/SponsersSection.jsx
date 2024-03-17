import React from 'react'
import { Grid, Grow, Paper, Stack, Typography } from '@mui/material'
import Tilt from 'react-parallax-tilt';

import cocaCola from "../../assets/home-page/sponsors-section/coca-cola.jpg";
import decathlon from "../../assets/home-page/sponsors-section/decathlon.jpg";
import elm from "../../assets/home-page/sponsors-section/elm.jpg";
import fusionGrill from "../../assets/home-page/sponsors-section/fusion-grill.jpg";
import grapevine from "../../assets/home-page/sponsors-section/grapevine.jpg";
import lic from "../../assets/home-page/sponsors-section/lic.jpg";
import mtv from "../../assets/home-page/sponsors-section/mtv.jpg";
import nba from "../../assets/home-page/sponsors-section/nba.jpg";
import talentwala from "../../assets/home-page/sponsors-section/talentwala.jpg";
import theGlobalHues from "../../assets/home-page/sponsors-section/the-global-hues.jpg";
import waaMomo from "../../assets/home-page/sponsors-section/waa-momo.jpg";

const titleSponser = [
    {
        title: 'Coca Cola',
        logo: cocaCola,
        backgroundColor: 'white',
    },
]

const poweredBy = [
    {
        logo: decathlon,
        title: "Decathlon",
        backgroundColor: "#0082c6",
    },
]

const associateSponser = [
    {
        logo: lic,
        title: "lic",
        backgroundColor: "#000000"
    },
]

const youthPartner = [
    {
        logo: grapevine,
        title: "Grapevine",
        backgroundColor: "#000000",
    },
]

const artistPartner = [
    {
        logo: talentwala,
        title: "talentwala",
        backgroundColor: "#000000",
    },
]

const mediaPartners = [
    {
        logo: nba,
        title: "nba",
        backgroundColor: "#d81f32"
    },
    {
        logo: mtv,
        title: "mtv",
        backgroundColor: "#000000"
    },
    {
        logo: theGlobalHues,
        title: "the global hues",
        backgroundColor: "#ffffff",
    },
]

const otherPartners = [
    {
        logo: elm,
        title: "E-learn markets",
        backgroundColor: "#ffffff",
    },
    {
        logo: fusionGrill,
        title: "Fusion grill",
        backgroundColor: "#ff5d11",
    },
    {
        logo: waaMomo,
        title: "waa momo",
        backgroundColor: "#f7e32c",
    },
]

function SponsorCard({ logo, title, backgroundColor }) {
    return (
        <Tilt
            scale={1.15}
            tiltReverse={true}
            perspective={500}
            glareEnable={true}
            glareMaxOpacity={0.45}
            glareBorderRadius='1rem'
        >
            <Paper sx={{ bgcolor: backgroundColor, borderRadius: '1rem', p: 2 }}>
                <img
                    src={logo}
                    alt={title}
                    style={{
                        width: '15rem',
                        height: '15rem',
                        objectFit: 'contain',
                    }} />
            </Paper>
        </Tilt >
    )
}

function SponserGroup({ title, sponsers }) {
    return (
        <Stack gap={2} alignItems='center'>
            <Typography variant='h3' fontWeight={700} sx={{ opacity: 0.6 }} >
                {title}
            </Typography>
            <Stack direction={{ xs: 'column', md: 'row' }} gap={{ xs: 2, md: 5 }}>
                {sponsers.map((item) => <SponsorCard key={item.title} {...item} />)}
            </Stack>
        </Stack>
    )
}

function SponsersSection() {
    return (
        <Stack p={4} sx={{ alignItems: 'center' }} gap={3}>
            <Typography variant='h1' fontFamily={"'Nosifer', sans-serif"}>
                <span className="text-gradient">Past Sponsors</span>
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4} order={{ xs: 1, md: 2 }}>
                    <SponserGroup title={'Title Sponser'} sponsers={titleSponser} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} order={{ xs: 2, md: 1 }}>
                    <SponserGroup title={'Powered By'} sponsers={poweredBy} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} order={{ xs: 3, md: 3 }}>
                    <SponserGroup title={'Associate Sponser'} sponsers={associateSponser} />
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <SponserGroup title={'Youth Partner'} sponsers={youthPartner} />
                </Grid>
                <Grid item xs={12} sm={6} >
                    <SponserGroup title={'Artist Partner'} sponsers={artistPartner} />
                </Grid>
            </Grid>
            <Grid spacing={3} sx={{ display: 'flex', alignItems: 'center' }}>
                <SponserGroup title={'Media Partners'} sponsers={mediaPartners} />
            </Grid>
            <Grid spacing={3} sx={{ display: 'flex', alignItems: 'center' }}>
                <SponserGroup title={'Other Partners'} sponsers={otherPartners} />
            </Grid>
        </Stack>
    )
}

export default SponsersSection