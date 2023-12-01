import React, { createElement } from 'react';
import {useState} from 'react';

function Slideshow(props){
    //const [text, setText] = useState('');
    const [element, setElement] = useState(0);
  
    const changeElement = (prev = false) =>{
      let newE = prev ? element - 1 : element + 1;
      if (newE < 0) {
        newE = props.images.length - 1;
      } else if (newE >= props.images.length){
        newE = 0;
      }
      console.log(newE);
      setElement(newE);
    }
  
    const images = [];
    const dots = [];
  
    for(let i = 0; i < props.images.length; i++){
      images.push(React.createElement(CarouselElement, {url: props.images[i]}));
      dots.push(React.createElement('span', {class: 'dot', onClick: () => setElement(i)}));
    }
  
    let jsxImgs = React.createElement(
      'div',
      {className: 'slideshow-img', style: {marginRight: '5%'}},
      images[element]
    );
  
    //setText('Does any aaaa aaaaaaaaaaaaaaaaaa  a aa  a a a a a a a a a a a a a a a a a aa  a a a a a a  a  aa  hjahj hj hjhj hj hj hjhj j hj  hj   kj ljlkjlkjlkj  jlklkj lkj lkj lkj lkjlkj lkj lkj lkjlkj lkj lkj lkjjlklj lkj lkj lkjlkj lkj  lkjlkjlkj lkj lkj lkj lkjlkjlkj lkj  lkj lkj lklkj lkj lkj lkj lkj lkj lkj of this bs even work?');
    return (
      <div class = 'slideshow-container' style = {{display: 'flex'}}>
        <div className = 'slideshow-imgs' style = {{margin: '5%'}}>
          {jsxImgs}
          <a class="prev" onClick={() => changeElement(true)}>&#10094;</a>
          <a class="next" onClick={changeElement}>&#10095;</a>
          <div style={{textAlign:'center', margin: '10px'}}>
            {dots}
          </div>
        </div>
        <p style = {{margin: 'auto 2%', fontSize: props.fontsizes[element]}}>{props.texts[element]}</p>
      </div>);
  }
  
  function CarouselElement(props){
    return (<div>
      <img src = {props.url}></img>
    </div>);
  }

  export default Slideshow;