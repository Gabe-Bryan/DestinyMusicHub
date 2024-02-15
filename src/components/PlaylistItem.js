import React from 'react'
import { useState } from 'react'
import './styles/PlaylistItem.css'

let defaultOptions = [
    {
        text: "Option 1",
        onClick: (event) => console.log(event),
    },
    {
        text: "Option 2",
        onClick: (event) => console.log(event),
    },
    {
        text: "Option 3",
        onClick: (event) => console.log(event),
    },
    {
        text: "Hi gabe",
        onClick: (event) => alert("hi again gabe"),
    },
];


export function PlaylistItem(
    {
        songData = undefined,
        hasPlayButton = false,
        onClick = undefined,
        hasOptionsButton = false,
        options = defaultOptions,
    }
) {

    // function clickHandler(event) {
    //     console.log(`Do thing to play [${songData.track}. ${songData.title}]`)
    //     console.log(event.currentTarget);
    //     console.log(event.target);
    //     console.log(event);
    // }

    return (
        <div id="item-container" onClick={!hasPlayButton ? onClick : undefined}>
            <div id="item-track">{songData.track}</div>
            <div id="item-play-button">
                {hasPlayButton && <PlayButton onClick={onClick} />}
            </div>
            <div id="item-title">{songData.title}</div>
            <div id="item-intensity">{songData.intensity}</div>
            <div id="item-length">{songData.length}</div>
            <div id="item-options">
                {hasOptionsButton && <OptionsButton options={options} />}
            </div>
        </div>
    )
}

function PlayButton({ onClick = undefined }) {

    let playChar = "\u{25B6}"

    return (
        <>
            <button id="play-button" onClick={onClick}>
                {playChar}
            </button>
        </>
    );
}

function OptionsButton({ options = undefined }) {

    let optionsChar = "\u{FE19}";

    let [isPaneHidden, setPaneHidden] = useState(true);

    return (
        <>
            <button id="options-button" onClick={(event) => { console.log(event); setPaneHidden(false) }}>
                {optionsChar}
            </button>
            <OptionsPane options={options} hidden={isPaneHidden} setPaneHidden={setPaneHidden} />
        </>
    );
}

/*
#######################################
###  Options array/object template: ###
#######################################

[
    {
        text: "Option text",
        onClick: (event) => console.log(event),
    },
    {
        text: "More option text",
        onClick: predefinedClickFunction(),
    }
]
*/

function OptionsPane({ options = undefined, hidden = true, setPaneHidden = undefined }) {

    function getOptionsAsDivs(options) {
        let returnDivs = [];
        if (options) {
            // console.log('###', options)
            for (let i = 0; i < options.length; i++) {
                // console.log('###', option)
                returnDivs.push(
                    <div key={"option_key_" + i} className={"options-item"} onClick={(event) => options[i].onClick(event)}>
                        {options[i].text}
                    </div>
                );
            }
        }
        return returnDivs.length < 0 ? undefined : returnDivs;
    }

    return (
        <div
            id="options-menu-popup"
            onMouseOut={
                (event) => {
                    setPaneHidden(true);
                    console.log("#context menu mouseout")
                }
            }
        >
            {options && getOptionsAsDivs(options)}
        </div>
    );
}