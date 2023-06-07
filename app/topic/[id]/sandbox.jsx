'use client'

import React from 'react'

import { createPortal } from 'react-dom'

import { useRouter } from 'next/navigation'
import Link from 'next/link'

import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'

import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import ClearIcon from '@mui/icons-material/Clear'
import SendIcon from '@mui/icons-material/Send'
import QuizIcon from '@mui/icons-material/Quiz'
import ChatIcon from '@mui/icons-material/Forum'
import DeleteIcon from '@mui/icons-material/DeleteForever'

import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import CreateIcon from '@mui/icons-material/BorderColor'
import ResetIcon from '@mui/icons-material/RestartAlt'

import SettingsIcon from '@mui/icons-material/Settings'
import HomeIcon from '@mui/icons-material/Home'
import TopicIcon from '@mui/icons-material/Topic'

import LoadingText from '../../..//components/loadingtext'
import Loader from '../../../components/loader'

import DialogTopic from '../../../components/dialogtopic'
import Dialog from '../../../components/dialog'

import categoryList from '../../../assets/category.json'
import { getSimpleId } from '../../../lib/utils'

import captions from '../../../assets/captions.json'
import useCaption from '../../../lib/usecaption'

import useDataStore from '../../../store/datastore'

import classes from './sandbox.module.css'

function getCategoryName(id) {
    return categoryList.items.find((item) => item.id === id)?.name
}

const procQuiz = (quiz) => {
    
    let tokens = quiz.split('\n')

    let quizItems = []
    let index = -1

    for(let i = 0; i < tokens.length; i++) {
        let str = tokens[i].trim()
        if(str.length === 0) continue
        let quizno = str.split('.')[0]
        if(!isNaN(quizno)) {

            if(index >= 0) {
                
                if(quizItems[index].choices.length > 1) {
                    quizItems[index].choices.pop()
                }
            }

            index++
            let question = str
            quizItems[index] = {
                question,
                choices: [],
                answer: '',
            }
        } else {
            quizItems[index].answer = str.replace('Answer: ', '')
            quizItems[index].choices.push(str)
        }
    }

    if(quizItems[index].choices.length > 1) {
        quizItems[index].choices.pop()
    }

    // verify
    const errorFlag = quizItems[0].choices.length > 1 ? false : true

    return errorFlag ? null : quizItems

}

function getScoreMessage(score) {
    switch(score) {
        case 0:
            return "Don't be discouraged, keep trying and learning from each experience."
        case 1:
            return "Keep pushing forward, even small steps can lead to great progress."
        case 2:
            return "Your effort is commendable, continue to learn and grow."
        case 3:
            return "You're on the right track, keep up the good work and stay motivated."
        case 4:
            return "Great job! Your dedication is paying off, keep pushing for excellence."
        case 5:
            return "Well done! You're halfway there, keep up the momentum."
        case 6:
            return "Fantastic! Your hard work is evident, keep going and aim higher."
        case 7:
            return "Excellent performance! You're doing exceptionally well, keep up the fantastic work."
        case 8:
            return "Amazing! Your dedication is shining through, keep striving for greatness."
        default:
            return "Outstanding! Your achievement is remarkable, continue to aim high and believe in yourself."
    }
}

export default function Sandbox({ params, searchParams }) {

    const router = useRouter()

    const setCaption = useCaption(captions)

    const addMessage = useDataStore((state) => state.add)
    const getMessages = useDataStore((state) => state.getData)
    const deleteMessages = useDataStore((state) => state.delete)
    const deleteMessage = useDataStore((state) => state.deleteOne)
    const getCourse = useDataStore((state) => state.getCourse)
    const getTopic = useDataStore((state) => state.getTopic)
    const editTopic = useDataStore((state) => state.editTopic)
    const getQuiz = useDataStore((state) => state.getQuiz)
    const addQuiz = useDataStore((state) => state.addQuiz)

    const inputRef = React.useRef(null)
    const divRef = React.useRef(null)

    const [courseId, setCourseId] = React.useState('')
    const [courseCategory, setCourseCategory] = React.useState('')
    const [courseName, setCourseName] = React.useState('')
    const [courseDescription, setCourseDescription] = React.useState('')

    const [topicText, setTopicText] = React.useState('')
    const [subTopicText, setSubTopicText] = React.useState('')

    const [inputText, setInputText] = React.useState('')

    const [openEditTopic, setOpenEditTopic] = React.useState(false)
    const [openLoader, setOpenLoader] = React.useState(false)
    const [openDialog, setOpenDialog] = React.useState(false)
    const [paramId, setParamId] = React.useState('')

    const [isQuizMode, setQuizMode] = React.useState(false)
    const [isQuizFinish, setQuizFinish] = React.useState(false)
    const [quizData, setQuizData] = React.useState([])
    const [answerData, setAnswerData] = React.useState(Array(10).fill(''))
    const [quizScore, setQuizScore] = React.useState(0)

    const [isLoading, setLoading] = React.useState(false)
    const [isDiscussMode, setDiscussMode] = React.useState(false)
    const [messageItems, setMessageItems] = React.useState([])

    React.useEffect(() => {

        const topicId = params.id

        const messages = getMessages(topicId)
        
        if(messages.length > 0) {
            setMessageItems(messages)
        }

        const topic = getTopic(topicId)

        const sid = topic?.sid

        const course = getCourse(sid)

        setCourseId(sid)
        setCourseCategory(course.category)
        setCourseName(course.name)
        setCourseDescription(course.description)

        setTopicText(topic.topic)
        setSubTopicText(topic.subtopics)

        const quiz = getQuiz(topicId)
        if(quiz && quiz.content.length > 0) {
            
            const data = procQuiz(quiz.content)
            if(data) {
                setQuizData(data)
            }
        }

        document.title = course.name

    }, [])

    const formatSubTopic = (str) => {
        if(!str) {
            return null
        }
        const n = str.split('\n').filter((x) => x.trim().length > 0)
        if(n.length === 1) {
            return <>{str}</>
        }
        return (
            <ol>
                {
                    n.map((m, i) => {
                        return (
                            <li key={i}>{m}</li>
                        )
                    })
                }
            </ol>
        )
    }

    const handleTakeQuiz = () => {

        setAnswerData(Array(10).fill(''))
        setQuizScore(0)
        setQuizFinish(false)
        setQuizMode(true)
        setDiscussMode(false)

    }

    const generateQuiz = async () => {

        const prompt = `Write a quiz for the [Selected Topic] which is part of the [Subject].\n` + 
            `The quiz is composed of 10 multiple-choice questions.\n` +
            `For multiple-choice questions, show 4 choices and indicate the correct answer.\n` +
            `[Subject]` +
            `${courseName}\n` +
            `${courseDescription}\n` +
            `[Selected Topic]\n` +
            `${topicText}\n` +
            `${subTopicText}\n` +
            `[End]\n`

        try {

            const response = await fetch('/generate/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt,
                    temprature: 0.7,
                    stop: '[End]',
                })
            })

            if(!response.ok) {
                console.log('Oops, an error occurred', response.status)
            }

            const result = await response.json()

            addQuiz({
                id: params.id,
                content: result.text
            })

            const data = procQuiz(result.text)
            if(data) {
                setQuizData(data)
                setQuizMode(true)
                setDiscussMode(false)
            }

        } catch(error) {
            console.log(error)


        }

        setOpenLoader(false)

    }

    const handleGoToLink = (url) => {
        setOpenLoader(true)
        router.push(url)
    }

    const handleAnswerClick = (i, s) => {
        setAnswerData((prev) => {
            const arr = prev.slice(0)
            arr[i] = s
            return arr
        })
    }

    const handleSubmitQuiz = () => {
        
        let score = 0

        for(let i = 0; i < quizData.length; i++) {
            if(quizData[i].answer === answerData[i]) score++
        }

        setQuizScore(score)
        setQuizFinish(true)

    }

    const handleGenerateQuiz = () => {

        setOpenLoader(true)
        setAnswerData(Array(10).fill(''))
        setQuizScore(0)
        setQuizFinish(false)

        generateQuiz()

    }

    const handleDiscussion = () => {

        if(isDiscussMode) {

            setMessageItems([])
            deleteMessages(params.id)

            setQuizMode(false)
            setDiscussMode(true)

            setLoading(true)

            startDiscussion()

        } else {

            setQuizMode(false)
            setDiscussMode(true)

            if(messageItems.length === 0) {
                setLoading(true)

                startDiscussion()
            }

        }

    }

    const startDiscussion = () => {

        const groupId = getSimpleId()

        sendMessage('', groupId)

    }

    const scrollTop = () => {
        setTimeout(() => {
            divRef.current.scrollTop = divRef.current.scrollHeight
        }, 300)
    }

    const handleSubmit = (e) => {
        
        e.preventDefault()
        
        setLoading(true)

        const groupId = getSimpleId()

        const smsg = inputText
        
        const newMessage = {
            id: getSimpleId(),
            tid: params.id,
            sid: courseId,
            gid: groupId,
            role: 'user',
            content: smsg
        }

        setMessageItems((prev) => [...prev, ...[newMessage]])

        addMessage(newMessage)

        setInputText('')
        inputRef.current.blur()

        scrollTop()

        sendMessage(smsg, groupId)

    }
    
    const sendMessage = async (smsg, groupId) => {

        const previous = messageItems.map((item) => {
            return {
                role: item.role,
                content: item.content,
            }
        })

        const system = `In this session we will simulate a discussion between tutor and student.\n` +
            `You will act as a helpful tutor that will teach the selected topic below.\n` +
            `We will be discussing about the following selected topic and subtopics:\n` +
            `${topicText}\n` +
            `${subTopicText}\n` +
            `This topic is under the course for\n` +
            `${courseName}\n` +
            `${courseDescription}\n` +
            `To begin our discussion, first, give an overview of the topic.\n` +
            `Afterwards, using Socratic approach, you will ask the student about the topic.\n` +
            `I will be acting as the student trying to learn the topic.`

        try {

            const response = await fetch('/api/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    system,
                    inquiry: smsg,
                    previous,
                })
            })

            if(!response.ok) {
                console.log('Oops, an error occurred', response.status)
            }

            const result = await response.json()

            const newMessage = {
                id: getSimpleId(),
                tid: params.id,
                sid: courseId,
                gid: groupId,
                role: 'assistant',
                content: result.text
            }

            setMessageItems((prev) => [...prev, ...[newMessage]])

            addMessage(newMessage)

            scrollTop()

        } catch(error) {
            
            console.log(error)
            
            const newMessage = {
                id: getSimpleId(),
                tid: params.id,
                sid: courseId,
                gid: groupId,
                role: 'assistant',
                content:  setCaption('error-unexpected') //'An unexpected error occured'
            }

            setMessageItems((prev) => [...prev, ...[newMessage]])

            addMessage(newMessage)

            scrollTop()

        }

        setLoading(false)

    }

    const handleDeleteMessage = (id) => () => {
        
        setParamId(id)
        setOpenDialog(true)

    }
    const handleDelete = (id) => {

        deleteMessage(id)

        setMessageItems((prev) => {
            return prev.slice(0).filter((item) => item.gid !== id)
        })

        setOpenDialog(false)

    }

    const handleEditTopic = (id, topic, subtopic) => {

        editTopic(id, {
            topic: topic, 
            subtopics: subtopic,
        })

        setTopicText(topic)
        setSubTopicText(subtopic)

        setOpenEditTopic(false)

    }

    return (
        <div ref={divRef} className={classes.container}>
            <div className={classes.header}>
                <div className={classes.toolbar}>
                    <IconButton onClick={() => handleGoToLink(`/`)}>
                        <HomeIcon sx={{color: '#fff'}} />
                    </IconButton>
                    <Typography sx={{color: '#FFFFFF', fontSize: '1.1rem', textTransform: 'uppercase' }}>
                        { courseCategory && setCaption(getCategoryName(courseCategory)) }
                    </Typography>
                    <IconButton onClick={() => handleGoToLink(`/course/${courseId}`)}>
                        <TopicIcon sx={{color: '#fff'}} />
                    </IconButton>
                </div>
                <div className={classes.banner}>
                    <h1 className={classes.headerTitle}>{ courseName }</h1>
                    <p className={classes.headerText}>{ courseDescription }</p>
                </div>
            </div>
            {
                topicText &&
                <div className={classes.topic}>
                    <div className={classes.topicContent}>
                        <div className={classes.topicParent}>
                            <Link href={`/course/${courseId}`} className={classes.linkURL}>{courseName}</Link>
                        </div>
                        <div className={classes.topicTopic}>{topicText}</div>
                        {
                            subTopicText &&
                            <div className={classes.topicSubTopic}>{formatSubTopic(subTopicText)}</div>
                        }
                        <div className={classes.buttonGroup}>
                            {
                                messageItems.length > 0 &&
                                <Button 
                                disabled={isLoading}
                                onClick={handleDiscussion}
                                startIcon={isDiscussMode ? <ResetIcon /> : <ChatIcon />} 
                                variant='outlined' 
                                size='large' 
                                sx={{mr: 2, mb: 2}}>
                                    { setCaption(isDiscussMode ? 'discussion-reset' : 'discussion-show') }
                                </Button>
                            }
                            {
                                messageItems.length === 0 &&
                                <Button 
                                disabled={isLoading}
                                onClick={handleDiscussion}
                                startIcon={isDiscussMode ? <ResetIcon /> : <ChatIcon />} 
                                variant='outlined' 
                                size='large' 
                                sx={{mr: 2, mb: 2}}>
                                    { setCaption(isDiscussMode ? 'discussion-reset' : 'discussion-start') }
                                </Button>
                            }
                            {
                                quizData.length > 0 &&
                                <Button 
                                disabled={isLoading}
                                onClick={handleTakeQuiz} 
                                startIcon={isQuizMode ? <ResetIcon /> : <QuizIcon />} 
                                variant='outlined' 
                                size='large'
                                sx={{mr: 2, mb: 2}}>
                                { setCaption(isQuizMode ? 'quiz-reset' : 'quiz-take') }
                                </Button>
                            }
                            <Button
                            disabled={isLoading}
                            onClick={handleGenerateQuiz}
                            startIcon={<CreateIcon />}
                            variant='outlined'
                            size='large'
                            sx={{mb: 2}}>
                            { setCaption(quizData.length > 0 ? 'quiz-generate-new' : 'quiz-generate-take') }
                            </Button>
                        </div>
                        <div className={classes.editButton}>
                            <IconButton disabled={isLoading} onClick={() => setOpenEditTopic(true)}>
                                <SettingsIcon />
                            </IconButton>
                        </div>
                    </div>
                </div>
            }
            {
                isQuizMode &&
                <div className={classes.quiz}>
                    <div className={classes.quizContent}>
                        {
                            quizData.map((item, index) => {
                                return (
                                    <div key={index} className={classes.questionItem}>
                                        <p className={classes.questionText}>
                                            {item.question}
                                        </p>
                                        <FormControl 
                                        disabled={isQuizFinish}
                                        sx={{ ml: 2 }}>
                                            <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            name={`radio-buttons-group-${index}`}
                                            value={answerData[index]}
                                            onChange={(e) => handleAnswerClick(index, e.target.value)}
                                            >
                                            {
                                                item.choices.map((c, i) => {
                                                    return (
                                                        <FormControlLabel key={i} value={c} control={<Radio />} label={c} />
                                                    )
                                                })
                                            }
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                )
                            })
                        }
                        <div className={classes.quizAction}>
                            <Button 
                            disabled={isQuizFinish} 
                            onClick={handleSubmitQuiz} 
                            variant='outlined' 
                            size='large'>{ setCaption('submit-answers') }</Button>
                        </div>
                        {
                            isQuizFinish &&
                            <div className={classes.quizResult}>
                                <p className={classes.quizResultText}>
                                    { `Score: ${quizScore}/${quizData.length}` }
                                </p>
                                <p className={classes.quizResultMessage}>
                                    { getScoreMessage(quizScore) }
                                </p>
                            </div>
                        }
                    </div>
                </div>
            }
            {
                (!isQuizMode && isDiscussMode) &&
                <div className={classes.discussion}>
                    {
                        messageItems.length > 0 && messageItems.map((item) => {
                            return (
                                <div key={item.id} className={classes.message}>
                                    <div className={classes.close}>
                                        <IconButton onClick={handleDeleteMessage(item.gid)}>
                                            <ClearIcon sx={{color: '#999', fontSize: '1rem'}} />
                                        </IconButton>
                                    </div>
                                    <p className={classes.messageText}>
                                    { item.content }
                                    </p>
                                </div>
                            )
                        })
                    }
                    {
                        isLoading &&
                        <div className={classes.loadingContainer}>
                            <LoadingText />
                        </div>
                    }
                </div>
            }
            {
                (!isQuizMode && isDiscussMode) &&
                <div className={classes.inputbar}>
                    <div className={classes.chat}>
                        <Box 
                        component="form" 
                        onSubmit={handleSubmit}
                        noValidate>
                            <TextField 
                            placeholder={setCaption('placeholder-inquiry')}
                            disabled={isLoading}
                            fullWidth
                            multiline
                            maxRows={6}
                            inputRef={inputRef}
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            inputProps={{
                                className: classes.chatInput,
                            }}
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
            }
            {
                openEditTopic && createPortal(
                    <DialogTopic 
                    icon={<SettingsIcon />}
                    dialogTitle={setCaption('edit-topic')}
                    buttonTitle={setCaption('save')}
                    id={params.id}
                    defaultTopic={topicText}
                    defaultSubTopic={subTopicText}
                    onConfirm={handleEditTopic}
                    onClose={() => setOpenEditTopic(false)}
                    />,
                    document.body
                )
            }
            {
                openDialog && createPortal(
                    <Dialog 
                    param={paramId}
                    icon={<DeleteIcon sx={{fontSize: '1.1rem', marginRight: '5px'}} />}
                    title={setCaption('dialog-delete-entry')}
                    caption={setCaption('dialog-delete-entry2')}
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