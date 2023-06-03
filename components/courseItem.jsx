'use client'

import React from 'react'

import PropTypes from 'prop-types'

import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/DeleteForever';

import classes from './courseItem.module.css'

function CoursePanel({
    category = '',
    name = '',
    description = '',
    onClick = undefined,
    onDelete = undefined,
}) {
    return (
        <div className={classes.course}>
            <div className={classes.category}>{ category }</div>
            <div className={classes.name} onClick={onClick}>{ name }</div>
            <div className={classes.description}>{ description }</div>
            <div className={classes.delete}>
                <IconButton onClick={onDelete}>
                    <DeleteIcon sx={{color: '#d5d0ca'}} />
                </IconButton>
            </div>
        </div>
    )
}

/*
<Button 
                color='inherit'
                sx={{ fontSize: '1rem', fontWeight: '400' }} 
                onClick={onClick} 
                startIcon={icon}>{ name }</Button>
*/

function CourseButton({
    name = '',
    onClick = undefined,
    icon = undefined,
}) {
    return (
        <div className={[classes.course, classes.click].join(' ')} onClick={onClick}>
            <div className={classes.add}>
                <div className={classes.btnAdd}>
                    { icon }&nbsp;{ name }
                </div>
            </div>
        </div>
    )
}

function CourseItem({
    category = '',
    name = '',
    description = '',
    icon = undefined,
    buttonMode = false,
    onClick = undefined,
    onDelete = undefined,
}) {

    return buttonMode ? <CourseButton name={name} icon={icon} onClick={onClick} /> : <CoursePanel category={category} name={name} description={description} onDelete={onDelete} onClick={onClick} />

}

CourseItem.propTypes = {
    /**
     * icon element
     */
    icon: PropTypes.element,
    /**
     * buttonMode boolean
     */
    buttonMode: PropTypes.bool,
    /**
     * category string
     */
    category: PropTypes.string,
    /**
     * name string
     */
    name: PropTypes.string,
    /**
     * description string
     */
    description: PropTypes.string,
    /**
     * onClick handler
     */
    onClick: PropTypes.func,
    /**
     * onDelete handler
     */
    onDelete: PropTypes.func,
}

export default CourseItem