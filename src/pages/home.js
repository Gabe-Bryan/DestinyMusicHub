import React from 'react';
import '../components/MusicPlayer.js';
import seasonOfPlunder from "../resources/season_of_plunder.jpg";
import lightfall from '../resources/lightfall.jpg';
import Slideshow from '../components/Slideshow.js';
import '../stylesheets/style.css'

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
				<Slideshow images={[seasonOfPlunder, lightfall]}
					texts={[seasonOfPlunderText, lightfallText]} fontsizes={['24pt', '22pt']}
					style={{ margin: 'auto', padding: '2%' }} />

				<Slideshow images={[seasonOfPlunder, lightfall]}
					texts={[seasonOfPlunderText, lightfallText]} fontsizes={['24pt', '22pt']}
					style={{ margin: 'auto', padding: '2%' }} />

			</body>
		</div>
	);
}

export { Home };
