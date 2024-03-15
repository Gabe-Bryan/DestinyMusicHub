import React from 'react';

import {
    getAllSongs, getAllSoundtracks, generateSongListFromSources,
    getSongListFromSoundtrackId, getCoverArtPath
} from '../util';

import { SoundtrackBanner } from '../components/SoundtrackBanner';
import { Playlist } from '../components/Playlist';


/*
    ##############################################
    ###   SERVER DATA FETCHING/PARSING STUFF   ###
    ##############################################
*/
let soundtracks = await getAllSoundtracks();
let songs = await getAllSongs();
let songsFromSources = generateSongListFromSources(songs);


/*
    ##############################################
    ###########   HELPER METHODS/MISC   ##########
    ##############################################
*/
function generateSoundtrackBanner(soundtrack, playNewSong, queueNewSong) {

    let parsedPlaylistData = getSongListFromSoundtrackId(soundtrack._id, songsFromSources, true);

    // dont return soundtracks with no tracks
    // if (parsedPlaylistData.length <= 0) return;

    return (
        <div key={soundtrack._id}>
            <SoundtrackBanner
                bannerText={soundtrack.title}
                coverSrc={getCoverArtPath(soundtrack.title)}
            >
                <Playlist
                    hasPlayButtons
                    hasOptionsButtons
                    playlistData={parsedPlaylistData}
                    options={soundtrackSongOptions}
                />
            </SoundtrackBanner>
        </div>
    );
}

function generateAllSoundtrackBanners(soundtracks) {
    let allBanners = [];
    for (let soundtrack of soundtracks) {
        allBanners.push(generateSoundtrackBanner(soundtrack));
    }
    return allBanners;
}


/*
    ############################################
    ########   COMPONENT STYLING STUFF   #######
    ############################################
*/
let containerStyle = {
    display: "block",
    border: "solid 0px #f00",
    textAlign: "center",

    marginBottom: "13rem",
}


/*
    ############################################
    #############   COMPONENT JSX   ############
    ############################################
*/

let soundtrackSongOptions = [
    {
        text: "Add to Queue",
        onClick: (e, songData) => console.log("#event", e, "#songData", songData),
    },
    {
        text: "Open source",
        onClick: (e, songData) => console.log("#event", e, "#songData", songData),
    }
]

export function OfficialMusic({
    playNewSong = undefined,
    queueNewSong = undefined,
}) {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Official Music Page</h1>
            </header>
            <main>
                <h2 style={{ marginTop: "5rem", marginBottom: "5rem" }}>
                    Official Soundtracks / Released Music:
                </h2>
                <div style={containerStyle}>
                    <center>
                        {generateAllSoundtrackBanners(soundtracks)}
                    </center>
                </div>
            </main>
        </div>
    );

}