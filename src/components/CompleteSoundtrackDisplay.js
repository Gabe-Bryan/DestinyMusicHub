import '../stylesheets/Complete-Soundtrack-Container.css';
import { useEffect, useState } from 'react';
const songList="hi my name is jeff"

function CompleteDisplay({SongList}){
    const [expanded, setExpanded] = useState(false);
    const [cdSize, setcdSize] = useState(['200', '110']);

const expand= () => {
    setExpanded(!expanded);
}
    return(
        <div className={`complete-song-outer-div${expanded?" expanded":""}`}>
            <script>
            <ul>
                <li onClick={expand} className={`complete-song-outer-div${expanded?" expanded":""}`}></li>
            </ul>
            </script>
        </div>
    );
}
export{CompleteDisplay}