import React from 'react';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {Home} from './pages/home.js';
import Navbar from './components/Navbar.js';
import { YTPlayer } from './components/MusicPlayer.js';
import {CompleteDisplay} from "./components/CompleteSoundtrackDisplay.js"
//import {ScaleText} from 'react-scale-text';
import './stylesheets/style.css'
import './stylesheets/Complete-Soundtrack-Container.css'

function App() {
  return (
    <div>
      <CompleteDisplay/>
      {/* <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path = '/' element = {<Home/>}/>
          <Route path = '/OfficialMusic' element = {<Home/>}/>
          <Route path = '/CompleteMusic' element = {<Home/>}/>
        </Routes>
        
        <YTPlayer />
      </BrowserRouter> */}
    </div>
  );
}



export default App;
