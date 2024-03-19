import React from 'react'
import { Paper } from '@mui/material'

const personPhotoUrl = 'https://static.vecteezy.com/system/resources/previews/009/992/319/non_2x/people-icon-sign-symbol-design-free-png.png'

export default function ProfileImage({ image }) {
    return (
        <Paper sx={{
            width: '11rem',
            height: '11rem',
            backgroundImage: `url(${image || personPhotoUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '1rem',
        }} />
    )
}
