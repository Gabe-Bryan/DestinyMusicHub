import React from 'react'
import "./styles/Playlist.css"

import { PlaylistItem } from "./PlaylistItem"

export function Playlist({ playlistData }) {

    // function clickHandler(event, songItem) {
    //     console.log(`Do play action for [${songItem.track}. ${songItem.title}`)
    // }

    function getSongList(playlistDataIn) {
        let songList = []
        for (let songItem of playlistDataIn)
            songList.push(
                <li key={songItem.track}> 
                    <PlaylistItem songData={songItem}/>
                </li>
            )
        return songList
    }

    const songList = getSongList(playlistData)

    return (
        <div id="playlist-container">
            <ul id="song-list">
                <div id="header">
                    <span id="track">track</span>
                    <span id="play-button"></span>
                    <span id="title">title</span>
                    <span id="intensity">intensity</span>
                    <span id="length">length</span>
                </div>
                {songList}
            </ul>
        </div>
    )
}