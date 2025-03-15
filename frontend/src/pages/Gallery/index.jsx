import React,  {useEffect} from 'react'
import { Stack } from '@mui/material'
import HeroSection from './HeroSection'

import './index.css'
import GallerySection from './GallerySection'

function Gallery() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    return (<React.Fragment><HeroSection />
            <GallerySection /></React.Fragment>
            
    )
}

export default Gallery