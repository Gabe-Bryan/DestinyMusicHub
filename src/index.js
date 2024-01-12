import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { SoundtrackBanner } from './components/SoundtrackBanner';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      {/* <App/> */}
      <center style={{margin: '10rem'}}>
      <SoundtrackBanner coverSrc="./res/lightfall.jpg" bannerSrc="./res/marc-thompson-sanctum-18.jpg" />
      <SoundtrackBanner coverSrc="./res/season_of_plunder.jpg" bannerSrc="./res/marc-thompson-sanctum-18.jpg" />
      <SoundtrackBanner coverSrc="./res/destiny1soundtrack.jpg" bannerSrc="./res/marc-thompson-sanctum-18.jpg" />
      </center>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
