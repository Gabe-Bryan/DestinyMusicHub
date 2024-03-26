import './styles/SongItem.css';
import { useState } from "react";
import { SoundtrackBanner } from '../components/SoundtrackBanner';
import { Playlist } from './Playlist';
import { generateSongListFromSources } from "../util"


function SongItem({ data, onClick = undefined, expanded = false }) {
	const [isExpanded, setIsExpanded] = useState(expanded ? "shown" : "hidden");
	function expand() {
		if (isExpanded === "shown") {
			setIsExpanded("hidden");
			console.log(data.title + isExpanded);
		} else {
			setIsExpanded("shown");
			console.log(data.title + isExpanded);
		}
	}
	return (
		<div className='song-item-container' >
			<div className='track' >{data.track}</div>
			<div className='title' onClick={expand}>{data.title}</div>
			<div id="dropdown" className={isExpanded}>
				{console.log(data.SongSources)}
				{/* <p>{data}</p> */}
				
				<Playlist 	playlistData={data.SongSources} 
							hasPlayButtons = {true}
							hasOptionsButtons = {true}/>

			</div>

			 
		</div>
	);
}

export { SongItem };