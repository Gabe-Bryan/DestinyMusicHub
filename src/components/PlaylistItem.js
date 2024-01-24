import React from 'react'
import './styles/PlaylistItem.css'

export function PlaylistItem({ songData, hasPlayButton = false, onClick=undefined }) {

    function clickHandler(event) {
        console.log(`Do thing to play [${songData.track}. ${songData.title}]`)
    }

    return (
        <div id="playlist-item-container">
            <span id="track">{songData.track}</span>
            <span id="play-button">{hasPlayButton && (<PlayButton onClick={onClick} />)}</span>
            <span id="title">{songData.title}</span>
            <span id="intensity">{songData.intensity}</span>
            <span id="length">{songData.length}</span>
        </div>
    )
}

function PlayButton({ onClick }) {

    let playChar = "\u{25B6}"

    return (
        <div id="play-button-container">
            <div id="play-button" onClick={onClick}>
                {playChar}
            </div>
        </div>
    );
}