import React, { useLayoutEffect, useRef } from 'react';
import { Stack } from '@mui/material';
import HeroSection from './HeroSection';
import { useLocation } from 'react-router-dom'; // Use 'react-router-dom' instead of 'react-router'
import './index.css';
import GallerySection from './GallerySection';

function Gallery() {
    const location = useLocation();
    const headerRef = useRef(null); // Create a ref for the HeroSection

    // Use useLayoutEffect to ensure the scroll happens before the page is painted
    useLayoutEffect(() => {
        if (headerRef.current) {
            // Scroll the HeroSection into view
            headerRef.current.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
    }, [location.pathname]);

    return (
        <React.Fragment>
            {/* Attach the ref to the HeroSection */}
            <div ref={headerRef}>
                <HeroSection />
            </div>
            <GallerySection />
        </React.Fragment>
    );
}

export default Gallery;