import React, { useState } from 'react';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {Home} from './pages/home.js';
import Navbar from './components/Navbar.js';
import { YTPlayer } from './components/MusicPlayer.js';
//import {ScaleText} from 'react-scale-text';
import './stylesheets/style.css'
const songQueue =[  {title: "Inner Light", intensity: "Action", videoId: '7Qyu5TtvhfA', duration: 500}, 
                    {title: "The Hunted", intensity: "Action, High Action", videoId: 'YKQvTsHIVAg', duration: 230}, 
                    {title: "Inner Light", intensity: "Soundtrack Edit", videoId: '4jQ_NbelyZE', duration: 191}];
const prevQueue = [];
function App() {
  //Sets whether a song is currently playing
  const [playing, setPlaying] = useState(false);
  
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path = '/' element = {<Home/>}/>
          <Route path = '/OfficialMusic' element = {<Home/>}/>
          <Route path = '/CompleteMusic' element = {<Home/>}/>
        </Routes>
        <YTPlayer songQueue={songQueue} prevQueue={prevQueue} playing = {playing} setPlaying={setPlaying}/>
      </BrowserRouter>
    </div>
  );
}



export default App;
