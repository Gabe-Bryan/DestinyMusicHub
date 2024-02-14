import React, { createElement } from 'react';
import { useState } from 'react';

function Slideshow({ images, texts, fontsizes, style }) {
	//const [text, setText] = useState('');
	const [element, setElement] = useState(0);

	const changeElement = (prev = false) => {
		let newE = prev ? element - 1 : element + 1;
		if (newE < 0) {
			newE = images.length - 1;
		} else if (newE >= images.length) {
			newE = 0;
		}
		console.log(newE);
		setElement(newE);
	}

	const dispImages = [];
	const dots = [];

	for (let i = 0; i < images.length; i++) {
		dispImages.push(React.createElement(CarouselElement, { url: images[i] }));
		dots.push(React.createElement('span', { className: 'dot', key: i, onClick: () => setElement(i) }));
	}

	//setText('Does any aaaa aaaaaaaaaaaaaaaaaa  a aa  a a a a a a a a a a a a a a a a a aa  a a a a a a  a  aa  hjahj hj hjhj hj hj hjhj j hj  hj   kj ljlkjlkjlkj  jlklkj lkj lkj lkj lkjlkj lkj lkj lkjlkj lkj lkj lkjjlklj lkj lkj lkjlkj lkj  lkjlkjlkj lkj lkj lkj lkjlkjlkj lkj  lkj lkj lklkj lkj lkj lkj lkj lkj lkj of this bs even work?');
	return (
		<div className='slideshow-container' style={style}>
			<div className='slideshow-imgs'>
				<div className='slideshow-img'>
					{dispImages[element]}
					<a className="prev" href="./#" onClick={() => changeElement(true)}>&#10094;</a>
					<a className="next" href="./#" onClick={changeElement}>&#10095;</a>
				</div>
				<div style={{ textAlign: 'center', margin: '10px' }}>
					{dots}
				</div>
			</div>
			<p className='slideshow-text'
				style={{ fontSize: '3vw' }}>
				{texts[element]}
			</p>
		</div>);
}

function CarouselElement({ url }) {
	return (<div>
		<img src={url} alt=""></img>
	</div>);
}

export default Slideshow;