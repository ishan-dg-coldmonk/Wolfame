import React, { Fragment } from 'react'
import ImageGallery from "react-image-gallery";
import Tilt from 'react-parallax-tilt';
import ImageSlider from '../../components/ImageSlider';
import { Paper, Stack, Typography } from '@mui/material';


function importAll(r) {
    return r.keys().map(r);
}

const images = importAll(require.context('../../assets/home-page/gallery-section', false, /\.(png|jpe?g|svg)$/));

function HeroSection() {
    return (
        <Paper elevation={3} sx={{ overflow: 'hidden' }} >
            <Stack sx={{ position: 'relative', boxSizing: 'border-box', overflow: 'hidden' }}>
                <ImageSlider images={images.slice(0, 7)} direction='left' />
                <ImageSlider sx={{ display: { xs: 'none', sm: 'flex' } }} images={images.slice(7, 14)} direction='right' />
                <Stack position='absolute' height={1} width={1} pt={{ xs: 2, md: 0 }} sx={{ background: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant='h1' fontFamily={"'Nosifer', sans-serif"} fontSize={{ xs: '3rem', sm: '5rem' }}>
                        <span className="text-gradient">Gallery</span>
                    </Typography>
                </Stack>
            </Stack>
        </Paper>)
}

// function HeroSection() {
//     return (
//         <Paper elevation={3} sx={{ overflow: 'hidden', height: { xs: '200px', md: '280px' }, pt: { xs: 2, md: 0 }, background: `url(https://png.pngtree.com/background/20230527/original/pngtree-3d-render-of-a-red-camera-surrounded-by-red-cubes-picture-image_2761319.jpg) no-repeat`, backgroundSize: 'cover' }} >
//             <Stack height={1} width={1} pt={2} sx={{ background: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }}>
//                 <Typography variant='h1' fontFamily={"'Nosifer', sans-serif"} fontSize={{ xs: '4rem', sm: '5rem' }} sx={{ textAlign: 'center' }} >
//                     <span className="text-gradient">Gallery</span>
//                 </Typography>
//             </Stack>
//         </Paper>)
// }

export default HeroSection