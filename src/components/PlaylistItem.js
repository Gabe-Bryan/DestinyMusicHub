import React from 'react'
import './styles/PlaylistItem.css'

export function PlaylistItem({ songData, hasPlayButton = false, onClick = undefined }) {

    // function clickHandler(event) {
    //     console.log(`Do thing to play [${songData.track}. ${songData.title}]`)
    //     console.log(event.currentTarget);
    //     console.log(event.target);
    //     console.log(event);
    // }

    return (
        <div id="playlist-item-container" onClick={!hasPlayButton ? onClick : undefined}>
            <span id="track">{songData.track}</span>
            <span id="play-button">{hasPlayButton && (<PlayButton onClick={onClick} />)}</span>
            <span id="title">{songData.title}</span>
            <span id="intensity">{songData.intensity}</span>
            <span id="length">{songData.length}</span>
            <button id="options-button">{"\u{FE19}"}</button>
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

export function OptionsMenu( { options=["Option1","Option2","Option3"] } ) {

}