import React, { useState } from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { Home } from './pages/home.js';
import { OfficialMusic } from './pages/OfficialMusic.js';
import Navbar from './components/Navbar.js';
import { YTPlayer } from './components/MusicPlayer.js';
import { CompleteMusic } from './pages/CompleteMusic.js';
//import {ScaleText} from 'react-scale-text';
import './stylesheets/style.css'
const songQueue = [
    { title: "Inner Light", intensity: "Action", videoId: '7Qyu5TtvhfA', duration: 500 },
    { title: "The Hunted", intensity: "Action, High Action", videoId: 'YKQvTsHIVAg', duration: 230 },
    { title: "Inner Light", intensity: "Soundtrack Edit", videoId: '4jQ_NbelyZE', duration: 191 }
];
const prevQueue = [];
function App() {
    //Sets whether a song is currently playing
    const [ytPlayer, setYtPlayer] = useState(null);

    //Changes to pause/play depending on current state
    const playYt = () => {
        const pState = ytPlayer.getPlayerState();
        if (pState === 1 || pState === 3) {
            ytPlayer.pauseVideo();
        } else {
            ytPlayer.playVideo();
        }
    };

    //Adds a new song to the end of the queue, pass down through components to use
    const queueNewSong = (newSong) => {
        console.log("### queue song trigger", newSong);
        songQueue.push(newSong);
    }

    //Adds a new song to the front of the queue and plays it, pass down through components to use
    const playNewSong = (newSong) => {
        console.log("### play song trigger", newSong);
        songQueue.unshift(newSong);

        ytPlayer.loadVideoById({ videoId: songQueue[0].videoId, startSeconds: 0 });
        if (ytPlayer.getPlayerState() === 2) {
            ytPlayer.playVideo();
        }
    }

    return (
        <div>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/OfficialMusic' element={<OfficialMusic playNewSong={playNewSong} queueNewSong={queueNewSong} />} />
                    <Route path='/CompleteMusic' element={<CompleteMusic playNewSong={playNewSong} queueNewSong={queueNewSong}/>} />
                </Routes>
                <YTPlayer songQueue={songQueue} prevQueue={prevQueue} ytPlayer={ytPlayer} setYtPlayer={setYtPlayer} playYt={playYt} />
            </BrowserRouter>
        </div>
    );
}



export default App;
