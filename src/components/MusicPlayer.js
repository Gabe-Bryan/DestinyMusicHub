import { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import {
    LoadingOutlined, CaretRightOutlined, PauseOutlined, StepBackwardOutlined,
    StepForwardOutlined, UpOutlined, DownOutlined, SoundOutlined
} from '@ant-design/icons'
import { Button, Space, ConfigProvider, Tooltip, Slider, Flex } from 'antd';
import './styles/musicPlayerStyle.css';
import { PlaylistItem } from './PlaylistItem';
import { linearVectorInterpolation, secondsToTimestamp, intensityStr } from '../util';

const expandTransition = 300;//ms for youtube embed to change size/shape
const expandPercent = 135 / 63;//height ratio max/min
const timeToRemoveUI = 3250;//ms yt takes to remove ui after playing (timed with my phone)

const minDim = { width: 63, height: 63 };
const maxDim = { width: 240, height: 135 };

//calculates the amount that the embed has to shift over since the embed is always 16:9
//the amount is 50% of the width difference between the yt embed and the cropping div
const ytMinimizationShift = (112 - minDim.height) / 2 / minDim.height * 100;// 112 is the width of the actual embed

const musicBarMinHeight = 75;
const musicBarMaxHeight = 300;

//
/**
 * Song queue and prevQueue are structured as followed
 * songQueue: [source1, source2, ...sourceN],      -- This is the current queue
 * prevQueue: [source1, source2, ...sourceM],  -- This is the list of songs that have been played already
 * The song queue is always plaing songQueue[0]
 */
function YTPlayer({ currSong, setCurrSong, songQueue, autoQueue, prevQueue, ytPlayer, setYtPlayer, playYt }) {
    //Expansion info
    const [expanded, setExpanded] = useState(false);
    const [expIcon, setExpIcon] = useState(<UpOutlined />);
    //Player info
    const [pSize, setPSize] = useState(1);
    const [playing, setPlaying] = useState(false);
    //Info about video playing
    const [duration, setDuration] = useState(1);
    const [time, setTime] = useState(0);
    const [loading, setLoading] = useState(false);
    const [loadFinishTime, setLoadFinish] = useState(0);

    const ytOpts = {
        width: 112 * pSize,
        height: 63 * pSize,
        playerVars: {
            controls: 0,
            disablekb: 1,
            fs: 0
        }
    }

    //Assigns the useState for the yt embed (a.k.a. ytPlayer)
    const readyPlayer = (event) => {
        if (currSong !== undefined) {
            event.target.loadVideoById({ videoId: currSong.video_id, startSeconds: 0 });
        }
        //Assigns the player as soon as it's ready
        setYtPlayer(event.target);
    };


    //Handles state change so that it can start the visuals during loading
    const ytStateChange = (event) => {
        let newLoadStatus = event.data === -1 || event.data === 3;
        if (!loading && newLoadStatus) {
            setLoadFinish(new Date().getTime());
        }
        setLoading(newLoadStatus);
        if (event.data === 0) {
            nextSong();
        }
    }

    //Skips the currently playing/selected song
    const nextSong = () => {
        if (currSong !== undefined) {
            let newSong = songQueue.shift()
            setCurrSong(newSong);
            prevQueue.push(currSong);
            ytPlayer.loadVideoById({ videoId: newSong.video_id, startSeconds: 0 });
        }
    }
    //Skips to the prev song (pulling out of prevQueue)
    const prevSong = () => {
        if (currSong !== undefined) {
            const prevSong = prevQueue.pop();
            songQueue.unshift(currSong);
            setCurrSong(prevSong);
            ytPlayer.loadVideoById({ videoId: prevSong.video_id, startSeconds: 0 });
        }
    }

    const dequeueSong = (index) => {
        songQueue.splice(index, 1);
    }

    //Jumps a song to the front of the queue
    const playNow = (index) => {
        const temp = songQueue[index];
        songQueue.splice(index, 1);
        prevQueue.push(currSong);
        setCurrSong(temp);
        ytPlayer.loadVideoById({ videoId: temp.video_id, startSeconds: 0 });
    };

    //Jumps to selected timestamp
    const ytSeek = (timeStamp) => {
        ytPlayer.seekTo(timeStamp);
    }

    //Expands/unexpands music player
    const expand = () => {
        setExpandStartTime(new Date().getTime());
        setExpanded(!expanded);
        if (expanded) {
            setExpIcon(<UpOutlined />);
        } else {
            setExpIcon(<DownOutlined />);
        }
    }

    useEffect(() => {
        if (playing && ytPlayer) {
            const loop = setInterval(() => {
                setTime(ytPlayer.getCurrentTime());
                setDuration(ytPlayer.getDuration());
            }, 200)
            return () => clearInterval(loop);
        }
    });
    //This is used for animating the yt player size changes
    const [expandStartTime, setExpandStartTime] = useState(0);
    const interval = 5;
    useEffect(() => {
        if ((expanded && pSize !== expandPercent) || (!expanded && pSize !== 1)) {
            const loop = setInterval(() => {
                const currTime = new Date().getTime();
                const change = (currTime - expandStartTime) / expandTransition * (expandPercent - 1) * (expanded ? 1 : -1);
                const base = expanded ? 1 : expandPercent;
                const newSize = base + change;
                setPSize(Math.max(Math.min(newSize, expandPercent), 1));
            }, interval);
            return () => clearInterval(loop);
        }
    });
    const expansionAmount = (pSize - 1) / (expandPercent - 1)
    const ytBlockDim = linearVectorInterpolation(minDim, maxDim, expansionAmount);
    const borderRadius = 50 + (15 - 50) * expansionAmount;

    const currTime = new Date().getTime();
    const hideEmbed = currTime - loadFinishTime < timeToRemoveUI;
    return (
        <div className='music-bar-container'>
            <Tooltip position='top' title='Expand music bar' mouseLeaveDelay={0.1}>
                <Button shape='circle' size='large' icon={expIcon} style={{ margin: '10px 20px' }} onClick={expand} ghost />
            </Tooltip>

            <ConfigProvider
                theme={{
                    components: {
                        Button: {
                            defaultColor: '#ffffff',
                            colorPrimaryHover: '#a265c7',
                            colorBgContainer: '#222222'
                        },
                    }
                }}>
                <div className='music-bar'
                    style={{ maxHeight: (musicBarMinHeight + (musicBarMaxHeight - musicBarMinHeight) * expansionAmount) + 'px' }}>

                    <div className='current-song-container'>
                        <div className={`yt-block${expanded ? ' expanded' : ''}`}
                            style={{ width: ytBlockDim.x + "px", height: ytBlockDim.y + "px", borderRadius: borderRadius }}>

                            <YouTube className={`yt-player${hideEmbed && !expanded ? ' loading' : ''}`} opts={ytOpts}
                                onReady={readyPlayer}
                                onPause={() => setPlaying(false)}
                                onPlay={() => setPlaying(true)}
                                onStateChange={ytStateChange}
                                style={{ left: - ytMinimizationShift + ytMinimizationShift * expansionAmount + "%" }}
                                YouTube />
                            {hideEmbed && !expanded &&
                                <div className='yt-status-display'>

                                    <LoadingOutlined
                                        style={{
                                            fontSize: 24,
                                        }}
                                        spin
                                    />
                                </div>
                            }
                        </div>
                        <CurrentSongDisplay currentSong={currSong} expanded={expanded} />
                    </div>

                    <div style={{ display: 'block', textAlign: 'center', margin: '10px' }}>
                        <Space>
                            <Button buttontype='primary' onClick={prevSong}
                                shape='circle' icon={<StepBackwardOutlined />} disabled={prevQueue.length === 0} />
                            <Button buttontype='primary' onClick={playYt}
                                shape='circle' icon={playing ? <PauseOutlined /> : <CaretRightOutlined />} disabled={currSong === undefined} />
                            <Button buttontype='primary' onClick={nextSong}
                                shape='circle' icon={<StepForwardOutlined />} disabled={songQueue.length === 0 && autoQueue.length === 0} />
                        </Space>
                        <Slider value={time} max={duration}
                            onChange={ytSeek}
                            tooltip={{ formatter: secondsToTimestamp }} />
                        <PlayerQueue songQueue={songQueue} disabled={!expanded}
                            onPlayClick={playNow} dequeueSong={dequeueSong}/>
                    </div>
                    <div>
                        <PlayerOptions expanded={expanded} ytPlayer={ytPlayer} />
                    </div>
                </div>
            </ConfigProvider>
        </div>);
}

function PlayerQueue({ songQueue, disabled, onPlayClick, dequeueSong}) {

    const buildQueue = () => {
        let newQueue = [];
        let count = 1;
        for (let song of songQueue) {
            const i = count - 1;
            newQueue.push(
                <li key={count}>
                    <PlaylistItem songData={{
                        track: count,
                        title: song.title,
                        intensity: song.intensity,
                        duration: song.duration,
                    }}
                        options = {[{text: "Dequeue", onClick: () => dequeueSong(i)}]}
                        hasOptionsButton
                        hasPlayButton 
                        onPlayClick={() => onPlayClick(i)}
                    />
                </li>);
            count++;
        }
        return newQueue;
    }

    return (
        <div id="playlist-container" style={{ display: disabled ? "none" : "block", overflowY: "scroll"}}>
            <div id="header">
                <div id="track">position</div>
                <div id="play-button"></div>
                <div id="title">title</div>
                <div id="intensity">intensity</div>
                <div id="duration">length</div>
            </div>
            {buildQueue()}
        </div>
    );
}

function PlayerOptions({ expanded = false, ytPlayer }) {
    const setVolume = (value) => {
        localStorage.setItem('volume', value);
        ytPlayer.setVolume(value);
    }
    return (
        <div className={`player-options${expanded ? ' expanded' : ''}`}>
            <div></div>
            <Flex className='volume-bar'>
                <SoundOutlined style={{ paddingRight: '10px', color: '#ffffff' }} />
                <Slider defaultValue={localStorage.getItem('volume') ? localStorage.getItem('volume') : 100} max={100}
                    style={{ width: '100%' }}
                    onChange={setVolume}
                    tooltip={{ formatter: (value) => `${value}%` }} />
            </Flex>
            <div></div>
        </div>
    );
}

function CurrentSongDisplay({ currentSong, expanded }) {
    console.log("current song", currentSong);
    return (
        <div className={`current-song-display${expanded ? ' expanded' : ''}`}>
            <div className='song-title'>
                {currentSong ? currentSong.title : "No Song Playing..."}
            </div>
            <div className='song-intensity'>
                {currentSong ? intensityStr(currentSong.intensity) : ""}
            </div>
        </div>
    );
}

export { YTPlayer };