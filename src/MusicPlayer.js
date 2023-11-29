import { useState } from 'react';
import YouTube from 'react-youtube';
import {CaretRightOutlined, PauseOutlined, StepBackwardOutlined, StepForwardOutlined} from '@ant-design/icons'
import {Button, Space, ConfigProvider} from 'antd'

function YTPlayer () {
    const [ytPlayer, setYtPlayer] = useState(null);
    const [pIcon, setPIcon] = useState(<CaretRightOutlined/>);

    const playYt = () => {
        console.log(ytPlayer);
        const pState = ytPlayer.getPlayerState();
        if(pState == 1 || pState == 3) {
            ytPlayer.pauseVideo();
            setPIcon(<CaretRightOutlined/>)
        } else {
            ytPlayer.playVideo();
            setPIcon(<PauseOutlined />);
        }

    };

    const ytOpts = {
        width: '320', 
        height: '200',
        playerVars: {
            controls: 0
        }
    };

    return (
        <div style = {{position: 'fixed', left: '50px', bottom: '50px', zIndex: '500'}}>
              
            
            <YouTube videoId = 'YKQvTsHIVAg' opts = {ytOpts} onReady = {(event) => setYtPlayer(event.target)} YouTube/>
            
            <ConfigProvider
                theme={{
                    token: {
                        primaryColor: '#fff000',
                        colorBgContainer: '#f6ffed',
                    },
                }}> 
                <center className = 'music-bar' >
                    <Space>
                        <Button buttonType = 'primary' shape = 'circle' icon = {<StepBackwardOutlined />} />
                        <Button buttonType = 'primary' onClick = {playYt} shape = 'circle' icon = {pIcon} />
                        <Button buttonType = 'primary' shape = 'circle' icon = {<StepForwardOutlined />} />
                    </Space>
                </center>
            </ConfigProvider>
            
        </div>);
}

export {YTPlayer};