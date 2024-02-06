import { useState } from "react";
import "../stylesheets/SongItem.css";
//import './styles/PlaylistItem.css'
//import { Playlist } from "./Playlist"
export function SongItem({
	completeTitle,
	songData,
	onClick = undefined,
	expanded = false,
}) {
	const [isExpanded, setIsExpanded] = useState(expanded ? "shown" : "hidden");
	function expand() {
		if (isExpanded === "shown") {
			setIsExpanded("hidden");
			console.log(completeTitle + isExpanded);
		} else {
			setIsExpanded("shown");
			console.log(completeTitle + isExpanded);
		}
	}

	return (
		<div id="soundtrack-container">
			<div id="title" onClick={expand}>
				{completeTitle}
			</div>
			<div id="dropdown" className={isExpanded}>
				<p>does this work</p>
				{/* <Playlist playlistData={songData}/> */}
			</div>
		</div>
	);
}
