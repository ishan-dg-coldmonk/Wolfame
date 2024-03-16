import React, { useEffect, useRef, useState } from 'react'

import { keyframes } from '@mui/system';
import { Stack } from '@mui/material';

function ImageItem({ src, key, width, height }) {
  return (
    <div key={key}>
      <img src={src} style={{ width, height, objectFit: 'cover' }} alt="wolfame image" />
    </div>
  )
}

function ImageSlider({ sx, images, width, height, direction }) {
  const ref = useRef()
  const imageWidth = width || 350;
  const imageHeight = height || 200;

  const sliderWidth = images.length * imageWidth;

  const left = keyframes`
  100% {
    transform: translateX(-${sliderWidth}px);
  }`;

  const right = keyframes`
  100% {
    transform: translateX(${sliderWidth}px);
  }`;

  const imageSet = images.map((slide) => <ImageItem src={slide} width={imageWidth} height={imageHeight} key={slide} />)

  return (
    <div ref={ref} >
      <Stack
        direction='row'
        sx={{
          position: 'relative',
          left: `${direction === 'left' ? 0 : -sliderWidth}px`,
          animation: `${direction === 'left' ? left : right} ${sliderWidth * 12}ms backwards linear infinite`,
          ...sx
        }}
      >
        {Array(2).fill(imageSet).flat()}
      </Stack>
    </div>
  )
}

export default ImageSlider