'use client'

import React from 'react'

import PropTypes from 'prop-types'


import classes from './appheader.module.css'

function AppHeader({
    title = '',
    text = '',
}) {
    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <h1 className={classes.title}>{ title }</h1>
                <p className={classes.text}>{ text }</p>
            </div>
        </div>
    )
}

AppHeader.propTypes = {
    /**
     * title string
     */
    title: PropTypes.string,
    /**
     * text string
     */
    text: PropTypes.string,
}

export default AppHeader