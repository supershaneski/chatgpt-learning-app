'use client'

import React from 'react'

import PropTypes from 'prop-types'

import { createTheme, ThemeProvider } from '@mui/material/styles'
import NoSsr from '@mui/base/NoSsr'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'

import captions from '../assets/captions.json'
import useCaption from '../lib/usecaption'

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    }
})

function Search({
    onSearch = undefined,
}) {
    
    const setCaption = useCaption(captions)

    const inputRef = React.useRef()

    const [searchText, setSearchText] = React.useState('')

    const handleSearch = (e) => {
        e.preventDefault()

        onSearch(searchText)
        setSearchText('')

        inputRef.current.blur()
    }

    return (
        <NoSsr>
            <ThemeProvider theme={darkTheme}>
                <Box
                component="form" 
                onSubmit={handleSearch}
                noValidate
                >
                    <TextField
                    ref={inputRef}
                    placeholder={setCaption('search')}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <React.Fragment>
                                <InputAdornment position="end">
                                    <IconButton
                                    disabled={searchText.length === 0}
                                    onClick={handleSearch}
                                    >
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            </React.Fragment>
                        ),
                    }}
                    />
                </Box>
            </ThemeProvider>
        </NoSsr>
    )
}

Search.propTypes = {
    /**
     * onSearch handler
     */
    onSearch: PropTypes.func,
}

export default Search