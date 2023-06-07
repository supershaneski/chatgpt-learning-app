'use client'

import React from 'react'

import PropTypes from 'prop-types'

import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import ClearIcon from '@mui/icons-material/Clear';

import captions from '../assets/captions.json'
import useCaption from '../lib/usecaption';
import classes from './dialogtopic.module.css'

function DialogTopic({
    icon = null,
    dialogTitle = '',
    buttonTitle = '',
    id = '',
    defaultTopic = '',
    defaultSubTopic = '',
    isDeleteVisible = false,
    onConfirm = undefined,
    onClose = undefined,
    onDelete = undefined,
}) {

    const setCaption = useCaption(captions)

    const [topic, setTopic] = React.useState(defaultTopic)
    const [subTopics, setSubTopics] = React.useState(defaultSubTopic)

    return (
        <div className={classes.container}>
            <div className={classes.dialog}>
                <div className={classes.header}>
                    {
                        icon &&
                        <>
                        { icon }&nbsp;<h4 className={classes.title}>{ dialogTitle }</h4>
                        </>
                        
                    }
                    {
                        !icon &&
                        <h4 className={classes.title}>{ dialogTitle }</h4>
                    }
                </div>
                <div className={classes.main}>
                    <div className={classes.name}>
                        <FormControl fullWidth>
                            <TextField
                            fullWidth
                            required
                            label={setCaption('topic')}
                            placeholder={setCaption('placeholder-topic')}
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            inputProps={{
                                maxLength: 128,
                            }}
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
                            label={setCaption('subtopic')}
                            placeholder={setCaption('placeholder-subtopic')}
                            value={subTopics}
                            multiline
                            rows={3}
                            //maxRows={3}
                            onChange={(e) => setSubTopics(e.target.value)}
                            inputProps={{
                                maxLength: 384,
                            }}
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
                    //disabled={topic.length === 0}
                    onClick={() => onDelete(id)} 
                    variant='outlined' 
                    color='error'
                    sx={{width: '120px', visibility: isDeleteVisible ? 'visible' : 'hidden'}}>{setCaption('delete')}</Button>
                    <div className={classes.buttonGroup}>
                        <Button 
                        disabled={topic.length === 0}
                        onClick={() => onConfirm(id, topic, subTopics)} 
                        variant='outlined' 
                        sx={{width: '120px', mr: 1}}>{buttonTitle}</Button>
                        <Button 
                        onClick={() => onClose()} 
                        variant='outlined' 
                        sx={{width: '120px'}}>{ setCaption('close') }</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

DialogTopic.propTypes = {
    /**
     * isDeleteVisible boolean
     */
    isDeleteVisible: PropTypes.bool,
    /**
     * icon element
     */
    icon: PropTypes.element,
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
    /**
     * onDelete handler
     */
    onDelete: PropTypes.func,
}

export default DialogTopic