import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { SoundtrackBanner } from './components/SoundtrackBanner';
import { Playlist } from './components/Playlist';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
    <SoundtrackBanner/>
    {/* <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    }}>

      <SoundtrackBanner
        expanded
        coverSrc="./res/destiny1soundtrack.jpg"
        bannerSrc="./res/marc-thompson-sanctum-18.jpg"
        bannerText="Destiny Original Soundtrack"
      >
        <Playlist playlistData={
          [
            {
              track: 1,
              title: 'this is a song title',
              intensity: 'spooky',
              length: "?!"
            },
            {
              track: 2,
              title: 'this is also a song title',
              intensity: 'happy',
              length: "?!"
            },
            {
              track: 3,
              title: 'destiny music is complicated',
              intensity: 'boohoo',
              length: "?!"
            },
            {
              track: 4,
              title: 'test1',
              intensity: 'spooky',
              length: "?!"
            },
            {
              track: 5,
              title: 'test2',
              intensity: 'happy',
              length: "?!"
            },
            {
              track: 6,
              title: 'test3',
              intensity: 'boohoo',
              length: "?!"
            },{
              track: 7,
              title: 'test1',
              intensity: 'spooky',
              length: "?!"
            },
            {
              track: 8,
              title: 'test2',
              intensity: 'happy',
              length: "?!"
            },
            {
              track: 9,
              title: 'test3',
              intensity: 'boohoo',
              length: "?!"
            },
          ]
        }

        />
      </SoundtrackBanner>

    </div> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
