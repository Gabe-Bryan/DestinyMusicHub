import React from 'react'
import "./styles/SongPlaylist.css"

import { SongItem } from "./SongItem"

export function SongPlaylist({ playlistData }) {

    function getSongList(playlistDataIn) {
                    
        return (<SongItem data={playlistDataIn} />);
    }

    const songList = getSongList(playlistData)
    console.log(playlistData)

    return (
        <div className="song-playlist-container">
            <div className="song-list">
                {songList}
            </div>
        </div>
    )
}