import React from 'react'
import "./styles/Playlist.css"

import { PlaylistItem } from "./PlaylistItem"

export function Playlist({ playlistData }) {

    function getSongList(playlistDataIn) {
        let songList = []
        for (let songItem of playlistDataIn)
            songList.push(
                <li key={songItem.track}> 
                    <PlaylistItem  songData={songItem} />
                </li>
            )
        return songList
    }

    const songList = getSongList(playlistData)

    return (
        <div id="playlist-container">
            <ul id="song-list">
                <li id="header">
                    <span>track</span>
                    <span>title</span>
                    <span>length</span>
                </li>
                {songList}
            </ul>
        </div>
    )
}