import React from 'react'
import './styles/PlaylistItem.css'


let defaultOptions = [
    {
        text: "Option 1",
        onClick: (event, songData) => console.log(`Option 1 of song -- [${songData.track}. ${songData.title}]`),
    },
    {
        text: "Option 2",
        onClick: (event, songData) => console.log(`Option 2 of song -- [${songData.track}. ${songData.title}]`),
    },
    {
        text: "Option 3",
        onClick: (event, songData) => console.log(`Option 3 of song -- [${songData.track}. ${songData.title}]`),
    },
    {
        text: "HI GABE",
        onClick: (event, songData) => alert("  :^)  "),
    },
];


export function PlaylistItem(
    {
        songData = undefined,
        hasPlayButton = false,
        onClick = undefined,
        onPlayClick = undefined,
        hasOptionsButton = false,
        options = defaultOptions,
    }
) {
   
    if (songData.intensity&&songData.intensity.length>1){
        for(let i =0; i<songData.intensity.length-1; i++){
            
            songData.intensity[i] = songData.intensity[i]+", "
        }
        
        // console.log(songData.intensity)
    }
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
                {hasPlayButton && <PlayButton onClick={onPlayClick} />}
            </div>
            <div id="item-title">{songData.title}</div>
            <div id="item-intensity">{songData.intensity}</div>
            <div id="item-length">{songData.duration}</div>
            <div id="item-options">
                {hasOptionsButton && <OptionsButton options={options} songData={songData} />}
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

function OptionsButton(
    {
        songData = undefined,
        options = undefined,
    }
) {

    let optionsChar = "\u{FE19}";

    return (
        <>
            <button
                id="options-button"
                onClick={
                    (event) => {
                        event.currentTarget.children[0].className = "shown";
                    }
                }
            >
                {optionsChar}
                <OptionsPane songData={songData} options={options} />
            </button>
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
        onClick: (event, songData) => console.log(event, songData),
    },
    {
        text: "More option text",
        onClick: predefinedClickFunction(),
    }
]
*/

function OptionsPane(
    {
        songData = undefined,
        options = undefined,
    }
) {

    function getOptionsAsDivs(options) {
        let returnDivs = [];
        if (options) {
            // console.log('###', options)
            for (let i = 0; i < options.length; i++) {
                // console.log('###', option)
                returnDivs.push(
                    <div
                        key={"option_key_" + i}
                        className={"options-item"}
                        onClick={(event) => options[i].onClick(event, songData)}
                    >
                        {options[i].text}
                    </div >
                );
            }
        }
        return returnDivs.length < 0 ? undefined : returnDivs;
    }

    return (
        <>
            <div
                id="options-menu-popup"
                onMouseLeave={ (event) => event.currentTarget.className = "hidden" }
            >
                {options && getOptionsAsDivs(options, songData)}
            </div>
        </>
    );
}