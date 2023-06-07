'use client'

import React from 'react'

import { createPortal } from 'react-dom'

import { useRouter } from 'next/navigation'

import Chip from '@mui/material/Chip'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/DeleteForever'

import Dialog from '../components/dialog'
import DialogSubject from '../components/dialogsubject'
import Search from '../components/search'
import Loader from '../components/loader'
import CourseItem from '../components/courseItem'

import categoryList from '../assets/category.json'
import useDataStore from '../store/datastore'
import { getSimpleId } from '../lib/utils'

import captions from '../assets/captions.json'
import useCaption from '../lib/usecaption'

import classes from './sandbox.module.css'


function getCategoryName(id) {
    return categoryList.items.find((item) => item.id === id)?.name
}

export default function Sandbox() {

    const router = useRouter()

    const setCaption = useCaption(captions)

    const subjects = useDataStore((state) => state.courses)
    const addSubject = useDataStore((state) => state.addCourse)
    const deleteSubject = useDataStore((state) => state.deleteCourse)

    const [subjectItems, setSubjectItems] = React.useState([])
    const [searchText, setSearchText] = React.useState('')
    
    const [openAdd, setOpenAdd] = React.useState(false)
    const [openDialog, setOpenDialog] = React.useState(false)
    const [openLoader, setOpenLoader] = React.useState(false)
    const [paramId, setParamId] = React.useState('')
    
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

    const handleCourseClick = (id) => {
        
        setOpenLoader(true)

        router.push(`/course/${id}`)

    }

    const handleCourseDelete = (id) => {
        setParamId(id)
        setOpenDialog(true)
    }

    const handleDelete = (id) => {
        
        deleteSubject(id)

        setSubjectItems((prev) => {
            return prev.slice(0).filter((item) => item.id !== id)
        })

        setOpenDialog(false)

    }

    const handleSearch = (key) => {
        setSearchText(key)
    }

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <div className={classes.search}>
                    <Search onSearch={handleSearch} />
                </div>
            </div>
            <div className={classes.main}>
                {
                    searchText.length > 0 &&
                    <div className={classes.searchText}>
                        <div className={classes.searchTitle}>{`${setCaption('search-result')}:`}</div>
                        <Chip
                        sx={{ backgroundColor: '#fff', fontSize: '1rem' }}
                        label={searchText}
                        variant="outlined"
                        onDelete={() => setSearchText('')}
                        />
                    </div>
                }
                <ul className={classes.list}>
                {
                    subjectItems.filter((item) => item.name.toLowerCase().indexOf(searchText.toLowerCase()) >= 0).map((item) => {
                        return (
                            <li key={item.id} className={classes.item}>
                                <CourseItem
                                onDelete={() => handleCourseDelete(item.id)}
                                onClick={() => handleCourseClick(item.id)}
                                category={setCaption(getCategoryName(item.category))}
                                name={item.name}
                                description={item.description}
                                />
                            </li>
                        )
                    })
                }
                    <li className={classes.item}>
                        <CourseItem buttonMode={true} name={setCaption('add-subject')} icon={<AddIcon />} onClick={handleOpenAdd} />
                    </li>
                </ul>
            </div>
            {
                openAdd && createPortal(
                    <DialogSubject 
                    icon={<AddIcon />}
                    dialogTitle={setCaption('add-subject')} //'Add Subject'
                    buttonTitle={setCaption('add')}
                    onConfirm={handleAddSubject} 
                    onClose={handleCloseAdd} 
                    />, 
                    document.body
                )
            }
            {
                openDialog && createPortal(
                    <Dialog
                    param={paramId}
                    icon={<DeleteIcon sx={{fontSize: '1.1rem', marginRight: '5px'}} />}
                    title={setCaption('dialog-delete-title')}
                    caption={setCaption('dialog-delete-text')}
                    onConfirm={handleDelete}
                    onClose={() => setOpenDialog(false)}
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