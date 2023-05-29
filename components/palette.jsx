'use client'

import PropTypes from 'prop-types'

import colors from '../assets/palette.json'

//import { copyToClipboard } from '../lib/utils'

import classes from './palette.module.css'

export default function Palette({
    onClick = undefined,
}) {
    
    const handleClick = (color) => (e) => {

        console.log('select', color)

        onClick(color)

        //e.clipboardData.clearData()
        //e.clipboardData.setData("text/plain", color)
        
        //copyToClipboard(color)

        //onClick(color)

        /*
        try {

            await navigator.clipboard.write([
                new ClipboardItem({
                    'text/plain': new Blob([color], { type: 'text/plain' }),
                })
            ])

        } catch(error) {

            console.log(error)

            //document.execCommand("copy", false, color);
            //navigator.clipboard.writeText(color)

        }
        */

        /*
        try {

            const clipboardItem = new ClipboardItem({
              'text/plain': new Blob([color], { type: 'text/plain' }),
            })
        
            navigator.clipboard.write([clipboardItem]).then(() => {
                console.log('copy to clipboard success')
              }, () => {
                console.log('copy to clipboard failed')
              })
        
          } catch(error) {
            
            console.log(error)
            
            navigator.clipboard.writeText(color).then(() => {
                console.log('copy okay')
            }, (err) => {
                console.log(err)
            })

          }
          */

    }

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <h1 className={classes.pageTitle}>Colors</h1>
            </div>
            <div className={classes.main}>
            {
                colors.palette.map((palette, index) => {
                    return (
                        <section key={index} className={classes.palette}>
                            <h2 className={classes.title}>{palette.name}</h2>
                            {
                                palette.items.map((item, i) => {
                                    return (
                                        <ul key={i} className={classes.list}>
                                        {
                                            item.colors.map((color, k) => {
                                                return (
                                                    <li key={k} className={classes.item}>
                                                        <div className={classes.color}>
                                                            <div 
                                                            onClick={handleClick(color.value)}
                                                            style={{
                                                                backgroundColor: color.value,
                                                            }} className={classes.colorDisplay}></div>
                                                            <h4 className={classes.colorName}>{color.name}</h4>
                                                            <span className={classes.colorValue}>{color.value}</span>
                                                        </div>
                                                    </li>
                                                )
                                            })
                                        }
                                        </ul>
                                    )
                                })
                            }
                        </section>
                    )
                })
            }
            </div>
        </div>
    )
}

Palette.propTypes = {
    /**
     * Click event handler
     * returns selected color
     */
    onClick: PropTypes.func,
}