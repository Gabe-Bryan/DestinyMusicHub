import React from 'react'
import { useState } from 'react'
import './styles/SoundtrackBanner.css'

import { Playlist } from "./Playlist"

export function SoundtrackBanner(
    {
        expanded = false,
        coverSrc,
        bannerSrc = "./res/marc-thompson-sanctum-18.jpg",
        bannerText = "Soundtrack Title",
        children
    }
) {
    const [isExpanded, setIsExpanded] = useState(expanded ? "shown" : "hidden")

    function toggleDropdown(event) {
        if (isExpanded === "shown") setIsExpanded("hidden")
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
                {children}
            </div>
            <div id="overflow-cap" className={isExpanded} />
        </div>
    )
}