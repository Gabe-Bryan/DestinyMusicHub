import { SongItem } from "../components/SongItem";
import { SongPlaylist } from '../components/SongPlaylist.js';   
import { generateSongListFromSources, generateSongSourceList, getAllSongs } from "../util.js";

const allSongs= await getAllSongs();
const allSongSources = generateSongSourceList(allSongs)
//console.log("#####allsongsources####",allSongSources)
 for(let songs of allSongSources ){
     console.log(songs)
 }

export function CompleteMusic({ twoColumn = false }) {
    
    return (
        <div className="App">
            <header className="App-header">
                <h1>Complete Music Page</h1>
            </header>
            <div>
                <h2>Unofficial Soundtracks / Released Music:</h2>
                
                {/* <SongPlaylist playlistData={allSongs}/> */}
            
            </div>
        </div>
    );

}