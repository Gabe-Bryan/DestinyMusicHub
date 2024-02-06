import { createElement, useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import {LoadingOutlined, CaretRightOutlined, PauseOutlined, StepBackwardOutlined, 
        StepForwardOutlined, UpOutlined, DownOutlined, SoundOutlined} from '@ant-design/icons'
import {Button, Space, ConfigProvider, Tooltip, Spin, Slider, Flex} from 'antd';
import '../stylesheets/musicPlayerStyle.css';
import { PlaylistItem } from './PlaylistItem';
import { linearVectorInterpolation, secondsToTimestamp } from '../util';
import {Playlist} from './Playlist';

const expandTransition = 300;//ms for youtube embed to change size/shape
const expandPercent = 135/63;//height ratio max/min
const timeToRemoveUI = 3250;//ms yt takes to remove ui after playing (timed with my phone)

const minDim = {width: 63, height: 63};
const maxDim = {width: 240, height: 135};

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
function YTPlayer ({songQueue, prevQueue, ytPlayer, setYtPlayer, playYt}) {
    //Expansion info
    const [expanded, setExpanded] = useState(false);
    const [expIcon, setExpIcon] = useState(<UpOutlined/>);
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
        if(songQueue.length > 0){
            event.target.loadVideoById({videoId: songQueue[0].videoId, startSeconds: 0});
        }
        //Assigns the player as soon as it's ready
        setYtPlayer(event.target);
    };


    //Handles state change so that it can start the visuals during loading
    const ytStateChange = (event) => {
        let newLoadStatus = event.data == -1 || event.data == 3;
        if(!loading && newLoadStatus) {
            setLoadFinish(new Date().getTime());
        }
        setLoading(newLoadStatus);
        if(event.data == 0){
            nextSong();
        }
    }

    //Skips the currently playing/selected song
    const nextSong = () => {
        if(songQueue.length > 1) {
            const currSong = songQueue.shift();
            prevQueue.push(currSong);
            ytPlayer.loadVideoById({videoId: songQueue[0].videoId, startSeconds: 0});
        }
    }
    //Skips to the prev song (pulling out of prevQueue)
    const prevSong = () => {
        if (prevQueue.length > 0) {
            const prevSong = prevQueue.pop();
            songQueue.unshift(prevSong);
            ytPlayer.loadVideoById({videoId: songQueue[0].videoId, startSeconds: 0});
        }
    }

    //Jumps a song to the front of the queue and loads it
    const jumpQueue = (index) => {
        const temp = songQueue[index];
        songQueue.splice(index, 1);
        songQueue.unshift(temp);
        ytPlayer.loadVideoById({videoId: songQueue[0].videoId, startSeconds: 0});
    };

    //Jumps to selected timestamp
    const ytSeek = (timeStamp) => {
        ytPlayer.seekTo(timeStamp);
    }

    //Expands/unexpands music player
    const expand = () => {
        setExpandStartTime(new Date().getTime());
        setExpanded(!expanded);
        if(expanded){
            setExpIcon(<UpOutlined/>);
        } else {
            setExpIcon(<DownOutlined/>);
        }
    }

    useEffect(() => {
        if (playing && ytPlayer){
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
        if ((expanded && pSize != expandPercent) || (!expanded && pSize != 1)) {
            const loop = setInterval(() => {
                const currTime = new Date().getTime();
                const change = (currTime-expandStartTime)/expandTransition * (expandPercent - 1) * (expanded ? 1 : -1);
                const base = expanded ? 1 : expandPercent;
                const newSize = base + change;
                setPSize(Math.max(Math.min(newSize, expandPercent), 1));
            }, interval);
            return () => clearInterval(loop);
        }
    });
    const expansionAmount = (pSize - 1)/(expandPercent - 1)
    const ytBlockDim = linearVectorInterpolation(minDim, maxDim, expansionAmount);
    const borderRadius = 50 + (15-50) * expansionAmount;

    const currTime = new Date().getTime();
    const hideEmbed = currTime - loadFinishTime < timeToRemoveUI;
    return (
        <div className = 'music-bar-container'>
            <Tooltip position = 'top' title = 'Expand music bar' mouseLeaveDelay={0.1}>
                <Button shape = 'circle' size = 'large' icon = {expIcon} style = {{margin: '10px 20px'}} onClick = {expand} ghost />
            </Tooltip>
            
            <ConfigProvider
                theme={{
                    components:{
                        Button: {
                            defaultColor: '#ffffff',
                            colorPrimaryHover: '#a265c7',
                            colorBgContainer: '#222222'
                        },
                    }
                }}> 
                <div className = 'music-bar' 
                    style = {{maxHeight: (musicBarMinHeight + (musicBarMaxHeight - musicBarMinHeight) * expansionAmount) + 'px'}}>
            
                    <div className='current-song-container'>
                        <div className={`yt-block${expanded ? ' expanded' : ''}`} 
                            style = {{width: ytBlockDim.x + "px", height: ytBlockDim.y + "px", borderRadius: borderRadius}}>
                            
                            <YouTube className = {`yt-player${hideEmbed && !expanded ? ' loading':''}`} opts = {ytOpts} 
                                onReady = {readyPlayer} 
                                onPause={() => setPlaying(false)} 
                                onPlay={() => setPlaying(true)} 
                                onStateChange={ytStateChange}
                                style = {{left: - ytMinimizationShift + ytMinimizationShift * expansionAmount + "%"}}
                                YouTube/>
                            {hideEmbed && !expanded && 
                            <div className = 'yt-status-display'>
                                
                                <LoadingOutlined
                                    style={{
                                    fontSize: 24,
                                    }}
                                    spin
                                />
                            </div>
                            }
                        </div>
                        <CurrentSongDisplay currentSong={songQueue[0]} expanded = {expanded}/>
                    </div>
                    
                    <div style = {{display: 'block', textAlign: 'center', margin: '10px'}}>
                        <Space>
                            <Button buttonType = 'primary' onClick = {prevSong} 
                                    shape = 'circle' icon = {<StepBackwardOutlined />} disabled = {prevQueue.length == 0}/>
                            <Button buttonType = 'primary' onClick = {playYt} 
                                    shape = 'circle' icon = {playing? <PauseOutlined/> : <CaretRightOutlined/>} disabled = {songQueue.length == 0}/>
                            <Button buttonType = 'primary' onClick = {nextSong} 
                                    shape = 'circle' icon = {<StepForwardOutlined />} disabled = {songQueue.length < 2} />
                        </Space>
                        <Slider value={time} max = {duration} 
                            onChange={ytSeek}
                            tooltip={{formatter: secondsToTimestamp}}/>
                        <PlayerQueue songQueue = {songQueue} disabled={!expanded}
                            onPlayClick={jumpQueue}/>
                    </div>
                    <div>
                        <PlayerOptions expanded = {expanded} ytPlayer={ytPlayer}/>
                    </div>
                </div>
            </ConfigProvider>
        </div>);
}

function PlayerQueue({songQueue, disabled, onPlayClick}) {
    
    const buildQueue = () => {
        let newQueue = [];
        let count = 1;
        for(let song of songQueue){
            const i = count -1;
            newQueue.push(
            <li key = {count}>
                <PlaylistItem songData = {{
                    track: count, 
                    title: song.title, 
                    intensity: song.intensity,
                    length: secondsToTimestamp(song.duration)
                    }} 
                    hasPlayButton onClick={() => onPlayClick(i)}
                /> 
            </li>);
            count++;
        }
        return newQueue;
    }

    return  (
            <div id="playlist-container" style={{display: disabled ? "none" : "block"}}>
                <ul id="song-list">
                    <li id="header">
                        <span id="track">track</span>
                        <span id="play-button"></span>
                        <span id="title">title</span>
                        <span id="intensity">intensity</span>
                        <span id="length">length</span>
                    </li>
                    {buildQueue()}
                </ul>
            </div>
            );
}

function PlayerOptions({expanded = false, ytPlayer}) {
    const setVolume = (value) => {
        ytPlayer.setVolume(value);
    }
    return (
        <div className = {`player-options${expanded ? ' expanded' : ''}`}>
            <div></div>
            <Flex className = 'volume-bar'>
                <SoundOutlined style = {{paddingRight: '10px', color: '#ffffff'}}/>
                <Slider defaultValue={100} max = {100} 
                    style = {{width: '100%'}} 
                    onChange = {setVolume}
                    tooltip={{formatter: (value) => `${value}%`}}/>
            </Flex>
            <div></div>
        </div>
    );
}

function CurrentSongDisplay({currentSong, expanded}) {
    return (
        <div className = {`current-song-display${expanded ? ' expanded' : ''}`}>
            <div className = 'song-title'>
                {currentSong.title}
            </div>
            <div className = 'song-intensity'>
                {currentSong.intensity}
            </div>
        </div>
    );
}

export {YTPlayer};