import {useState} from 'react'
//import './styles/PlaylistItem.css'
import { Playlist } from "./Playlist"
export function SongItem({ completeTitle,songData, onClick=undefined, expanded = false}) {
    const [isExpanded, setExpanded] = useState(expanded ? "shown" : "hidden");
    function expand(){
        if (isExpanded==="shown") setExpanded("hidden")
        else setExpanded("shown")
    }
    function clickHandler(event) {
        expand()
        console.log(`Do thing to play [${songData.track}. ${songData.title}]`)
    }

    return (
        <div id="playlist-item-container">
            <div id="title" onClick={expand}>{completeTitle}</div>
            <div id="dropdown" className={isExpanded}>
            {/* <Playlist playlistData={songData}/> */}
        </div>
        </div>
    );
}