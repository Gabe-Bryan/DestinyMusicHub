import { SongItem } from "../components/SongItem";
import { SongPlaylist } from '../components/SongPlaylist.js';
import { generateSongListFromSources, generateSongSourceList, getAllSongs } from "../util.js";

const allSongs = await getAllSongs();
const allSongSources = generateSongSourceList(allSongs)
//console.log("#####allsongsources####",allSongSources)

function generateAllSourceSongs() {
    let allSourceSong = []
    for (let songs of allSongSources) {
        allSourceSong.push(generateSongItems(songs));
    }
    return allSourceSong
}

function generateSongItems(songItem) {
    return (
        <div>
            <SongPlaylist playlistData={songItem} />
        </div>
    )
}

export function CompleteMusic({ twoColumn = false, Song }) {

    return (
        <div className="App">
            <header className="App-header">
                <h1>Complete Music Page</h1>
            </header>
            <div>
                <h2>Unofficial Soundtracks / Released Music:</h2>
                <div className="song-playlist-container">
                        <div className="header">
                            <div className="track">track #'s</div>
                            <div className="title">title</div>
                        </div>
                        {generateAllSourceSongs()}
                </div>
            </div>
        </div>
    );

}