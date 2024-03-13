export const secondsToTimestamp = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return minutesSecondsTimestamp(minutes, seconds);
}

export const minutesSecondsTimestamp = (minutes, seconds) => {
    let timeStamp = minutes + ':';
    if (seconds < 10) {
        timeStamp += '0'
    }
    timeStamp += seconds;
    return timeStamp;
}

/*
* linearly interpolates between two points
* r needs to be between 0 and 1
* points can consist of either {width, height} or {x, y}
*/
export const linearVectorInterpolation = (point1, point2, r) => {
    const [x1, y1] = [point1.width || point1.x, point1.height || point1.y];
    const [x2, y2] = [point2.width || point2.x, point2.height || point2.y];

    const y = y1 + (y2 - y1) * r;
    const x = x1 + (x2 - x1) * r;
    return { x: x, y: y };
}

export const parseSongVersion = (song, sourceIndex) => {
    const parsedSongVersion = {
        title: song.sources[sourceIndex].version_title || song.title,
        videoId: song.sources[sourceIndex].video_id,
        leadComposer: song.meta_data.lead_composer,
        intensity: song.sources[sourceIndex].intensity,

        trackNumber: song.sources[sourceIndex].track_number,
        isOfficial: song.sources[sourceIndex].is_official,
        game: song.meta_data.game,
        duration: song.sources[sourceIndex].duration

    }
    return parsedSongVersion;
}

export const parseSoundtrack = (soundtrack, officialOnly = false) => {
    let parsedSoundtrack = [];
    for (let song of soundtrack) {
        console.log(song);
        let songGroup = [];
        for (let i = 0; i < song.sources.length; i++) {
            let parsedSongVersion = parseSongVersion(song, i);
            if (officialOnly) {
                if (parsedSongVersion.isOfficial) {
                    parsedSongVersion.push(parsedSongVersion);
                }
            } else {
                songGroup.push(parsedSongVersion);
            }
        }
        if (!officialOnly) {
            parsedSoundtrack.push(songGroup);
        }
    }
    return parsedSoundtrack;
}




/*
    ##############################################
    ###   Alan's getSong/getSoundtrack stuff   ###
    ##############################################

    NOTE: still needs to be tied to in duration resolution, etc.
*/

export function generateSongListFromSources(songsData) {
    let songListFromSources = [];
    for (let song of songsData) {
        song.sources.forEach(songSource => {
            songListFromSources.push({
                title: songSource.version_title !== "" ? songSource.version_title : songSource.title,
                track: songSource.track_number || undefined,
                version_title: songSource.version_title,
                is_official: songSource.is_official || undefined,
                soundtrack_id: songSource.soundtrack_id || undefined,
                length: songSource.duration ? secondsToTimestamp(songSource.duration) : "unknown",
                video_id: songSource.video_id || undefined,
                source_type: songSource.source_type || undefined,
                intensity: songSource.intensity || undefined,
            });
        });
    }
    return songListFromSources;
}

export function getSongListFromSoundtrackId(soundtrack_id, songsFromSourcesData, officialOnly = false) {
    let soundtrackSongList = [];
    let addedTrackNumbers = [];
    
    for (let song of songsFromSourcesData) {

        // skip unofficial songs if officialOnly is set
        if (officialOnly && !song.is_official) continue;

        // ensures only 1 song per track is added. not sure if needed.
        // if (addedTrackNumbers.includes(song.track)) continue;

        if (song.soundtrack_id === soundtrack_id) {
            soundtrackSongList.push(song);
            addedTrackNumbers.push(song.track);
        }
    }
    // sort asc by track_number
    soundtrackSongList.sort((a, b) => a.track - b.track);

    return soundtrackSongList;
}

/*  
    #############################
    ###   SERVER CALL STUFF   ###
    #############################
*/

let baseURI = "https://3.144.222.38:5000";

export async function getAllSongs() {
    return await fetch(`${baseURI}/music/songs`).then(async res => await res.json());
}

export async function getAllSoundtracks() {
    return await fetch(`${baseURI}/music/soundtracks`).then(async res => await res.json());
}