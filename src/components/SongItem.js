import './styles/SongItem.css';


function SongItem ({data}) {
	return (
		<div className='song-item-container'>
			<div className = 'track'>{data.track}</div>
			<div className = 'title'>{data.title}</div>
		</div>
	);
}

export {SongItem};