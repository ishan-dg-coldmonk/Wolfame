import React, { Fragment, useState } from 'react'

import ImageGallery from "react-image-gallery";
import Tilt from 'react-parallax-tilt';
import { Grid, IconButton, Modal, Zoom } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';


function importAll(r) {
    return r.keys().map(r);
}

const images = importAll(require.context('../../assets/home-page/gallery-section', false, /\.(webp)$/));

const createImageProps = (path) => {
    return {
        original: path,
        thumbnail: path,
        // originalHeight: '600px',
        // originalWidth: '1000px',
        // thumbnailHeight: '150px',
        // thumbnailWidth: '300px',
    }
}

const createGalleryProps = (path) => {
    return {
        src: path
    }
}

function ImageComponent(props) {
    return (
        <Tilt
            scale={1.15}
            tiltReverse={true}
            perspective={500}
            glareEnable={true}
            glareMaxOpacity={0.45}
            glareBorderRadius='1rem'
        >
            <img {...props.imageProps} />
        </Tilt>
    )
}

function GallerySection() {

    const [selectedImage, setSelectedImage] = useState(undefined)

    const imageSelectHandler = (index) => {
        setSelectedImage(index)
    }


    return (
        <Fragment>
            <Modal open={selectedImage !== undefined} sx={{ backgroundColor: 'black', }}>
                <div style={{ position: 'relative' }}>
                    <IconButton onClick={() => setSelectedImage(undefined)} sx={{ position: 'absolute', right: '1rem', top: '1rem', zIndex: 400 }}>
                        <CloseIcon fontSize='large' sx={{ ":hover": { color: 'red' } }} />
                    </IconButton>
                    < ImageGallery
                        startIndex={selectedImage}
                        items={images.map(createImageProps)}
                        showFullscreenButton={false}
                        lazyLoad={false}
                    />
                </div>
            </Modal>
            <Grid container spacing={{xs: 1, md: 2}} sx={{ p: {xs: 1, md: 3}, display: 'flex', justifyContent: 'center' }}>
                {images.map((path, index) => {
                    return (
                        <Grid item sx={{ ":hover": { zIndex: 3 } }}>
                            <Tilt
                                scale={1.15}
                                tiltReverse={true}
                                perspective={500}
                                glareEnable={true}
                                glareMaxOpacity={0.45}
                                glareBorderRadius='1rem'
                                style={{ cursor: 'pointer' }}
                            >
                                <img src={path} onClick={() => imageSelectHandler(index)} style={{ height: '10rem', width:'15rem', objectFit: 'cover', borderRadius: '0.5rem' }} />
                            </Tilt>
                        </Grid>
                    )
                })}
            </Grid>
        </Fragment>
    )
}

export default GallerySection