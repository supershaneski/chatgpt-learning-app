'use client'

import React from 'react'

import classes from './sandbox.module.css'

export default function Sandbox({ 
    params, 
    searchParams 
}) {

    React.useEffect(() => {

        console.log(params)
        console.log(searchParams)

    }, [])

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <h1 className={classes.headerTitle}>Introduction to Data Science with Python</h1>
                <p className={classes.headerText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <button className={classes.button}>Edit Course Outline</button>
            </div>
            <div className={classes.main}>
                <span>Sandbox Page</span>
            </div>
        </div>
    )
}