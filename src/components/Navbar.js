import React from 'react';
import {useState} from 'react';
import {Link} from 'react-router-dom';

function Navbar(){
  
    let [solid, setSolid] = useState(false);
    const onScroll = (pixels) => {
      return () => {
        if(!solid && window.scrollY >= pixels){
          setSolid(true);
        } else if (solid && window.scrollY < pixels){
          setSolid(false);
        }
      }
    }
    window.addEventListener('scroll', onScroll(252));
    return (
      <ul className = {`navbar ${solid ? 'solid' : 'transp'}`}>
        <li><Link to = 'OfficialMusic'>Official Music</Link></li>
        <li><Link to = 'CompleteMusic'>Complete Music</Link></li>
        <li><Link to = ''>Home</Link></li>
      </ul>
    );
}

export default Navbar;