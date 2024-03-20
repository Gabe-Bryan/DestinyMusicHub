import './styles/SongItem.css';
import { useState } from "react";
import { SoundtrackBanner } from '../components/SoundtrackBanner';
function SongItem ({data, onClick = undefined, expanded = false}) {
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
		<div className='song-item-container' onClick={expand}>
			
			<div className = 'track' >{data.track}</div>
			<SoundtrackBanner
        expanded
        coverSrc="./res/destiny1soundtrack.jpg"
        bannerSrc="./res/marc-thompson-sanctum-18.jpg"
        bannerText={data.title}
		children={<p></p>}
      ></SoundtrackBanner>
				
				{/* <Playlist playlistData={songData}/> */}
			
		</div>
	);
}

export {SongItem};