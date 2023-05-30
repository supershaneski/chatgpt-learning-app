'use client'

import React from 'react'

import { createPortal } from 'react-dom'

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

import useDataStore from '../store/datastore'

import DialogSubject from '../components/dialogsubject'

import { getSimpleId } from '../lib/utils'

import categoryList from '../assets/category.json'

import classes from './sandbox.module.css'

function getCategoryName(id) {
    return categoryList.items.find((item) => item.id === id)?.name
}

export default function Sandbox() {

    const subjects = useDataStore((state) => state.courses)
    const addSubject = useDataStore((state) => state.addCourse)

    const [subjectItems, setSubjectItems] = React.useState([])
    const [openAdd, setOpenAdd] = React.useState(false)

    React.useEffect(() => {

        setSubjectItems(subjects)

    }, [])

    const handleAddSubject = (category, name, description) => {

        const newSubject = {
            id: getSimpleId(),
            category,
            name,
            description,
        }

        addSubject(newSubject)

        setSubjectItems((prev) => [...prev, ...[newSubject]])

        setOpenAdd(false)

    }

    const handleOpenAdd = () => {
        setOpenAdd(true)
    }

    const handleCloseAdd = () => {
        setOpenAdd(false)
    }

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <button className={classes.button} onClick={handleOpenAdd}><span className={classes.icon}>&#43;</span> Add Subject</button>
            </div>
            <div className={classes.main}>
                <ul className={classes.list}>
                {
                    subjectItems.map((item) => {
                        console.log('id', item.id)
                        return (
                            <li key={item.id} className={classes.item}>
                                <Link className={classes.link} href={`/course/${item.id}`}>
                                    <div className={classes.course}>
                                        <div className={classes.category}>{ getCategoryName(item.category) }</div>
                                        <div className={classes.name}>{ item.name }</div>
                                        <div className={classes.description}>{ item.description }</div>
                                    </div>
                                </Link>
                            </li>
                        )
                    })
                }
                </ul>
            </div>
            {
                openAdd && createPortal(
                    <DialogSubject 
                    dialogTitle='Add Subject'
                    buttonTitle='Add'
                    onConfirm={handleAddSubject} 
                    onClose={handleCloseAdd} 
                    />, 
                    document.body
                )
            }
        </div>
    )
}