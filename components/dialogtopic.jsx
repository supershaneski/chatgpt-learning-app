'use client'

import React from 'react'

import PropTypes from 'prop-types'

import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ClearIcon from '@mui/icons-material/Clear';

import categoryList from '../assets/category.json'

import classes from './dialogtopic.module.css'

function DialogTopic({
    dialogTitle = '',
    buttonTitle = '',
    //defaultCategory = 'cat0001',
    //defaultName = '',
    //defaultDescription = '',
    id = '',
    defaultTopic = '',
    defaultSubTopic = '',
    onConfirm = undefined,
    onClose = undefined,
}) {

    //const [category, setCategory] = React.useState(defaultCategory)

    const [topic, setTopic] = React.useState(defaultTopic)
    const [subTopics, setSubTopics] = React.useState(defaultSubTopic)

    return (
        <div className={classes.container}>
            <div className={classes.dialog}>
                <div className={classes.header}>
                    <h4 className={classes.title}>{ dialogTitle }</h4>
                </div>
                <div className={classes.main}>
                    <div className={classes.name}>
                        <FormControl fullWidth>
                            <TextField
                            fullWidth
                            required
                            label='Topic'
                            placeholder={`Enter Topic...`}
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                        disabled={topic.length === 0}
                                        onClick={() => setTopic('')}
                                        >
                                            <ClearIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            />
                        </FormControl>
                    </div>
                    <div className={classes.name}>
                        <FormControl fullWidth>
                            <TextField
                            fullWidth
                            //required
                            label='SubTopics'
                            placeholder={`Enter SubTopics...`}
                            value={subTopics}
                            multiline
                            rows={3}
                            maxRows={3}
                            onChange={(e) => setSubTopics(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                        disabled={subTopics.length === 0}
                                        onClick={() => setSubTopics('')}
                                        >
                                            <ClearIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            />
                        </FormControl>
                    </div>
                </div>
                <div className={classes.action}>
                    <Button 
                    disabled={topic.length === 0}
                    onClick={() => onConfirm(id, topic, subTopics)} 
                    variant='outlined' 
                    sx={{width: '120px', mr: 1}}>{buttonTitle}</Button>
                    <Button 
                    onClick={() => onClose()} 
                    variant='outlined' 
                    sx={{width: '120px'}}>Close</Button>
                </div>
            </div>
        </div>
    )
}

DialogTopic.propTypes = {
    /**
     * dialogTitle string
     */
    dialogTitle: PropTypes.string,
    /**
     * buttonTitle string
     */
    buttonTitle: PropTypes.string,
    /**
     * id string
     */
    id: PropTypes.string,
    /**
     * defaultTopic string
     */
    defaultTopic: PropTypes.string,
    /**
     * defaultSubTopic
     */
    defaultSubTopic: PropTypes.string,
    /**
     * onConfirm handler
     */
    onConfirm: PropTypes.func,
    /**
     * onClose handler
     */
    onClose: PropTypes.func,
}

export default DialogTopic