'use client'

import React from 'react'

import Link from 'next/link'

import { createPortal } from 'react-dom'

import { useRouter } from 'next/navigation'

import IconButton from '@mui/material/IconButton'
import SettingsIcon from '@mui/icons-material/Settings'
import HomeIcon from '@mui/icons-material/Home'
import EditIcon from '@mui/icons-material/Edit'

import CustomButton from '../../../components/CustomButton'

import DialogSubject from '../../../components/dialogsubject'
import DialogTopic from '../../../components/dialogtopic'

import useDataStore from '../../../store/datastore'

import Loader from '../../../components/loader'

import classes from './sandbox.module.css'
import { Typography } from '@mui/material'

import categoryList from '../../../assets/category.json'
import { getSimpleId } from '../../../lib/utils'

function getCategoryName(id) {
    return categoryList.items.find((item) => item.id === id)?.name
}

export default function Sandbox({ 
    params, 
    searchParams 
}) {

    const router = useRouter()

    const courses = useDataStore((state) => state.courses)
    const editCourse = useDataStore((state) => state.editCourse)

    const addTopic = useDataStore((state) => state.addTopic)
    const editTopic = useDataStore((state) => state.editTopic)
    const getTopics = useDataStore((state) => state.getTopics)

    const [openEditSubject, setOpenEditSubject] = React.useState(false)
    const [openAddTopic, setOpenAddTopic] = React.useState(false)

    const [openLoader, setOpenLoader] = React.useState(false)

    const [courseCategory, setCourseCategory] = React.useState('')
    const [courseName, setCourseName] = React.useState('')
    const [courseDescription, setCourseDescription] = React.useState('')

    const [topicItems, setTopicItems] = React.useState([])

    const [topicDialogMode, setTopicDialogMode] = React.useState(0)
    const [defaultTopicId, setDefaultTopicId] = React.useState('')
    const [defaultTopic, setDefaultTopic] = React.useState('')
    const [defaultSubTopic, setDefaultSubTopic] = React.useState('')

    React.useEffect(() => {

        //console.log(`params: ${params.id}`)
        //console.log(`searchParams: ${searchParams}`)

        const id = params.id

        const course = courses.find((item) => item.id === id)

        setCourseCategory(course.category)
        setCourseName(course.name)
        setCourseDescription(course.description)

        const topics = getTopics(id)

        setTopicItems(topics)

        document.title = course.name

    }, [])

    const handleGotoHome = () => {
        setOpenLoader(true)
        router.push('/')
    }

    const handleEditSubject = (category, name, description) => {

        editCourse(params.id, {
            category,
            name,
            description
        })

        setCourseCategory(category)
        setCourseName(name)
        setCourseDescription(description)

        setOpenEditSubject(false)
        
    }

    const handleAddTopic = (id, topicName, subTopicNames) => {
        
        if(topicDialogMode > 0) {

            editTopic(id, {
                topic: topicName, 
                subtopics: subTopicNames,
            })

            setTopicItems((prev) => {
                const tops = prev.slice(0).map((item) => {
                    return {
                        ...item,
                        topic: item.id === id ? topicName : item.topic, 
                        subtopics: item.id === id ? subTopicNames : item.subtopics,
                    }
                })
                return tops
            })

        } else {

            const newTopic = {
                id: getSimpleId(),
                gid: params.id,
                topic: topicName, 
                subtopics: subTopicNames,
            }
    
            addTopic(newTopic)
    
            setTopicItems((prev) => [...prev, ...[newTopic]])

        }
        
        setOpenAddTopic(false)

    }

    const handleShowAddTopic = () => {

        setTopicDialogMode(0)
        setOpenAddTopic(true)

    }

    const handleEditTopic = (id, topic, subtopic) => {
        
        setTopicDialogMode(1)

        setDefaultTopicId(id)
        setDefaultTopic(topic)
        setDefaultSubTopic(subtopic)

        setOpenAddTopic(true)

    }

    const handleTopicClick = (id) => {

        setOpenLoader(true)
        router.push(`/topic/${id}`)

    }

    /*
    <button 
                    onClick={handleShowAddTopic} 
                    className={classes.button}><span className={classes.icon}>&#43;</span> Add Topic</button>
    */
    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <div className={classes.toolbar}>
                    <IconButton onClick={handleGotoHome}>
                        <HomeIcon sx={{color: '#fff'}} />
                    </IconButton>
                    {
                        courseCategory &&
                        <Typography sx={{color: '#FFFFFF', fontSize: '1.1rem', textTransform: 'uppercase' }}>{ getCategoryName(courseCategory) }</Typography>
                    }
                    <IconButton onClick={() => setOpenEditSubject(true)}>
                        <SettingsIcon sx={{color: '#fff'}} />
                    </IconButton>
                </div>
                <div className={classes.banner}>
                    <h1 className={classes.headerTitle}>{ courseName }</h1>
                    <p className={classes.headerText}>{ courseDescription }</p>
                    <CustomButton
                    onClick={handleShowAddTopic} 
                    >Add Topic</CustomButton>
                </div>
            </div>
            <div className={classes.main}>
            {
                topicItems.length > 0 &&
                <ol className={classes.list}>
                    {
                        topicItems.map((item) => {

                            const n = item.subtopics ? item.subtopics?.split('\n') : []
                            
                            return (
                                <li key={item.id} className={classes.item}>
                                    <div className={classes.topic}>
                                        <div className={classes.topicName}>
                                            <span onClick={() => handleTopicClick(item.id)} className={classes.topicNameText}>{item.topic}</span>&nbsp;
                                            <IconButton onClick={() => handleEditTopic(item.id, item.topic, item.subtopics)} size="small">
                                                <EditIcon fontSize="inherit" />
                                            </IconButton>
                                        </div>
                                        <div className={classes.topicText} onClick={() => handleTopicClick(item.id)}>
                                        {
                                            n.length > 1 &&
                                            <ol className={classes.sublist}>
                                                {
                                                    n.map((s, i) => {
                                                        return (
                                                            <li key={i}>{s}</li>
                                                        )
                                                    })
                                                }
                                            </ol>
                                        }
                                        {
                                            n.length === 1 && 
                                            <>
                                            { item.subtopics }
                                            </>
                                        }
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ol>
            }
            </div>
            {
                openEditSubject && createPortal(
                    <DialogSubject
                    icon={<SettingsIcon />}
                    dialogTitle='Edit Subject'
                    buttonTitle='Save'
                    defaultCategory={courseCategory}
                    defaultName={courseName}
                    defaultDescription={courseDescription}
                    onConfirm={handleEditSubject}
                    onClose={() => setOpenEditSubject(false)}
                    />,
                    document.body
                )
            }
            {
                openAddTopic && createPortal(
                    <DialogTopic
                    dialogTitle={topicDialogMode > 0 ? 'Edit Topic' : 'Add Topic'}
                    buttonTitle={topicDialogMode > 0 ? 'Save' : 'Add'}
                    //defaultCategory={courseCategory}
                    //defaultName={courseName}
                    //defaultDescription={courseDescription}
                    id={topicDialogMode > 0 ? defaultTopicId : ''}
                    defaultTopic={topicDialogMode > 0 ? defaultTopic : ''}
                    defaultSubTopic={topicDialogMode > 0 ? defaultSubTopic : ''}
                    onConfirm={handleAddTopic}
                    onClose={() => setOpenAddTopic(false)}
                    />,
                    document.body
                )
            }
            {
                openLoader && createPortal(
                    <Loader />,
                    document.body
                )
            }
        </div>
    )
}