import '../stylesheets/Complete-Soundtrack-Container.css';
import { useEffect, useState } from 'react';
import { CompletePlaylist } from './CompletePlaylist';
const songList="hi my name is jeff"


function CompleteDisplay({ expanded = false,SongList,bannerText = "hallo world"}){
    const [isExpanded, setExpanded] = useState(expanded ? "shown" : "hidden");
    SongList=[{
        title:"a song aaaaaaa",

        meta_data:{
            lead_composer: "b",
        },

        sources:[{
            video_id:"CDMQgA5Ub3M",
            intensity:[
            "Tension",
            "Action",
            "Heavy Action",
            "Light Action",
            "High Action"],

            track_number:1,
            is_official:true,
            version_title:"abcded",
            duration:356},{
                video_id:"CDMQgA5Ub3M",
                intensity:[
                "Tension",
                "Action"],
    
                track_number:2,
                is_official:true,
                version_title:"a",
                duration:356}]
            },
            {
                track: 2,
                title: 'The Fallen',
                length: '4:37',
                composers: ["Micheal Salvatori", "Martin O'Donnell", "Paul McCartney"],
                album: "Destiny 1 Official Soundtrack",
            }
    ]
function toggleExpand(event){
    if (isExpanded==="shown") setExpanded("hidden")
    else setExpanded("shown")
}
    return(

        <div id="songtrack-container">
        <div id="top" onClick={toggleExpand}>
            <div id="official-songs">
                <img src={""} alt="" />
                    <div id="official-text">{bannerText}</div>  
            </div>
        </div>
        <div id="dropdown" className={isExpanded}>
            <CompletePlaylist playlistData={SongList}/>
        </div>
        </div>
    );
}
export{CompleteDisplay}