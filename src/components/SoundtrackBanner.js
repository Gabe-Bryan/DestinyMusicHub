import React from 'react'
import { useState } from 'react'
import './styles/SoundtrackBanner.css'

import { Playlist } from "./Playlist"

export function SoundtrackBanner({ expanded = false, coverSrc, bannerSrc, bannerText = "" }, playlistData ) {

    const [isExpanded, setIsExpanded] = useState(expanded ? "shown" : "hidden")

    /*
            FAKE TEST PLAYLIST DATA
        REMOVE BEFORE DEPLOYING/MERGING
        v  v  v  v  v  v  v  v  v  v  v
    */
    playlistData = [
        {
            track: 1,
            title: 'The Traveler',
            length: '2:30',
            composers: ["Micheal Salvatori", "Martin O'Donnell", "Paul McCartney"],
            album: "Destiny 1 Official Soundtrack",
        },
        {
            track: 2,
            title: 'The Fallen',
            length: '4:37',
            composers: ["Micheal Salvatori", "Martin O'Donnell", "Paul McCartney"],
            album: "Destiny 1 Official Soundtrack",
        },
        {
            track: 3,
            title: 'Excerpt from the Hope',
            length: '2:16',
            composers: ["Micheal Salvatori", "Martin O'Donnell"],
            album: "Destiny 1 Official Soundtrack",
        },
        {
            track: 4,
            title: 'The Traveler',
            length: '2:30',
            composers: ["Micheal Salvatori", "Martin O'Donnell", "Paul McCartney"],
            album: "Destiny 1 Official Soundtrack",
        },
        {
            track: 4,
            title: 'The Fallen',
            length: '4:37',
            composers: ["Micheal Salvatori", "Martin O'Donnell", "Paul McCartney"],
            album: "Destiny 1 Official Soundtrack",
        },
        {
            track: 6,
            title: 'Excerpt from the Hope',
            length: '2:16',
            composers: ["Micheal Salvatori", "Martin O'Donnell"],
            album: "Destiny 1 Official Soundtrack",
        },
        {
            track: 7,
            title: 'The Traveler',
            length: '2:30',
            composers: ["Micheal Salvatori", "Martin O'Donnell", "Paul McCartney"],
            album: "Destiny 1 Official Soundtrack",
        },
        {
            track: 8,
            title: 'The Fallen',
            length: '4:37',
            composers: ["Micheal Salvatori", "Martin O'Donnell", "Paul McCartney"],
            album: "Destiny 1 Official Soundtrack",
        },
        {
            track: 9,
            title: 'Excerpt from the Hope',
            length: '2:16',
            composers: ["Micheal Salvatori", "Martin O'Donnell"],
            album: "Destiny 1 Official Soundtrack",
        }
    ]
    /*
        ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  
        REMOVE BEFORE DEPLOYING/MERGING
            FAKE TEST PLAYLIST DATA
    */

    function toggleDropdown(event) {
        if (isExpanded==="shown") setIsExpanded("hidden")
        else setIsExpanded("shown")
    }

    return (
        <div id="songbanner-container">
            <div id="top" onClick={toggleDropdown}>
                <div id="cover">
                    <img src={coverSrc} alt="" />
                </div>
                <div id="banner">
                    <img src={bannerSrc} alt="" />
                    <div id="banner-text-container">
                        <div id="banner-text">{bannerText}</div>
                    </div>
                </div>
            </div>
            <div id="dropdown" className={isExpanded}>
                <Playlist playlistData={playlistData} />
            </div>
            <div id="overflow-cap"/>
        </div>
    )
}