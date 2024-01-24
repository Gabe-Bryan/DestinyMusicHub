import React from 'react'
//import "./styles/Playlist.css"

import { SongItem } from "./SongItem"

export function CompletePlaylist({ playlistData }) {

    function getSongList(playlistDataIn) {
        console.log(playlistDataIn)
        let songList = []
        for (let songItem of playlistDataIn){
            let completeTitle = songItem.title
            if(songItem.sources!==undefined)
                songItem.sources.forEach(source => {
                    if(source.is_official){
                        completeTitle+="/"+source.version_title;
                        console.log(completeTitle);
                    }
                });
                songList.push(
                    <li key={songItem.track}> 
                        <SongItem songData={songItem} completeTitle={completeTitle} />
                    </li>
                )
            }
        return songList
    }

    const songList = getSongList(playlistData)

    return (
        <div id="playlist-container">
            <ul id="song-list">
                <li id="header">
                    <span>track</span>
                    <span>title</span>
                </li>
                {songList}
            </ul>
        </div>
    )
}