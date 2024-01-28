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
*/
const linearVectorInterpolation = (point1, point2, r) => {
    const [x1, y1] = [point1.width || point1.x, point1.height || point1.y];
    const [x2, y2] = [point2.width || point2.x, point2.height || point2.y];
    // const slope = (y2 - y1) / (x2 - x1);
    const y = y1 + (y2-y1) * r;
    const x = x1 + (x2 - x1) * r;
    return {x: x, y: y};
}

export {secondsToTimestamp, minutesSecondsTimestamp, linearVectorInterpolation};