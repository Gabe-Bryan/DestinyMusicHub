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
        <div className="Complete-Song-Outer-Div${expanded}?">
            <script>
            <ul>
                <li onClick={expand}></li>
            </ul>
            </script>
        </div>
    );
}
export{CompleteDisplay}