import { createElement, useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import {CaretRightOutlined, PauseOutlined, StepBackwardOutlined, StepForwardOutlined, UpOutlined, DownOutlined, SoundOutlined} from '@ant-design/icons'
import {Button, Space, ConfigProvider, Tooltip, Progress, Slider, Row, Col, Flex} from 'antd';
import '../stylesheets/musicPlayerStyle.css';
import { PlaylistItem } from './PlaylistItem';
import { secondsToTimestamp } from '../util';
import { getVideoDuration } from '../apicalls';



/**
 * Song queue and prevQueue are structured as followed
 * songQueue: [source1, source2, ...sourceN],      -- This is the current queue
 * prevQueue: [source1, source2, ...sourceM],  -- This is the list of songs that have been played already
 * The song queue is always plaing songQueue[0]
 */
function YTPlayer ({songQueue, setSongQueue, prevQueue, setPrevQueue}) {
    let ytOpts = {
        width: 200, 
        height: 110,
        playerVars: {
            controls: 0
        }
    };

    const [ytPlayer, setYtPlayer] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [pSize, setPSize] = useState(['200', '110']);
    const [expanded, setExpanded] = useState(false);
    const [expIcon, setExpIcon] = useState(<UpOutlined/>);
    const [duration, setDuration] = useState(1);
    const [time, setTime] = useState(0);

    

    const readyPlayer = (event) => {
        if(songQueue.length > 0){
            event.target.loadVideoById({videoId: songQueue[0].videoId, startSeconds: 0});
        }
        //Assigns the player as soon as it's ready
        setYtPlayer(event.target);
        console.log(ytPlayer, ' event: ', event.target);
    };

    const playYt = () => {
        console.log(ytPlayer);
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
            setSongQueue(songQueue);
            prevQueue.push(currSong);
            setPrevQueue(prevQueue);
            ytPlayer.loadVideoById({videoId: songQueue[0].videoId, startSeconds: 0});
        }
    }
    const prevSong = () => {
        if (prevQueue.length > 0) {
            const prevSong = prevQueue.pop();
            setPrevQueue(prevQueue);
            songQueue.unshift(prevSong);
            setSongQueue(songQueue);
            ytPlayer.loadVideoById({videoId: songQueue[0].videoId, startSeconds: 0});
        }
    }

    const ytSeek = (timeStamp) => {
        console.log(timeStamp);
        ytPlayer.seekTo(timeStamp);
    }

    const expand = () => {
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
                console.log('effect happened');
                setTime(ytPlayer.getCurrentTime());
                setDuration(ytPlayer.getDuration());
            }, 200)
            return () => clearInterval(loop);
        }
    });

    return (
        <div className = 'music-bar-container'>
            <Tooltip position = 'top' title = 'Expand music bar' mouseLeaveDelay={0.1}>
                <Button shape = 'circle' size = 'large' icon = {expIcon} style = {{margin: '10px 20px'}} onClick = {expand} ghost />
            </Tooltip>
            <div className='Yt-block'>
                <YouTube opts = {ytOpts} style = {{ padding: '10px'}} 
                    onReady = {readyPlayer} 
                    onPause={() => setPlaying(false)} 
                    onPlay={() => setPlaying(true)} 
                    onStateChange={ytStateChange}
                YouTube/>
            </div>
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
            
                    <div>
                        <PlayerQueue songQueue = {songQueue}
                            disabled = {!expanded}/>
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

                    </div>
                    <div>
                        <PlayerOptions expanded = {expanded} ytPlayer={ytPlayer}/>
                    </div>
                </div>
            </ConfigProvider>
        </div>);
}

function PlayerQueue({songQueue, disabled}) {
    const [queue, setQueue] = useState([]);
    
    useEffect(() => {
        const buildQueue = () => {
            let newQueue = [];
            let count = 1;
            for(let song of songQueue){
                console.log("Duration: ", queue)
                newQueue.push(
                <li key = {count}>
                    <PlaylistItem songData = {
                        {track: count, 
                        title: song.title, 
                        length: secondsToTimestamp(song.duration)}}
                    /> 
                </li>);
                count++;
            }
            setQueue(newQueue);
        }
        if (queue.length != songQueue.length)
            buildQueue();
    }, []);
    return  (
            <div id="playlist-container" style={{display: disabled ? "none" : "block"}}>
                <ul id="song-list">
                    <li id="header">
                        <span>queue</span>
                        <span>title</span>
                        <span>length</span>
                    </li>
                    {queue}
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

export {YTPlayer};