'use client'

import React from 'react'

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

import useDataStore from '../store/datastore'

import classes from './sandbox.module.css'

export default function Sandbox() {

    const dataMessage = useDataStore((state) => state.data)
    const addDataMessage = useDataStore((state) => state.add)

    const divRef = React.useRef(null)
    const inputRef = React.useRef(null)

    const [inputText, setInputText] = React.useState('')
    const [messageItems, setMessageItems] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {

        setMessageItems(dataMessage)

    }, [])

    const addMessageItem = (msg) => {

        setMessageItems((prev) => [...prev, ...[msg]])

        addDataMessage(msg)

    }

    const handleSubmit = async () => {

        setLoading(true)

        const prevdata = messageItems.map((item) => {
            return {
                role: item.role,
                content: item.content,
            }
        })

        const message = inputText

        const groupId = getSimpleId()

        /*
        setMessageItems((prev) => [...prev, ...[{
            id: getSimpleId(),
            gid: groupId,
            role: 'user',
            content: message,
        }]])
        */

        addMessageItem({
            id: getSimpleId(),
            gid: groupId,
            role: 'user',
            content: message,
        })

        inputRef.current.blur()
        
        setInputText('')

        scrollTop()

        try {

            const system_prompt = `You will act as a helpful tutor.\n` +
                `You will be discussing about the following topic:\n` +
                `Life and Works of Aristotle.\n\n`+
                `Initially, you will give a short overview of the topic.\n` +
                `Afterwards, you will open a discussion with the user about the topic.\n` +
                `Using Socratic approach, you will ask the user about the topic.`


            const response = await fetch('/api/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    system: system_prompt,
                    inquiry: message,
                    previous: prevdata,
                })
            })

            if(!response.ok) {
                console.log('Oops, an error occurred', response.status)
            }

            const { text } = await response.json()

            //console.log('result', text)

            /*
            setMessageItems((prev) => [...prev, ...[{
                id: getSimpleId(),
                gid: groupId,
                role: 'assistant',
                content: text,
            }]])
            */

            addMessageItem({
                id: getSimpleId(),
                gid: groupId,
                role: 'assistant',
                content: text,
            })
    
            scrollTop()

            setLoading(false)

        } catch(error) {

            console.log(error)

            setLoading(false)

        }

    }

    const scrollTop = () => {
        setTimeout(() => {
            divRef.current.scrollTop = divRef.current.scrollHeight
        }, 300)
    }

    return (
        <div ref={divRef} className={classes.container}>
            <div className={classes.header}>
                <h1 className={classes.title}>CS50 Introduction to Game Development</h1>
                <p className={classes.description}>
                    Learn about the development of 2D and 3D interactive games in this hands-on course, as you explore the design of games such as Super Mario Bros., Pokemon, and more.
                </p>
                <CustomButton>Start Lesson</CustomButton>
            </div>
            <div className={classes.main}>
                <div className={classes.content}>
                {
                    messageItems.map((item) => {
                        return (
                            <p key={item.id}>{item.content}</p>
                        )
                    })
                }
                {
                    loading &&
                    <div className={classes.loader}>
                        <LoadingText />
                    </div>
                }
                </div>
            </div>
            <div className={classes.chat}>
                <div className={classes.input}>
                    <Box 
                    component="form" 
                    onSubmit={handleSubmit}
                    noValidate>
                        <TextField 
                        placeholder='Write your message...'
                        //disabled={loading}
                        fullWidth
                        multiline
                        maxRows={6}
                        inputRef={inputRef}
                        value={inputText}
                        //placeholder={setCaption('write-message')}
                        onChange={(e) => setInputText(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <>
                                    <IconButton
                                    disabled={inputText.length === 0}
                                    onClick={() => setInputText('')}
                                    >
                                        <ClearIcon />
                                    </IconButton>
                                    <IconButton
                                    disabled={inputText.length === 0}
                                    onClick={handleSubmit}
                                    >
                                        <SendIcon />
                                    </IconButton>
                                    </>
                                </InputAdornment>
                            ),
                        }}
                        />
                    </Box>
                </div>
            </div>
        </div>
    )
}