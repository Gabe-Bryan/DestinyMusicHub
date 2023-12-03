import React, { createElement } from 'react';
import {useState} from 'react';
//import {ScaleText} from 'react-scale-text';
import '../components/MusicPlayer.js';
import seasonOfPlunder from "../resources/season_of_plunder.jpg";
import lightfall from '../resources/lightfall.jpg';
import { YTPlayer } from '../components/MusicPlayer.js';
import Navbar from '../components/Navbar.js';
import Slideshow from '../components/Slideshow.js';
import '../stylesheets/style.css'
//hi does this work
const seasonOfPlunderText = 'Season of plunder was released in 2022. The composers for the soundtrack were: Michael Salvatori, Skye Lewin, Josh Wosser, and Michael Sechrist.';
const lightfallText = 'Lightfall was released in 2022. The composers for the soundtrack were: Michael Salvatori, Sky Lewin, Josh Mosser, Michael Sechrist, Rotem Moav, and Peter Schlosser';


function Home() {
  return (
    <div classname="App">
        <header className="App-header">
            <h1> Destiny Music Hub</h1>
        </header>
        <body>       
            <h2> Featured Tracks</h2> 
            <Slideshow images ={[seasonOfPlunder, lightfall]} texts = {[seasonOfPlunderText, lightfallText]} fontsizes = {['24pt', '22pt']}/>
            
            <Slideshow images ={[seasonOfPlunder, lightfall]} texts = {[seasonOfPlunderText, lightfallText]} fontsizes = {['24pt', '22pt']}/>
            
            <div class = 'footer'>
                <p>Created by Gabriel Bryan 2023</p>
                
            </div>
        </body>
    </div>
  );
}

export {Home};
