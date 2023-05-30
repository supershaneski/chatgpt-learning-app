'use client'

import React from 'react'

import { createPortal } from 'react-dom'

import { useRouter } from 'next/navigation'

import IconButton from '@mui/material/IconButton'
import SettingsIcon from '@mui/icons-material/Settings'
import HomeIcon from '@mui/icons-material/Home'

import DialogSubject from '../../../components/dialogsubject'

import useDataStore from '../../../store/datastore'

import classes from './sandbox.module.css'
import { Typography } from '@mui/material'

import categoryList from '../../../assets/category.json'

function getCategoryName(id) {
    return categoryList.items.find((item) => item.id === id)?.name
}

export default function Sandbox({ 
    params, 
    searchParams 
}) {

    const router = useRouter()

    const courses = useDataStore((state) => state.courses)

    const [openEditSubject, setOpenEditSubject] = React.useState(false)
    
    const [courseCategory, setCourseCategory] = React.useState('')
    const [courseName, setCourseName] = React.useState('')
    const [courseDescription, setCourseDescription] = React.useState('')

    React.useEffect(() => {

        //console.log(`params: ${params.id}`)
        //console.log(`searchParams: ${searchParams}`)

        const id = params.id

        const course = courses.find((item) => item.id === id)

        setCourseCategory(course.category)
        setCourseName(course.name)
        setCourseDescription(course.description)

    }, [])

    const handleGotoHome = () => {
        router.push('/')
    }

    const handleEditSubject = (category, name, description) => {

        console.log('Edit', category, name, description)

    }

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <div className={classes.toolbar}>
                    <IconButton onClick={handleGotoHome}>
                        <HomeIcon sx={{color: '#fff'}} />
                    </IconButton>
                    <Typography sx={{color: '#FFFFFF', fontSize: '1.1rem', textTransform: 'uppercase' }}>{ getCategoryName(courseCategory) }</Typography>
                    <IconButton onClick={() => setOpenEditSubject(true)}>
                        <SettingsIcon sx={{color: '#fff'}} />
                    </IconButton>
                </div>
                <div className={classes.banner}>
                    <h1 className={classes.headerTitle}>{ courseName }</h1>
                    <p className={classes.headerText}>{ courseDescription }</p>
                    <button className={classes.button}><span className={classes.icon}>&#43;</span> Add Topic</button>
                </div>
            </div>
            <div className={classes.main}>
                <ol className={classes.list}>
                    <li className={classes.item}>
                        <div className={classes.topic}>
                            <div className={classes.topicName}>Data Science Introduction</div>
                            <div className={classes.topicText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                        </div>
                    </li>
                    <li className={classes.item}>
                        <div className={classes.topic}>
                            <div className={classes.topicName}>Data Science Introduction</div>
                            <div className={classes.topicText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                        </div>
                    </li>
                    <li className={classes.item}>
                        <div className={classes.topic}>
                            <div className={classes.topicName}>Data Science Introduction</div>
                            <div className={classes.topicText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                        </div>
                    </li>
                    <li className={classes.item}>
                        <div className={classes.topic}>
                            <div className={classes.topicName}>Data Science Introduction</div>
                            <div className={classes.topicText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                        </div>
                    </li>
                </ol>
            </div>
            {
                openEditSubject && createPortal(
                    <DialogSubject
                    dialogTitle='Edit Subject'
                    buttonTitle='Edit'
                    defaultCategory={courseCategory}
                    defaultName={courseName}
                    defaultDescription={courseDescription}
                    onConfirm={handleEditSubject}
                    onClose={() => setOpenEditSubject(false)}
                    />,
                    document.body
                )
            }
        </div>
    )
}