import React from "react";
import {Button, Layout, Input, Space} from "antd";
import { Header } from "antd/es/layout/layout";

function enter(){
    console.out("this")
}

function AddSongForm(){
    return(
        <Header>
            <Button ghost>Enter</Button>
            <Button ghost>new button</Button>
        </Header>
    )
}
export default AddSongForm