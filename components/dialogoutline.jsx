'use client'

import React from 'react'
import PropTypes from 'prop-types'

import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import CreateIcon from '@mui/icons-material/BorderColor'

import classes from './dialogoutline.module.css'
import captions from '../assets/captions.json'
import useCaption from '../lib/usecaption'


export default function DialogOutline({ 
    courseName = '',
    courseDescription = '',
    isTopicExist = false,
    onConfirm = undefined,
    onClose = undefined,
}) {
    
    const setCaption = useCaption(captions)

    const [openDialog, setOpenDialog] = React.useState(false)
    const [isLoading, setLoading] = React.useState(true)
    const [outlineData, setOutlineData] = React.useState([])
    const [data, setData] = React.useState('')
    
    React.useEffect(() => {

        generateOutline()

    }, [])

    React.useEffect(() => {

        if(data) {

            let tokens = data.split('\n')

            let outline = []
            let index = -1

            for(let i = 0; i < tokens.length; i++) {

                let str = tokens[i].trim()

                if(str.length === 0) continue

                if(str.indexOf('. ') > 0) {

                    let n = str.indexOf('. ')
                    let s = str.substr(n + 1)
                    
                    index++
                    outline[index] = {
                        topic: s.trim(),
                        subtopics: []
                    }

                } else if(str.indexOf('-') === 0) {

                    let m = str.indexOf('-')
                    let t = str.substr(m + 1)

                    outline[index].subtopics.push(t.trim())

                }

            }

            setOutlineData(outline)
            setLoading(false)

        }

    }, [data])

    const generateOutline = async () => {

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

            setData(result.text)
            
        } catch(error) {

            console.log(error)

            setLoading(false)
        }

    }

    const handleOutline = () => {

        if(isTopicExist) {

            setOpenDialog(true)

        } else {

            handleConfirm()

        }

    }

    const handleConfirm = React.useCallback(() => {

        onConfirm(outlineData)

    }, [outlineData])

    const handleClose = () => {

        setOpenDialog(false)

    }

    const handleGenerate = () => {
        
        setLoading(true)

        generateOutline()

    }
    
    return (
        <div className={classes.container}>
            <div className={classes.dialog}>
                <div className={classes.main}>
                    <div className={classes.header}>
                        <CreateIcon sx={{mr: '10px'}} />
                        <h4 className={classes.headerTitle}>
                        { setCaption('topic-generate') }
                        </h4>
                    </div>
                    <div className={classes.outline}>
                    {
                        isLoading &&
                        <div className={classes.loader}>
                            <CircularProgress color='inherit' />
                        </div>
                    }
                    {
                        (isLoading === false && outlineData.length > 0) &&
                        <ol className={classes.topiclist}>
                        {
                            outlineData.map((item, index) => {
                                return (
                                    <li key={index} className={classes.topicitem}>
                                        <div className={classes.topic}>
                                            <div className={classes.topicName}>{item.topic}</div>
                                            {
                                                item.subtopics.length > 0 &&
                                                <ol className={classes.sublist}>
                                                    {
                                                        item.subtopics.map((x,y) => {
                                                            return (
                                                                <li className={classes.subitem} key={y}>{x}</li>
                                                            )
                                                        })
                                                    }
                                                </ol>
                                            }
                                        </div>
                                    </li>
                                )
                            })
                        }
                        </ol>
                    }
                    </div>
                </div>
                <div className={classes.action}>
                    <Button 
                    disabled={isLoading}
                    variant='outlined' 
                    onClick={handleGenerate}>{ setCaption('generate-again') }</Button>
                    <div className={classes.group}>
                        <Button 
                        disabled={isLoading || data.length === 0 || outlineData.length === 0}
                        sx={{width: '150px', mr: '10px'}} 
                        variant='outlined' 
                        onClick={handleOutline}>{ setCaption('use-outline') }</Button>
                        <Button 
                        disabled={isLoading}
                        variant='outlined' 
                        onClick={onClose}>{ setCaption('close') }</Button>
                    </div>
                </div>
                {
                    openDialog &&
                    <div className={classes.cover}>
                        <div className={classes.coverpanel}>
                            <div className={classes.covertext}>
                                <span>Do you want to overwrite the existing topics?</span>
                            </div>
                            <div className={classes.coveraction}>
                                <Button sx={{ mr: '10px' }} variant='outlined' onClick={handleConfirm}>{setCaption('yes')}</Button>
                                <Button variant='outlined' onClick={handleClose}>{setCaption('no')}</Button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

DialogOutline.propTypes = {
    /**
     * courseName string
     */
    courseName: PropTypes.string,
    /**
     * courseDescription string
     */
    courseDescription: PropTypes.string,
    /**
     * isTopicExist bool
     */
    isTopicExist: PropTypes.bool,
    /**
     * onConfirm event
     */
    onConfirm: PropTypes.func,
    /**
     * onClose event
     */
    onClose: PropTypes.func,
}