import React from 'react'
import './styles/PlaylistItem.css'

export function PlaylistItem({ songData }) {

    function clickHandler(event) {
        let track = event.currentTarget.children[0].innerText,
            title = event.currentTarget.children[1].innerText

        console.log(`### CLICK! This will play [${track}. ${title}] once it's implemented.`)
    }

    return (
        <div id="playlist-item-container" onClick={clickHandler}>
            <span id="track">{songData.track}</span>
            <span id="title">{songData.title}</span>
            <span id="length">{songData.length}</span>
        </div>
    )
}