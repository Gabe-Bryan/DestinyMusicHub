import { SongPlaylist } from '../components/SongPlaylist.js';
import { SoundtrackBanner } from "../components/SoundtrackBanner.js";
import { getSongListFromSoundtrackId,getAllSoundtracks, generateSongSourceList, getAllSongs,getCoverArtPath } from "../util.js";

let soundtracks = await getAllSoundtracks();
const allSongs = await getAllSongs();
const allSongSources = generateSongSourceList(allSongs)
// console.log("#####allsongsources####",allSongSources)

function generateAllSongsFromSoundtrack(soundtracks,playNewSong,queueNewSong,soundtrackSongOptions){
    let allBanners = [];
    for (let soundtrack of soundtracks) {
        let songlist=getSongListFromSoundtrackId(soundtrack._id,allSongSources,false);
        console.log("### SONGLIST ###", songlist);
        allBanners.push(generateSourceSongsFromSoundtrack(songlist,soundtrack.title,playNewSong,queueNewSong,soundtrackSongOptions));
    }
    // console.log(allBanners,soundtracks,allSongSources)
    return (<center>{allBanners}</center>)
}



function generateSourceSongsFromSoundtrack(soundtrack,title,playNewSong,queueNewSong,soundtrackSongOptions) {
    let allSourceSong = []
    for (let songs of soundtrack) {
        allSourceSong.push(generateSongItems(songs,playNewSong,queueNewSong,soundtrackSongOptions));
        console.log("### ALLSONGSOURCE ###", allSourceSong);
    }
    return (<SoundtrackBanner
        bannerText={title}
        coverSrc={getCoverArtPath(title)}
        >
            {<div style={{textAlign: "left", padding:"0rem 1rem"}}>{allSourceSong}</div>}
            </SoundtrackBanner>)
}



function generateSongItems(songItem,playNewSong,queueNewSong,soundtrackSongOptions) {
    return (
        <div>
            <SongPlaylist playlistData={songItem} playNewSong={playNewSong} queueNewSong={queueNewSong} soundtrackSongOptions={soundtrackSongOptions} />
        </div>
    )
}

export function CompleteMusic({ playNewSong, queueNewSong}) {

    let soundtrackSongOptions = [
        {
            text: "Add to Queue",
            onClick: (e, songData) => {
                // console.log("#event", e, "#songData", songData);
                queueNewSong(songData);
            },
        },
        {
            text: "Open source",
            onClick: (e, songData) => {
                // console.log("#event", e, "#songData", songData)
            }
        }
    ];

    return (
        <div className="App">
            <header className="App-header">
                <h1>Complete Music Page</h1>
            </header>
            <div>
                <h2>Unofficial Soundtracks / Released Music:</h2>
                <div className="song-playlist-container" >
                        
                        {generateAllSongsFromSoundtrack(soundtracks,playNewSong,queueNewSong,soundtrackSongOptions)}
                        
                </div>
            </div>
        </div>
    );

}