import React from 'react'
import './styles/PlaylistItem.css'

export function PlaylistItem({ songData, hasPlayButton = false, onClick = undefined, hasOptionsButton = false, options = undefined }) {

    // function clickHandler(event) {
    //     console.log(`Do thing to play [${songData.track}. ${songData.title}]`)
    //     console.log(event.currentTarget);
    //     console.log(event.target);
    //     console.log(event);
    // }

    return (
        <div id="item-container" onClick={!hasPlayButton ? onClick : undefined}>
            <div id="item-track">{songData.track}</div>
            <div id="item-play-button">
                {hasPlayButton && (<PlayButton onClick={onClick} />)}
            </div>
            <div id="item-title">{songData.title}</div>
            <div id="item-intensity">{songData.intensity}</div>
            <div id="item-length">{songData.length}</div>
            <div id="item-options">
                {hasOptionsButton && <button id="item-options-button">{"\u{FE19}"}</button>}
            </div>
        </div>
    )
}

function PlayButton({ onClick }) {

    let playChar = "\u{25B6}"

    return (
        <>
            <button id="play-button" onClick={onClick}>
                {playChar}
            </button>
        </>
    );
}

export function OptionsMenu({ options = ["Option1", "Option2", "Option3"] }) {

}