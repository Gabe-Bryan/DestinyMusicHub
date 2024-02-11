import React, { createElement } from 'react';
import { useState } from 'react';
//import {ScaleText} from 'react-scale-text';
import '../components/MusicPlayer.js';
import seasonOfPlunder from "../resources/season_of_plunder.jpg";
import lightfall from '../resources/lightfall.jpg';
import { YTPlayer } from '../components/MusicPlayer.js';
import Navbar from '../components/Navbar.js';
import Slideshow from '../components/Slideshow.js';
import '../stylesheets/style.css'
import { SoundtrackBanner } from '../components/SoundtrackBanner.js';
import { Playlist } from '../components/Playlist.js';
//hi does this work
const seasonOfPlunderText = 'Season of plunder was released in 2022. The composers for the soundtrack were: Michael Salvatori, Skye Lewin, Josh Wosser, and Michael Sechrist.';
const lightfallText = 'Lightfall was released in 2022. The composers for the soundtrack were: Michael Salvatori, Sky Lewin, Josh Mosser, Michael Sechrist, Rotem Moav, and Peter Schlosser';

let testData = [
	{
		title: 'song 1',
		track: 1,
		composer: 'anonymous',
		intensity: 'action',
		length: '3:12',
	},
	// {
	// 	title: 'song 2',
	// 	track: 2,
	// 	composer: 'anonymous',
	// 	intensity: 'action',
	// 	length: '2:32',
	// },
	// {
	// 	title: 'song 3',
	// 	track: 3,
	// 	composer: 'anonymous',
	// 	intensity: 'action, adventure',
	// 	length: '3:12',
	// },
	// {
	// 	title: 'song 4',
	// 	track: 4,
	// 	composer: 'anonymous',
	// 	intensity: 'action',
	// 	length: '2:32',
	// },
	// {
	// 	title: 'song 5',
	// 	track: 5,
	// 	composer: 'anonymous',
	// 	intensity: 'action',
	// 	length: '3:12',
	// },
	// {
	// 	title: 'song 6',
	// 	track: 6,
	// 	composer: 'anonymous',
	// 	intensity: 'action',
	// 	length: '2:32',
	// },
	// {
	// 	title: 'song 7',
	// 	track: 7,
	// 	composer: 'anonymous',
	// 	intensity: 'action',
	// 	length: '3:12',
	// },
	// {
	// 	title: 'song 8',
	// 	track: 8,
	// 	composer: 'anonymous',
	// 	intensity: 'action',
	// 	length: '2:32',
	// },
	// {
	// 	title: 'song 9',
	// 	track: 9,
	// 	composer: 'anonymous',
	// 	intensity: 'action',
	// 	length: '3:12',
	// },
	// {
	// 	title: 'song 10',
	// 	track: 10,
	// 	composer: 'anonymous',
	// 	intensity: 'action',
	// 	length: '2:32',
	// },
];

let centeredStyle = {
	position: 'absolute',
	left: '50%',
	top: '50%',
	transform: 'translate(-50%,-50%)',
};

function Home() {
	return (
		<div classname="App">
			{/* <header className="App-header">
				<h1> Destiny Music Hub</h1>
			</header> */}
			<body>
				<div style={centeredStyle}>
					<SoundtrackBanner expanded>
						<Playlist
							hasPlayButtons
							hasOptionsButtons
							playlistData={testData}
						/>
					</SoundtrackBanner>
				</div>
			</body>
			{/* <body>       
            <h2> Featured Tracks</h2> 
            <Slideshow images ={[seasonOfPlunder, lightfall]} 
              texts = {[seasonOfPlunderText, lightfallText]} fontsizes = {['24pt', '22pt']}
              style = {{margin: 'auto', padding: '2%'}}/>
            
            <Slideshow images ={[seasonOfPlunder, lightfall]} 
              texts = {[seasonOfPlunderText, lightfallText]} fontsizes = {['24pt', '22pt']}
              style = {{margin: 'auto', padding: '2%'}}/>
            
        </body> */}
		</div>
	);
}

export { Home };
