import { SongItem } from "../components/SongItem";
import { SongPlaylist } from '../components/SongPlaylist.js';
import { SoundtrackBanner } from "../components/SoundtrackBanner.js";
import { getSongListFromSoundtrackId,getAllSoundtracks, generateSongSourceList, getAllSongs } from "../util.js";

let soundtracks = await getAllSoundtracks();
const allSongs = await getAllSongs();
const allSongSources = generateSongSourceList(allSongs)
//console.log("#####allsongsources####",allSongSources)

function generateSourceSongsFromSoundtrack(soundtracks) {
    let allSourceSong = []
    for (let songs of soundtracks) {
        allSourceSong.push(generateSongItems(songs));
    }
    return (<SoundtrackBanner>{allSourceSong}</SoundtrackBanner>)
}
function generateAllSongsFromSoundtrack(soundtracks){
    let allBanners = [];
    for (let soundtrack of soundtracks) {
        let songlist=getSongListFromSoundtrackId(soundtrack._id,allSongSources,false)
        allBanners.push(generateSourceSongsFromSoundtrack(songlist));
    }
    console.log(allBanners,soundtracks,allSongSources)
    return allBanners
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
                        {/*generateAllSourceSongs()*/}
                        {generateAllSongsFromSoundtrack(soundtracks)}
                </div>
            </div>
        </div>
    );

}