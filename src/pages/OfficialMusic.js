import React from 'react';
import { SoundtrackBanner } from '../components/SoundtrackBanner';
import { Playlist } from '../components/Playlist';

let testData = [
    {
        title: 'song 1',
        track: 1,
        composer: 'anonymous',
        length: 198,
    },
    {
        title: 'song 2',
        track: 2,
        composer: 'anonymous',
        length: 232,
    },
];

export function OfficialMusic() {
    return (
        <div className="App">
            <div className="App-header">
                <h1>Official Music Page</h1>
            </div>
            <body>
                <h2>Official Soundtracks / Released Music:</h2>
                <div id="soundtrack-list-container">
                    <div id="col1">
                        <SoundtrackBanner expanded>
                            <Playlist playlistData={testData}/>
                        </SoundtrackBanner>
                    </div>
                    <div id="col2">
                        <SoundtrackBanner expanded>
                            <Playlist playlistData={testData}/>
                        </SoundtrackBanner>
                    </div>
                </div>
            </body>
        </div>
    );
}