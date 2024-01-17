import React from 'react'
import { useState } from 'react'
import './styles/SoundtrackBanner.css'

export function SoundtrackBanner({ coverSrc, bannerSrc }) {

    const [collapsed, setCollapsed] = useState(false)

    function toggleDropdown(event) {
        setCollapsed(!collapsed)
        let dropdown = event.currentTarget.nextElementSibling
        dropdown.style.display = collapsed ? "none" : "block"
    }

    return (
        <div id="container">
            <div id="top" onClick={toggleDropdown}>
                <div id="cover">
                    <img src={coverSrc} alt="" />
                </div>
                <div id="banner">
                    <img src={bannerSrc} alt="" />
                    <div id="banner-text-container">
                        <div id="banner-text">Soundtrack title</div>
                    </div>
                </div>
            </div>
            <div id="dropdown">
                <center>dropdown content portion</center>
            </div>
        </div>
    )
}