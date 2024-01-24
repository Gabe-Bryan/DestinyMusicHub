import React, { useState } from 'react';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {Home} from './pages/home.js';
import Navbar from './components/Navbar.js';
import { YTPlayer } from './components/MusicPlayer.js';
import {getVideoDuration} from './apicalls.js';
//import {ScaleText} from 'react-scale-text';
import './stylesheets/style.css'

function App() {
  const [songQueue, setSongQueue] = useState([ {title: "Inner Light", intensity: "Action", videoId: '7Qyu5TtvhfA', duration: "7:34"}, 
                                               {title: "The Hunted", intensity: "Action, High Action", videoId: 'YKQvTsHIVAg', duration: "3:34"}, 
                                               {title: "Inner Light", intensity: "Soundtrack Edit", videoId: '4jQ_NbelyZE', duration: "3:34"}]);
  const [prevQueue, setPrevQueue] = useState([]);
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path = '/' element = {<Home/>}/>
          <Route path = '/OfficialMusic' element = {<Home/>}/>
          <Route path = '/CompleteMusic' element = {<Home/>}/>
        </Routes>
        <YTPlayer songQueue={songQueue} setSongQueue={setSongQueue} prevQueue={prevQueue} setPrevQueue={setPrevQueue}/>
      </BrowserRouter>
    </div>
  );
}



export default App;
