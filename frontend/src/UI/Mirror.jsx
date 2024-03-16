import { Paper, styled } from '@mui/material'

const Mirror = styled(Paper)(({ theme }) => ({
    display: 'flex',
    backgroundColor: 'rgba(10, 10, 10, 0.2)',
    p: 1,
    boxSizing: 'border-box',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(4px)'
}));

export default Mirror