import React from 'react'
import "./styles/SongPlaylist.css"

import { SongItem } from "./SongItem"

export function SongPlaylist({ playlistData,playNewSong,queueNewSong,soundtrackSongOptions }) {

    //console.log(playlistData)
    function getSongList(playlistDataIn) {
                    
        return (<SongItem data={playlistDataIn} playNewSong={playNewSong} queueNewSong={queueNewSong} soundtrackSongOptions={soundtrackSongOptions}/>);
    }

    const songList = getSongList(playlistData);

    return (
        <div className="song-playlist-container">
            <div className="song-list">
                {songList}
            </div>
        </div>
    )
}