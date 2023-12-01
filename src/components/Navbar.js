import React, { createElement } from 'react';
import {useState} from 'react';

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
      <ul className = {solid ? 'solid' : 'transp'}>
        <li><a href="OfficialMusic">Officially Released</a></li>
        <li><a href="CompleteMusic">Complete Music Archive</a></li>
        <li><a href="">Home</a></li>
      </ul>
    );
}

export default Navbar;