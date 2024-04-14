import React from 'react'
import "./styles/Playlist.css"

import { PlaylistItem } from "./PlaylistItem"

let playlistItemKeyVal = 0;

export function Playlist({ playlistData, hasPlayButtons = false, hasOptionsButtons = false, options, playNewSong, queueNewSong }) {

    function getSongList(playlistDataIn) {
        let songList = [];
        for (let songItem of playlistDataIn) {
            songList.push(
                <div key={"div." + songItem.track + "." + songItem.title}>
                    <PlaylistItem
                        key={songItem.track + "." + songItem.title}
                        songData={songItem}
                        hasPlayButton={hasPlayButtons}
                        hasOptionsButton={hasOptionsButtons}
                        options={options}
                        onPlayClick={() => playNewSong(songItem)}
                    />
                </div>
            );
            playlistItemKeyVal++;
        }
        return songList;
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