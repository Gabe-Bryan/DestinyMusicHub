import React from 'react'
import "./styles/SongPlaylist.css"

import { SongItem } from "./SongItem"

export function SongPlaylist({ playlistData }) {

    function getSongList(playlistDataIn) {
        let songList = []
        for (let songItem of playlistDataIn)
            songList.push(
                <li key={songItem.track}> 
                    <SongItem data = {songItem}/>
                </li>
            )
        return songList
    }

    const songList = getSongList(playlistData)

    return (
        <div className="song-playlist-container">
            <ul className="song-list">
                <div className="header">
                    <div className="track">track #'s</div>
                    <div className="title">title</div>
                </div>
                {songList}
            </ul>
        </div>
    )
}