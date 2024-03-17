import React, { useEffect, useState } from 'react'
import { Stack } from '@mui/material'
import { useParams } from 'react-router'
import HeroSection from './HeroSection'
import BodySection from './BodySection'

import residenceList from '../../../data/residence'

function ResidenceItem() {

    const { residence } = useParams()

    const [residenceData, setResidenceData] = useState(undefined)

    useEffect(() => {
        const selectedResidenceData = residenceList.find(({ name }) => name.replaceAll(' ', '').toLowerCase() === residence.toLowerCase())
        setResidenceData(selectedResidenceData)
    }, [residence])

    if (residenceData === undefined) {
        return <></>
    }

    return (
        <Stack pb={4} sx={{ flexGrow: 1, flexShrink: 1, flexBasis: 'auto', overflowX: 'hidden' }}>
            <HeroSection residence={residenceData} />
            <BodySection residence={residenceData} />
        </Stack>
    )
}

export default ResidenceItem