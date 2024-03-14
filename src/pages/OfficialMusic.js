import React from 'react';
import { getAllSongs, getAllSoundtracks, generateSongListFromSources, getSongListFromSoundtrackId, getCoverArtBySoundtrackTitle } from '../util';
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

let witchQueenId = soundtracks[0]._id;
let witchQueenParsed = getSongListFromSoundtrackId(witchQueenId, songsFromSources, true);

console.log("### witch queen soundtrack parsed: ", witchQueenParsed);


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

let colStyle = {
    display: "inline-block",
    border: "solid 0px #f00",
    margin: "1rem",
    verticalAlign: "top",
};

let innerColStyle = {
    margin: "2rem 0rem",
}


/*
    ############################################
    #############   COMPONENT JSX   ############
    ############################################
*/
export function OfficialMusic() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Official Music Page</h1>
            </header>
            <main>
                <h2>Official Soundtracks / Released Music:</h2>
                <div style={containerStyle}>
                    <center>
                    <SoundtrackBanner 
                        expanded 
                        bannerText={soundtracks[0].title} 
                        coverSrc={getCoverArtBySoundtrackTitle(soundtracks[0].title)}
                    >
                        <Playlist
                            hasPlayButtons
                            hasOptionsButtons
                            playlistData={witchQueenParsed}
                            options={
                                [
                                    {
                                        text: "Queue song",
                                        onClick: (e, songData) => console.log("#event", e, "#songData", songData),
                                    },
                                    {
                                        text: "Go to source",
                                        onClick: (e, songData) => console.log("#event", e, "#songData", songData),
                                    }
                                ]
                            }
                        />
                    </SoundtrackBanner>
                    </center>
                </div>
            </main>
        </div>
    );

}