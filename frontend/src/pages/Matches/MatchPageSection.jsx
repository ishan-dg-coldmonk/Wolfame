import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Button, Paper, Stack, Typography } from '@mui/material'
import LoadingIndicator from '../../UI/LoadingIndicator'
import MatchCard from '../../components/Cards/MatchCard'
import axios from '../../services/axiosinstance'
// import MDEditor from '../../components/MDEditor'
import MDPreview from '../../components/MDPreview'
import { AuthContext } from '../../context/AuthProvider'
import JoditEditor from 'jodit-react';

import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

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
    const [matchData, setMatchData] = useState({})
    const [openEditor, setOpenEditor] = useState(false)
    const [summaryValue, setSummaryValue] = useState('')

    const fetchMatch = async () => {
        try {
            const match = await axios.get(`/match/${matchId}`)
            return match.data
        }
        catch (e) {

        }
    }

    const upadateSummaryHandler = async () => {
        try {
            await axios.patch(`/match/${matchId}`, { summary: summaryValue })
            setMatchData(prop => {
                return { ...prop, summary: summaryValue }
            })
        }
        catch (e) {

        }
    }

    const updateWinnerHandler = async (e) => {
        try {
            const winner = e.target.value || null
            await axios.patch(`/match/${matchId}`, { winner })
            setMatchData(prop => {
                return { ...prop, winner }
            })
        }
        catch {

        }
    }

    useEffect(() => {
        fetchMatch().then((match) => {
            setMatchData(match)
            setSummaryValue(match?.summary)
        })
    }, [matchId])

    if (!matchData?.time) {
        return <LoadingIndicator />
    }

    return (
        <Stack p={{ xs: 1, md: 4 }} pt={{ xs: 9, md: 10 }} gap={2}>
            <MatchCard match={matchData} hideSummary={true} />
            {user?.role === 'admin' && <Paper elevation={5} sx={{ p: 1 }}>
                <Stack gap={2} sx={{ alignItems: 'center' }}>
                    <Typography variant='h2' fontWeight={700}>
                        <span className='text-gradient'>Select Winner</span>
                    </Typography>
                    <RadioGroup name="radio-group" value={matchData.winner || ''} onChange={updateWinnerHandler}>
                        <MyFormControlLabel value="" label="None" control={<Radio />} />
                        <MyFormControlLabel value={matchData?.teams?.[0]._id} label={matchData?.teams?.[0].name} control={<Radio />} />
                        <MyFormControlLabel value={matchData?.teams?.[1]._id} label={matchData?.teams?.[1].name} control={<Radio />} />
                    </RadioGroup>
                </Stack>
            </Paper>}
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
                    {openEditor && <Editor value={summaryValue} onChange={(value) => setSummaryValue(value)} onUpdate={upadateSummaryHandler} onClose={() => {
                        setSummaryValue(matchData?.summary)
                        setOpenEditor(false)
                    }} />}
                </Stack>
            </Paper>
        </Stack>
    )
}
