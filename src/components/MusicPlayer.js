import { createElement, useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import {CaretRightOutlined, PauseOutlined, StepBackwardOutlined, StepForwardOutlined, UpOutlined, DownOutlined, SoundOutlined} from '@ant-design/icons'
import {Button, Space, ConfigProvider, Tooltip, Progress, Slider, Row, Col, Flex} from 'antd';
import '../stylesheets/musicPlayerStyle.css';
import { PlaylistItem } from './PlaylistItem';
import { secondsToTimestamp } from '../util';

const expandTransition = 600;//ms for youtube embed to change size/shape
const expandPercent = 135/63;


/**
 * Song queue and prevQueue are structured as followed
 * songQueue: [source1, source2, ...sourceN],      -- This is the current queue
 * prevQueue: [source1, source2, ...sourceM],  -- This is the list of songs that have been played already
 * The song queue is always plaing songQueue[0]
 */
function YTPlayer ({songQueue, prevQueue}) {
    //Expansion info
    const [expanded, setExpanded] = useState(false);
    const [expIcon, setExpIcon] = useState(<UpOutlined/>);
    //Player info
    const [ytPlayer, setYtPlayer] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [pSize, setPSize] = useState(1);
    //Info about video playing
    const [duration, setDuration] = useState(1);
    const [time, setTime] = useState(0);

    const ytOpts = {
        width: 112 * pSize, 
        height: 63 * pSize,
        playerVars: {
            controls: 0
        }
    }

    const readyPlayer = (event) => {
        if(songQueue.length > 0){
            event.target.loadVideoById({videoId: songQueue[0].videoId, startSeconds: 0});
        }
        //Assigns the player as soon as it's ready
        setYtPlayer(event.target);
    };

    const playYt = () => {
        const pState = ytPlayer.getPlayerState();
        if(pState == 1 || pState == 3) {
            ytPlayer.pauseVideo();
        } else {
            ytPlayer.playVideo();
        }
    };

    const ytStateChange = (event) => {
        if(event.data == 0){
            nextSong();
        }
    }

    const nextSong = () => {
        if(songQueue.length > 1) {
            const currSong = songQueue.shift();
            prevQueue.push(currSong);
            ytPlayer.loadVideoById({videoId: songQueue[0].videoId, startSeconds: 0});
        }
    }
    const prevSong = () => {
        if (prevQueue.length > 0) {
            const prevSong = prevQueue.pop();
            songQueue.unshift(prevSong);
            ytPlayer.loadVideoById({videoId: songQueue[0].videoId, startSeconds: 0});
        }
    }

    const ytSeek = (timeStamp) => {
        ytPlayer.seekTo(timeStamp);
    }

    const expand = () => {
        
        setStartTime(new Date().getTime());
        setExpanded(!expanded);
        if(expanded){
            //setPSize(['200', '110']);
            
            setExpIcon(<UpOutlined/>);
        } else {
            //setPSize(['0', '0']);
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
    const [startTime, setStartTime] = useState(0);
    const interval = 5;
    useEffect(() => {
        if ((expanded && pSize != expandPercent) || (!expanded && pSize != 1)) {
            const loop = setInterval(() => {
                const currTime = new Date().getTime();
                const change = (currTime-startTime)/expandTransition * (expandPercent - 1) * (expanded ? 1 : -1);
                const base = expanded ? 1 : expandPercent;
                const newSize = base + change;
                setPSize(Math.max(Math.min(newSize, expandPercent), 1));
            }, interval)
            return () => clearInterval(loop);
        }
    });

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
                <div className = {`music-bar${expanded? ' expanded' : ''}`}>
            
                    <div className='current-song-container'>
                        <div className={`yt-block${expanded ? ' expanded' : ''}`}>
                            <YouTube className = 'yt-player' opts = {ytOpts} 
                                onReady = {readyPlayer} 
                                onPause={() => setPlaying(false)} 
                                onPlay={() => setPlaying(true)} 
                                onStateChange={ytStateChange}
                                YouTube/>
                        </div>
                        <CurrentSongDisplay currentSong={songQueue[0]} expanded = {expanded}/>
                    </div>
                    
                    <div style = {{display: 'block', textAlign: 'center', margin: '10px'}}>
                        <Space>
                            <Button buttonType = 'primary' onClick = {prevSong} shape = 'circle' icon = {<StepBackwardOutlined />} disabled = {prevQueue.length == 0}/>
                            <Button buttonType = 'primary' onClick = {playYt} shape = 'circle' icon = {playing? <PauseOutlined/> : <CaretRightOutlined/>} disabled = {songQueue.length == 0}/>
                            <Button buttonType = 'primary' onClick = {nextSong} shape = 'circle' icon = {<StepForwardOutlined />} disabled = {songQueue.length < 2} />
                        </Space>
                        <Slider value={time} max = {duration} 
                            onChange={ytSeek}
                            tooltip={{formatter: secondsToTimestamp}}/>
                        <PlayerQueue songQueue = {songQueue}
                            disabled = {!expanded}/>
                    </div>
                    <div>
                        <PlayerOptions expanded = {expanded} ytPlayer={ytPlayer}/>
                    </div>
                </div>
            </ConfigProvider>
        </div>);
}

function PlayerQueue({songQueue, disabled}) {
    
    const buildQueue = () => {
        let newQueue = [];
        let count = 1;
        for(let song of songQueue){
            newQueue.push(
            <li key = {count}>
                <PlaylistItem songData = {
                    {track: count, 
                    title: song.title, 
                    intensity: song.intensity,
                    length: secondsToTimestamp(song.duration)}}
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
            <div></div>
            <Flex className = 'volume-bar'>
                <SoundOutlined style = {{paddingRight: '10px', color: '#ffffff'}}/>
                <Slider defaultValue={100} max = {100} 
                    style = {{width: '100%'}} 
                    onChange = {setVolume}
                    tooltip={{formatter: (value) => `${value}%`}}/>
            </Flex>
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