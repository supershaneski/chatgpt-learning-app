'use client'

import React from 'react'

import PropTypes from 'prop-types'

import { createTheme, ThemeProvider } from '@mui/material/styles'
import NoSsr from '@mui/base/NoSsr'

import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'

import classes from './search.module.css'

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    }
})

function Search({
    onSearch = () => {},
}) {
    
    const [searchText, setSearchText] = React.useState('')

    const handleSearch = () => {
        onSearch(searchText)
        setSearchText('')
    }

    return (
        <NoSsr>
            <ThemeProvider theme={darkTheme}>
                <FormControl>
                    <TextField
                    //fullWidth
                    //required
                    //label='Search'
                    placeholder={`Search`}
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
                </FormControl>
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