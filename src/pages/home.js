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
import { SongPlaylist } from '../components/SongPlaylist.js';
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
            <SongPlaylist playlistData={[
              {"_id":{"$oid":"65cac3d6bad846dd6181fc42"},
              "title":"Gambit / Shell of What Was",
              "meta_data":{
                "lead_composer":"Kris Dirksen, Skye Lewin, Michael Salvatori",
                "game":"2","release_year":"2018",
                "implementation_year":"2018",
                "faction":"The Taken, The Drifter",
                "tags":["complete"]},
                "sources":[{
                  "video_id":"z60BFLUBEpI","source_type":"Youtube",
                  "intensity":["Ambient","Soundtrack Edition"],
                  "track_number":32,
                  "is_official":true,
                  "version_title":"Gambit",
                  "soundtrack_id":"65b834f6bad846dd6181fc2b",
                  "duration":202},

                  {"video_id":"358iGrX8gIo",
                  "source_type":"Youtube",
                  "intensity":["Action","Soundtrack Edition"],
                  "track_number":17,
                  "is_official":true,
                  "version_title":"Shell of What Was",
                  "soundtrack_id":"65b834f6bad846dd6181fc2b",
                  "duration":106},

                  {"video_id":"pCjl94eENa4",
                  "source_type":"Youtube",
                  "intensity":["Ambient"],
                  "version_title":"Gambit",
                  "soundtrack_id":"65b834f6bad846dd6181fc2b",
                  "duration":209},
                  
                  {"video_id":"tOfGBYS0AjQ",
                  "source_type":"Youtube",
                  "intensity":["Tension"],
                  "soundtrack_id":"65b834f6bad846dd6181fc2b",
                  "duration":197},

                  {"video_id":"UwNeytrnudU",
                  "source_type":"Youtube",
                  "intensity":["Tension"],
                  "add_layers":["+Action Layer"],
                  "soundtrack_id":"65b834f6bad846dd6181fc2b",
                  "duration":197},

                  {"video_id":"avPhyWMWTz8",
                  "source_type":"Youtube","intensity":["Action"],"version_title":"Shell of What Was","soundtrack_id":"65b834f6bad846dd6181fc2b","duration":241},

                  {"video_id":"OlHMM3Hl7ac","source_type":"Youtube","intensity":["High Action"],"version_title":"Shell of What Was","soundtrack_id":"65b834f6bad846dd6181fc2b","duration":270},
                  
                  {"video_id":"Hr5kl1A-GOA","source_type":"Youtube","intensity":["Ambient"],"version_title":"Gambit (Queenswalk)","soundtrack_id":"65b834f6bad846dd6181fc2b","duration":206},
                  
                  {"video_id":"FeJFRAAf9js","source_type":"Youtube","intensity":["Action"],"version_title":"Shell of What Was (Queenswalk)","soundtrack_id":"65b834f6bad846dd6181fc2b","duration":209},
                  
                  {"video_id":"7zYE0YPOd3E","source_type":"Youtube","intensity":["High Action"],"version_title":"Shell of What Was (Queenswalk)","soundtrack_id":"65b834f6bad846dd6181fc2b","duration":271}]}]}
            >
            </SongPlaylist>
            <h2> Featured Tracks</h2> 
            <Slideshow images ={[seasonOfPlunder, lightfall]} 
              texts = {[seasonOfPlunderText, lightfallText]} fontsizes = {['24pt', '22pt']}
              style = {{margin: 'auto', padding: '2%'}}/>
            
            <Slideshow images ={[seasonOfPlunder, lightfall]} 
              texts = {[seasonOfPlunderText, lightfallText]} fontsizes = {['24pt', '22pt']}
              style = {{margin: 'auto', padding: '2%'}}/>
            
            {/* <div class = 'footer'>
                <p>Created by Gabriel Bryan 2023</p>
                
            </div> */}
        </body>
    </div>
  );
}

export {Home};
