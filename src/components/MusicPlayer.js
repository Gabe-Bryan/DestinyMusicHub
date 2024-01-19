import { createElement, useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import {CaretRightOutlined, PauseOutlined, StepBackwardOutlined, StepForwardOutlined, UpOutlined, DownOutlined} from '@ant-design/icons'
import {Button, Space, ConfigProvider, Tooltip, Progress, Slider} from 'antd';
import '../stylesheets/musicPlayerStyle.css';

function YTPlayer () {
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
        setYtPlayer(event.target);
        console.log(ytPlayer, ' event: ', event.target);
        setDuration(event.target.getDuration());
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

    const ytPlay = () => {
        setPlaying(true);
    }

    const ytPause = () => {
        setPlaying(false);
    }

    const nextSong = () => {
        ytPlayer.nextVideo();
    }
    const prevSong = () => {
        ytPlayer.previousVideo();
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
            setInterval(() => {
                setTime(ytPlayer.getCurrentTime());
            }, 10)
        }
    });

    return (
        <div className = 'music-bar-container'>
            <Tooltip position = 'top' title = 'Expand music bar' mouseLeaveDelay={0.1}>
                <Button shape = 'circle' size = 'large' icon = {expIcon} style = {{margin: '10px 20px'}} onClick = {expand} ghost />
            </Tooltip>
            <div className='Yt-block' style = {{display: 'block', width: '1fr'}}>
                <YouTube videoId = 'YKQvTsHIVAg' opts = {ytOpts} style = {{ padding: '10px'}} onReady = {readyPlayer} onPause={ytPause} onPlay={ytPlay} YouTube/>
            </div>
            <ConfigProvider
                theme={{
                    components:{
                        Button: {
                            defaultColor: '#ffffff',
                            colorPrimaryHover: '#fcba03',
                            colorBgContainer: '#222222'
                        },
                    }
                }}> 
                <div className = {`music-bar${expanded? ' expanded' : ''}`}>
            
                    <div>
                    </div>
                    
                    <div style = {{display: 'block', textAlign: 'center', margin: '10px'}}>
                        <Space style={{}}>
                            <Button buttonType = 'primary' onClick = {prevSong} shape = 'circle' icon = {<StepBackwardOutlined />} />
                            <Button buttonType = 'primary' onClick = {playYt} shape = 'circle' icon = {playing? <PauseOutlined/> : <CaretRightOutlined/>} />
                            <Button buttonType = 'primary' onClick = {nextSong} shape = 'circle' icon = {<StepForwardOutlined />} />
                        </Space>
                        {/* <Progress percent={parseInt(time/duration * 100)} status="active" /> */}
                        {/* <progress max = {duration} value = {time}></progress> */}
                        <Slider value={time} max = {duration} onChange={ytSeek}/>
                    </div>
                    <div>
                    </div>
                </div>
            </ConfigProvider>
        </div>);
}

function Playlist() {

}

function SongInfo() {
    
}

export {YTPlayer};