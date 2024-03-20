import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Button, Paper, Stack, Typography } from '@mui/material'
import MatchCard from '../../components/Cards/MatchCard'
import axios from '../../services/axiosinstance'
import MDPreview from '../../components/MDPreview'
import { AuthContext } from '../../context/AuthProvider'
import JoditEditor from 'jodit-react';

import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { useMutation, useQuery } from '@tanstack/react-query';

import LoadingIndicator from '../../UI/LoadingIndicator'
import EmptyBlock from '../../UI/EmptyBlock'
import ErrorBlock from '../../UI/ErrorBlock'
import { queryClient } from '../../services/http'


const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(
    ({ theme, checked }) => ({
        '.MuiFormControlLabel-label': {
            color: checked ? theme.palette.primary.main : 'white',
            fontSize: '1.4rem'
        },
    }),
);

function MyFormControlLabel(props) {
    const radioGroup = useRadioGroup();

    let checked = false;

    if (radioGroup) {
        checked = radioGroup.value === props.value;
    }

    return <StyledFormControlLabel checked={checked} {...props} />;
}

MyFormControlLabel.propTypes = {
    value: PropTypes.any,
};

function Editor({ value, onChange, onUpdate, onClose }) {
    return (
        <Stack width={'100%'} gap={2}>
            <JoditEditor
                config={{ theme: "dark" }}
                value={value}
                tabIndex={1}
                onBlur={onChange}
            />
            <Stack direction='row' gap={2}>
                <Button fullWidth size='large' variant='contained' onClick={onUpdate}>
                    Update
                </Button>
                <Button fullWidth size='large' variant='contained' onClick={onClose}>
                    Cancel
                </Button>
            </Stack>
        </Stack>
    )
}

export default function MatchPageSection() {

    const { matchId } = useParams()
    const { user } = useContext(AuthContext)
    const [openEditor, setOpenEditor] = useState(false)
    const [summaryValue, setSummaryValue] = useState('')

    const { data: matchData, isPending, isError } = useQuery({
        queryKey: ['matches'],
        queryFn: () => axios.get(`/match/${matchId}`).then(response => response.data),
    })

    const { mutate: upadateSummaryHandler } = useMutation({
        mutationFn: (summary) => axios.patch(`/match/${matchId}`, { summary }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['matches'] })
        }
    })

    useEffect(() => {
        setSummaryValue(matchData?.summary || '')
    }, [matchData])

    if (isPending) {
        return <LoadingIndicator pt={12} />
    }

    if (isError) {
        return <ErrorBlock pt={12} />
    }


    if (!matchData?.time) {
        return <LoadingIndicator />
    }

    return (
        <Stack p={{ xs: 1, md: 4 }} pt={{ xs: 9, md: 10 }} gap={2}>
            <MatchCard match={matchData} hideSummary={true} />
            <Paper elevation={5} sx={{ p: 1 }}>
                <Stack gap={2} sx={{ alignItems: 'center' }}>
                    <Typography variant='h2' fontWeight={700}>
                        <span className='text-gradient'>Summary</span>
                    </Typography>
                    {user?.role === 'admin' && !openEditor && (
                        <Button size='large' variant='contained' onClick={() => setOpenEditor((prop) => !prop)}>
                            Edit Summary
                        </Button>
                    )}
                    {!openEditor && <MDPreview content={matchData?.summary || '<p><span style="font-size: 30px;">Empty</span></p>'} />}
                    {openEditor && <Editor value={summaryValue} onChange={(value) => setSummaryValue(value)} onUpdate={() => upadateSummaryHandler(summaryValue)} onClose={() => {
                        setSummaryValue(matchData?.summary)
                        setOpenEditor(false)
                    }} />}
                </Stack>
            </Paper>
        </Stack>
    )
}
