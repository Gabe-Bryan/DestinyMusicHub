import React from 'react'
//import './styles/PlaylistItem.css'

export function SongItem({ completeTitle,songData, onClick=undefined }) {

    function clickHandler(event) {
        console.log(`Do thing to play [${songData.track}. ${songData.title}]`)
    }

    return (
        <div id="playlist-item-container">
            <span id="title">{completeTitle}</span>
        </div>
    );
}