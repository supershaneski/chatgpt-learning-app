'use client'

import React from 'react'

import { createPortal } from 'react-dom'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

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

import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'

import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'

import AddIcon from '@mui/icons-material/Add'

import useDataStore from '../store/datastore'

import DialogSubject from '../components/dialogsubject'

import Search from '../components/search'

import Loader from '../components/loader'

import { getSimpleId } from '../lib/utils'

import categoryList from '../assets/category.json'

import classes from './sandbox.module.css'

function getCategoryName(id) {
    return categoryList.items.find((item) => item.id === id)?.name
}

export default function Sandbox() {

    const router = useRouter()

    const subjects = useDataStore((state) => state.courses)
    const addSubject = useDataStore((state) => state.addCourse)

    const [subjectItems, setSubjectItems] = React.useState([])
    const [openAdd, setOpenAdd] = React.useState(false)

    const [openLoader, setOpenLoader] = React.useState(false)

    const [searchText, setSearchText] = React.useState('')

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

    const handleLoader = () => {
        //
    }

    const handleCourseClick = (id) => {
        
        setOpenLoader(true)

        router.push(`/course/${id}`)

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
                        <div className={classes.searchTitle}>Search:</div>
                        <Chip
                        sx={{ backgroundColor: '#fff', fontSize: '1rem' }}
                        label={searchText}
                        variant="outlined"
                        //onClick={handleClick}
                        onDelete={() => setSearchText('')}
                        />
                    </div>
                }
                <ul className={classes.list}>
                {
                    subjectItems.filter((item) => item.name.toLowerCase().indexOf(searchText.toLowerCase()) >= 0).map((item) => {
                        return (
                            <li key={item.id} className={classes.item}>
                                <div className={classes.course} onClick={() => handleCourseClick(item.id)}>
                                    <div className={classes.category}>{ getCategoryName(item.category) }</div>
                                    <div className={classes.name}>{ item.name }</div>
                                    <div className={classes.description}>{ item.description }</div>
                                </div>
                            </li>
                        )
                    })
                }
                    <li className={classes.item}>
                        <div className={classes.course}>
                            <div className={classes.addCourse}>
                                <Button 
                                color='inherit'
                                sx={{fontSize: '1rem', fontWeight: '400'}} 
                                onClick={handleOpenAdd} 
                                startIcon={<AddIcon />}>Add Subject</Button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            {
                openAdd && createPortal(
                    <DialogSubject 
                    icon={<AddIcon />}
                    dialogTitle='Add Subject'
                    buttonTitle='Add'
                    onConfirm={handleAddSubject} 
                    onClose={handleCloseAdd} 
                    />, 
                    document.body
                )
            }
            {
                openLoader && createPortal(
                    <Loader onClose={handleLoader} />,
                    document.body
                )
            }
        </div>
    )
}