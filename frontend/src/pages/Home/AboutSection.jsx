import React from 'react'
import { Grid, Paper, Stack, Typography } from '@mui/material'

function AboutCard({ title, src, children, direction = 'left' }) {
    return (
        <Paper elevation={10} sx={{ height: { xs: 'auto', md: '24rem' }, width: '100%', borderRadius: '2rem' }}>
            <Grid container direction={{ xs: 'column', md: 'row' }} sx={{ height: '100%', borderRadius: '2rem', overflow: 'hidden' }}>
                <Grid item xs={12} md={4} order={{ md: direction === 'left' ? 1 : 2 }} sx={{ alignItems: 'center', justifyContent: 'center', height: { xs: '500px', md: '100%' } }}>
                    <img src={src} alt={title} style={{ objectFit: 'cover', height: '100%', width: '100%' }} />
                </Grid>
                <Grid item xs={12} md={8} order={{ md: direction === 'left' ? 2 : 1 }} p={{ xs: 3, md: 4 }} gap={2} boxSizing='border-box' sx={{ flexGrow: 1, flexShrink: 1, flexBasis: 'auto' }}>
                    <Typography variant='h3' fontWeight={700} sx={{ opacity: 0.6 }} >
                        {title}
                    </Typography>
                    <Typography variant='body1' fontSize={'1rem'} sx={{ opacity: 0.8, py: { xs: 1, md: 2 } }}>
                        {children}
                    </Typography>
                </Grid>
            </Grid>
        </Paper >
    )
}

function AboutSection() {
    return (
        <Stack p={4} sx={{ alignItems: 'center' }} gap={5}>
            <Typography variant='h1' fontFamily={"'Nosifer', sans-serif"}>
                <span className="text-gradient">About Us</span>
            </Typography>
            <AboutCard title={'IIEST, Shibpur'} src={'https://www.iiests.ac.in/assets/images/bg/05.jpg'}>
                Indian Institute of Engineering Science and Technology, Shibpur (IIEST Shibpur), erstwhile Bengal Engineering College (also known as B.E. College),
                formerly Bengal Engineering and Science University , is a public research university also a National Institute of Technology located at Shibpur, Howrah, West Bengal.
                Founded in 1856,it is one of the oldest public research university.
                It is recognized as an Institute of National Importance under MHRD by the Government of India. IIEST serves as a center for advanced learning and research. The primary activities are the creation and dissemination of knowledge, the production of high-quality engineers, scientists, and entrepreneurs equipped with cutting-edge technology, and the development of innovative technology solutions for the benefit of society.
            </AboutCard>
            <AboutCard direction='rigth' title={'Wolfenden Hall'} src={'https://lh6.googleusercontent.com/-KTbz7M2U9Co/UHF6ua5PNXI/AAAAAAAAAUE/MHe_wDUgo88D1DVvgMUsolQVAhFT5o5cACJkC/photo.jpg'}>
                Wolfenden Hall is a place of residence for the students of Indian
                Institute of Engineering Science and Technology, Shibpur.
                Located right in front of the Oval ground of the institute, it
                is the home to many prestigious events organised throughout the year,
                one of&nbsp; them being Wolfame.
                Residents of Wolfenden Hall participate in and organise all of
                the activities.
                The hall is home to free-thinkers who want to prove their
                mettle in every field, be it sports, academics, music and everything
                else.
                <br /> Wolfenden Hall has a very profound alumni base spread across
                the world.
            </AboutCard>
        </Stack >
    )
}

export default AboutSection