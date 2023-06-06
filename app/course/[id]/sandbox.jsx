'use client'

import React from 'react'

import Link from 'next/link'

import { createPortal } from 'react-dom'

import { useRouter } from 'next/navigation'

import IconButton from '@mui/material/IconButton'
import SettingsIcon from '@mui/icons-material/Settings'
import HomeIcon from '@mui/icons-material/Home'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/DeleteForever'
import CreateIcon from '@mui/icons-material/BorderColor'

import CustomButton from '../../../components/CustomButton'

import DialogSubject from '../../../components/dialogsubject'
import DialogTopic from '../../../components/dialogtopic'
import Dialog from '../../../components/dialog'
import DialogOutline from '../../../components/dialogoutline'

import useDataStore from '../../../store/datastore'

import Loader from '../../../components/loader'

import classes from './sandbox.module.css'
import { Typography } from '@mui/material'

import categoryList from '../../../assets/category.json'
import { getSimpleId } from '../../../lib/utils'

import captions from '../../../assets/captions.json'
import useCaption from '../../../lib/usecaption'

function getCategoryName(id) {
    return categoryList.items.find((item) => item.id === id)?.name
}

export default function Sandbox({ 
    params, 
    searchParams 
}) {

    const setCaption = useCaption(captions)

    const router = useRouter()

    const courses = useDataStore((state) => state.courses)
    const editCourse = useDataStore((state) => state.editCourse)

    const addTopic = useDataStore((state) => state.addTopic)
    const editTopic = useDataStore((state) => state.editTopic)
    const deleteTopics = useDataStore((state) => state.deleteTopics)
    const deleteTopic = useDataStore((state) => state.deleteTopic)
    const getTopics = useDataStore((state) => state.getTopics)

    const [openEditSubject, setOpenEditSubject] = React.useState(false)
    const [openAddTopic, setOpenAddTopic] = React.useState(false)
    const [openDialog, setOpenDialog] = React.useState(false)
    const [openLoader, setOpenLoader] = React.useState(false)

    const [openOutline, setOpenOutline] = React.useState(false)
    const [outline, setOutline] = React.useState('')

    const [paramId, setParamId] = React.useState('')

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
                sid: params.id,
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

    const handleDeleteTopic = (id) => {
        setParamId(id)
        setOpenDialog(true)
    }

    const handleDelete = (id) => {
        setTopicItems((prev) => prev.slice(0).filter((item) => item.id !== id))
        deleteTopic(id)
        setOpenDialog(false)
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

    const handleOutline = (data) => {

        if(data.length === 0) {
            setOpenOutline(false)
            return
        }

        deleteTopics(params.id)
        setTopicItems([])
        
        data.forEach((item) => {

            const newTopic = {
                id: getSimpleId(),
                sid: params.id,
                topic: item.topic, 
                subtopics: item.subtopics.join('\n'),
            }
    
            addTopic(newTopic)
    
            setTopicItems((prev) => [...prev, ...[newTopic]])

        })

        setOpenOutline(false)

    }

    const handleGenerateOutline = async () => {

        setOpenOutline(true)

        /*
        setOpenLoader(true)

        try {

            const prompt = `Write a sample course outline for the selected subject.\n` +
                `Subject Title: ${courseName}\n` +
                `Subject Description: ${courseDescription}\n` +
                `Divide the outline in several sections.\n` +
                `Write subtopics that is relevant under each section.\n` +
                `Follow this sample format:\n` +
                `I. Section title\n` +
                `- Subtopic 1\n` +
                `- Subtopic 2\n` +
                `- Subtopic 3\n` +
                `II. Section title\n` +
                `- Subtopic 1\n` +
                `- Subtopic 2\n` +
                `- Subtopic 3\n` +
                `III. Section title\n` +
                `- Subtopic 1\n` +
                `- Subtopic 2\n` +
                `- Subtopic 3\n` +
                `[Start]\n`

            const response = await fetch('/generate/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt,
                })
            })

            if(!response.ok) {
                console.log('Oops, an error occurred', response.status)
            }

            const result = await response.json()

            //console.log(result)

            setOutline(result.text)

            setOpenLoader(false)
            setOutline(result.text)
            setOpenOutline(true)

        } catch(error) {
            console.log(error)

            setOpenLoader(false)
        }
        */

    }

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <div className={classes.toolbar}>
                    <IconButton onClick={handleGotoHome}>
                        <HomeIcon sx={{color: '#fff'}} />
                    </IconButton>
                    {
                        courseCategory &&
                        <Typography sx={{color: '#FFFFFF', fontSize: '1.1rem', textTransform: 'uppercase' }}>{ courseCategory && setCaption(getCategoryName(courseCategory)) }</Typography>
                    }
                    <IconButton onClick={() => setOpenEditSubject(true)}>
                        <SettingsIcon sx={{color: '#fff'}} />
                    </IconButton>
                </div>
                <div className={classes.banner}>
                    <h1 className={classes.headerTitle}>{ courseName }</h1>
                    <p className={classes.headerText}>{ courseDescription }</p>
                    <div className={classes.topbutton}>
                        <CustomButton
                        icon={<AddIcon />}
                        onClick={handleShowAddTopic} 
                        >{setCaption('add-topic')}</CustomButton>
                        <CustomButton
                        disabled={courseName.length === 0}
                        icon={<CreateIcon />}
                        onClick={handleGenerateOutline} 
                        >{setCaption('topic-generate')}</CustomButton>
                    </div>
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
                                            <div onClick={() => handleTopicClick(item.id)} className={classes.topicNameText}>{item.topic}</div>
                                            <div className={classes.buttons}>
                                                <IconButton 
                                                onClick={() => handleEditTopic(item.id, item.topic, item.subtopics)} 
                                                size="small"
                                                sx={{mr: 1}}
                                                >
                                                    <EditIcon fontSize="inherit" />
                                                </IconButton>
                                                <IconButton 
                                                onClick={() => handleDeleteTopic(item.id)} 
                                                size="small">
                                                    <DeleteIcon fontSize="inherit" />
                                                </IconButton>
                                            </div>
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
                    dialogTitle={setCaption('edit-subject')}
                    buttonTitle={setCaption('save')}
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
                    icon={topicDialogMode > 0 ? <EditIcon /> : <AddIcon />}
                    //dialogTitle={topicDialogMode > 0 ? 'Edit Topic' : setCaption('add-topic')}
                    dialogTitle={setCaption(topicDialogMode > 0 ? 'edit-topic' : 'add-topic')}
                    buttonTitle={setCaption(topicDialogMode > 0 ? 'save' : 'add')}
                    //buttonTitle={topicDialogMode > 0 ? 'Save' : 'Add'}
                    //defaultCategory={courseCategory}
                    //defaultName={courseName}
                    //defaultDescription={courseDescription}
                    id={topicDialogMode > 0 ? defaultTopicId : ''}
                    defaultTopic={topicDialogMode > 0 ? defaultTopic : ''}
                    defaultSubTopic={topicDialogMode > 0 ? defaultSubTopic : ''}
                    onConfirm={handleAddTopic}
                    onClose={() => setOpenAddTopic(false)}
                    //onDelete={() => {}}
                    //isDeleteVisible={topicDialogMode > 0}
                    />,
                    document.body
                )
            }
            {
                openDialog && createPortal(
                    <Dialog 
                    param={paramId}
                    icon={<DeleteIcon sx={{fontSize: '1.1rem', marginRight: '5px'}} />}
                    title={setCaption('dialog-topic-title')}
                    caption={setCaption('dialog-topic-text')}
                    onConfirm={handleDelete}
                    onClose={() => setOpenDialog(false)}
                    />,
                    document.body
                )
            }
            {
                openOutline && createPortal(
                    <DialogOutline
                    //data={outline}
                    courseName={courseName}
                    courseDescription={courseDescription}
                    isTopicExist={topicItems.length > 0}
                    onConfirm={handleOutline}
                    onClose={() => setOpenOutline(false)}
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