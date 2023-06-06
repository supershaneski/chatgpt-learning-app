'use client'

import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add'
import Stack from '@mui/material/Stack';
import { purple } from '@mui/material/colors';

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#006085'),//purple[500]
    backgroundColor: '#a41034', //'#006085', //500
    '&:hover': {
      backgroundColor: '#ea2e5d', //'#00979d', //700
    },
}));

export default function CustomButton(props) {
    return (
        <ColorButton 
        onClick={props.onClick} 
        startIcon={props.icon} 
        variant="contained" 
        disableElevation 
        sx={{marginRight: '10px', padding: '10px 40px', borderRadius: '3px', fontSize: '1rem', fontWeight: '400'}}>
        {props.children}</ColorButton>
    )
}