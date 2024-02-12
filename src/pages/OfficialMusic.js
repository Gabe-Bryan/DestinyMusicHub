import React from 'react';
import { SoundtrackBanner } from '../components/SoundtrackBanner';
import { Playlist } from '../components/Playlist';

let testData = [
    {
        title: 'song 1',
        track: 1,
        composer: 'anonymous',
        length: '1:58',
    },
    {
        title: 'song 2',
        track: 2,
        composer: 'anonymous',
        length: '2:32',
    },
];

let colStyle = {
    display: "inline-block",
    border: "solid 0px #f00",
    margin: "1rem",
    verticalAlign: "top",
};

let containerStyle = {
    display: "block",
    border: "solid 0px #f00",
    textAlign: "center",
}

export function OfficialMusic({ twoColumn = true }) {
    return (
        <div className="App">
            <div className="App-header">
                <h1>Official Music Page</h1>
            </div>
            <body>
                <h2>Official Soundtracks / Released Music:</h2>
                <div style={containerStyle}>
                    <div id="col1" style={colStyle}>
                        <SoundtrackBanner expanded>
                            <Playlist playlistData={testData} />
                        </SoundtrackBanner>
                    </div>
                    {twoColumn && <>
                        <div id="col2" style={colStyle}>
                            <SoundtrackBanner expanded>
                                <Playlist playlistData={testData} />
                            </SoundtrackBanner>
                        </div>
                    </>}
                </div>
            </body>
        </div>
    );

}