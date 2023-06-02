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
import ClearIcon from '@mui/icons-material/Clear'

import categoryList from '../assets/category.json'

import captions from '../assets/captions.json'
import useCaption from '../lib/usecaption';

import classes from './dialogsubject.module.css'

function DialogSubject({
    icon = null,
    dialogTitle = '',
    buttonTitle = '',
    defaultCategory = 'cat0001',
    defaultName = '',
    defaultDescription = '',
    onConfirm = undefined,
    onClose = undefined,
}) {

    const setCaption = useCaption(captions)

    const [category, setCategory] = React.useState(defaultCategory)
    const [name, setName] = React.useState(defaultName)
    const [description, setDescription] = React.useState(defaultDescription)

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
                    <div className={classes.category}>
                        <FormControl 
                        //fullWidth
                        >
                            <InputLabel id="icon-label">{setCaption('category')}</InputLabel>
                            <Select
                            labelId="icon-label"
                            label={setCaption('category')}
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            >
                                {
                                    categoryList.items.map((item) => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)
                                }
                            </Select>
                        </FormControl>
                    </div>
                    <div className={classes.name}>
                        <FormControl fullWidth>
                            <TextField
                            fullWidth
                            required
                            label={setCaption('subject-name')}
                            placeholder={setCaption('placeholder-name')}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                        disabled={name.length === 0}
                                        onClick={() => setName('')}
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
                            label={setCaption('description')}
                            placeholder={setCaption('placeholder-description')}
                            value={description}
                            multiline
                            rows={3}
                            maxRows={3}
                            onChange={(e) => setDescription(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                        disabled={description.length === 0}
                                        onClick={() => setDescription('')}
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
                    disabled={name.length === 0}
                    onClick={() => onConfirm(category, name, description)} variant='outlined' 
                    sx={{width: '120px', mr: 1}}>{buttonTitle}</Button>
                    <Button onClick={() => onClose()} variant='outlined' 
                    sx={{width: '120px'}}>{setCaption('close')}</Button>
                </div>
            </div>
        </div>
    )
}

DialogSubject.propTypes = {
    /**
     * icon object
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
     * defaultCategory string
     */
    defaultCategory: PropTypes.string,
    /**
     * defaultName string
     */
    defaultName: PropTypes.string,
    /**
     * defaultDescription
     */
    defaultDescription: PropTypes.string,
    /**
     * onConfirm handler
     */
    onConfirm: PropTypes.func,
    /**
     * onClose handler
     */
    onClose: PropTypes.func,
}

export default DialogSubject