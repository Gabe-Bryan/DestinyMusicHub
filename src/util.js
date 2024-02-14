const secondsToTimestamp = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return minutesSecondsTimestamp(minutes, seconds);
}

const minutesSecondsTimestamp = (minutes, seconds) => {
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
* 
* fucking nerd - Alan
*/
const linearVectorInterpolation = (point1, point2, r) => {
    const [x1, y1] = [point1.width || point1.x, point1.height || point1.y];
    const [x2, y2] = [point2.width || point2.x, point2.height || point2.y];

    const y = y1 + (y2-y1) * r;
    const x = x1 + (x2 - x1) * r;
    return {x: x, y: y};
}

const parseSongVersion = (song, sourceIndex) => {
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

const parseSoundtrack = (soundtrack, officialOnly = false) => {
    let parsedSoundtrack = [];
    for (let song of soundtrack) {
        let songGroup = [];
        for (let i = 0; i < song.sources.length; i++){
            let parsedSongVersion = parseSongVersion(song, i);
            if (officialOnly){
                if(parsedSongVersion.isOfficial){
                    parsedSongVersion.push(parsedSongVersion);
                }
            }else{
                songGroup.push(parsedSongVersion);
            }
        }
        if(!officialOnly){
            parsedSoundtrack.push(songGroup);
        }
    }
    return parsedSoundtrack;
}

export {secondsToTimestamp, minutesSecondsTimestamp, linearVectorInterpolation};