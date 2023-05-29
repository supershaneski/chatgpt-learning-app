'use client'

import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { purple } from '@mui/material/colors';

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#006085'),//purple[500]
    backgroundColor: '#006085', //500
    '&:hover': {
      backgroundColor: '#00979d', //700
    },
}));

export default function CustomButton() {
    return (
        <ColorButton variant="contained" disableElevation>Button A</ColorButton>
    )
}