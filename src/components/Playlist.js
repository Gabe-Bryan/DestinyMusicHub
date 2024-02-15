import React from 'react'
import "./styles/Playlist.css"

import { PlaylistItem } from "./PlaylistItem"

export function Playlist({ playlistData, hasPlayButtons = false, hasOptionsButtons = false }) {

    function getSongList(playlistDataIn) {
        let songList = []
        for (let songItem of playlistDataIn)
            songList.push(
                <li key={songItem.track}>
                    <PlaylistItem songData={songItem} hasPlayButton={hasPlayButtons} hasOptionsButton={hasOptionsButtons} />
                </li>
            )
        return songList
    }

    const songList = getSongList(playlistData)

    return (
        <div id="playlist-container">
            <div id="header">
                <div id="track">track</div>
                <div id="play-button"></div>
                <div id="title">title</div>
                <div id="intensity">intensity</div>
                <div id="length">length</div>
                <div id="item-options"></div>
            </div>
            {songList}
        </div>
    )
}