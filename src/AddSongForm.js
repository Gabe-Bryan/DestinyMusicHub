import React from "react";
import {Button, Layout, Input, Space, ConfigProvider,theme} from "antd";
import { Content } from "antd/es/layout/layout";

function enter(){
    console.out("this")
}

function AddSongForm(){
    
    return(
        <ConfigProvider
    theme={{
      token: {
        // Seed Token
        colorPrimary: '#7458e2',
        // Alias Token
        colorBgContainer: '#fbf3ff',
        algorithm: theme.compactAlgorithm,
      },
    }}>
        <Content>
            <Space.Compact style={{width:'100%'}}>
            <Input placeholder="Song Title" />
            <Button ghost>Enter</Button>
            </Space.Compact>
        </Content>
        <Content>
            <Space.Compact style={{width:'100%'}}>
            <Input placeholder="Lead Composer" />
            <Button ghost>Enter</Button>
            </Space.Compact>
        </Content>
        </ConfigProvider>
    )
}
export default AddSongForm