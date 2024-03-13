import './styles/SongItem.css';
import { useState } from "react";

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
		<div className='song-item-container'>
			<div className = 'track' >{data.track}</div>
			<div className = 'title' onClick={expand}>{data.title}</div>
			<div id="dropdown" className={isExpanded}>
				<p>does this work</p>
				{/* <Playlist playlistData={songData}/> */}
			</div>
		</div>
	);
}

export {SongItem};