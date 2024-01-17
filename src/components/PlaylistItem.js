import React from 'react'
import './styles/PlaylistItem.css'

export function PlaylistItem({ songData }) {
    return (
        <div id="playlist-item-container">
            <span id="track">{songData.track}</span>
            <span id="title">{songData.title}</span>
            <span id="length">{songData.length}</span>
        </div>
    )
}