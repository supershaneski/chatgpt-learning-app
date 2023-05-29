'use client'

import React from 'react'

import Link from 'next/link'

/*
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import ClearIcon from '@mui/icons-material/Clear'
import SendIcon from '@mui/icons-material/Send'

import LoadingText from '../components/loadingtext'
import CustomButton from '../components/CustomButton'

import { getSimpleId } from '../lib/utils'

//import useDataStore from '../store/datastore'
*/

import classes from './sandbox.module.css'

export default function Sandbox() {


    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <button className={classes.button}>Add Subject</button>
            </div>
            <div className={classes.main}>
                <ul className={classes.list}>
                    <li className={classes.item}>
                        <Link className={classes.link} href={`/course/abc0123`}>
                            <div className={classes.course}>
                                <div className={classes.category}>Category</div>
                                <div className={classes.name}>CS50 Introduction to Programming with Scratch</div>
                                <div className={classes.description}>A gentle introduction to programming that prepares you for subsequent courses in coding.</div>
                            </div>
                        </Link>
                    </li>
                    <li className={classes.item}>
                        <Link className={classes.link} href={`/course/xyz5289`}>
                            <div className={classes.course}>
                                <div className={classes.category}>Computer Science</div>
                                <div className={classes.name}>Introduction to Data Science with Python</div>
                                <div className={classes.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}