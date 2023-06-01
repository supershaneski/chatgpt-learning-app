'use client'

import React from 'react'

import PropTypes from 'prop-types'

import CircularProgress from '@mui/material/CircularProgress'

import classes from './loader.module.css'

export default function Loader({ 
    onClose = undefined,
}) {
    return (
        <div className={classes.container} onClick={() => onClose()}>
            <div className={classes.center}>
                <CircularProgress sx={{color: '#D5D0CA'}} />
            </div>
        </div>
    )
}

Loader.propTypes = {
    /**
     * onClose event
     */
    onClose: PropTypes.func,
}