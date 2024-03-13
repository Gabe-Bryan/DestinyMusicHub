import { SongItem } from "../components/SongItem";
import { SongPlaylist } from '../components/SongPlaylist.js';   
export function CompleteMusic({ twoColumn = false }) {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Complete Music Page</h1>
            </header>
            <body>
                <h2>Unofficial Soundtracks / Released Music:</h2>
                <SongPlaylist playlistData={[
              {"_id":{"$oid":"65cac3d6bad846dd6181fc42"},
              "title":"Gambit / Shell of What Was",
              "meta_data":{
                "lead_composer":"Kris Dirksen, Skye Lewin, Michael Salvatori",
                "game":"2","release_year":"2018",
                "implementation_year":"2018",
                "faction":"The Taken, The Drifter",
                "tags":["complete"]},
                "sources":[{
                  "video_id":"z60BFLUBEpI","source_type":"Youtube",
                  "intensity":["Ambient","Soundtrack Edition"],
                  "track_number":32,
                  "is_official":true,
                  "version_title":"Gambit",
                  "soundtrack_id":"65b834f6bad846dd6181fc2b",
                  "duration":202},

                  {"video_id":"358iGrX8gIo",
                  "source_type":"Youtube",
                  "intensity":["Action","Soundtrack Edition"],
                  "track_number":17,
                  "is_official":true,
                  "version_title":"Shell of What Was",
                  "soundtrack_id":"65b834f6bad846dd6181fc2b",
                  "duration":106},

                  {"video_id":"pCjl94eENa4",
                  "source_type":"Youtube",
                  "intensity":["Ambient"],
                  "version_title":"Gambit",
                  "soundtrack_id":"65b834f6bad846dd6181fc2b",
                  "duration":209},
                  
                  {"video_id":"tOfGBYS0AjQ",
                  "source_type":"Youtube",
                  "intensity":["Tension"],
                  "soundtrack_id":"65b834f6bad846dd6181fc2b",
                  "duration":197},

                  {"video_id":"UwNeytrnudU",
                  "source_type":"Youtube",
                  "intensity":["Tension"],
                  "add_layers":["+Action Layer"],
                  "soundtrack_id":"65b834f6bad846dd6181fc2b",
                  "duration":197},

                  {"video_id":"avPhyWMWTz8",
                  "source_type":"Youtube","intensity":["Action"],"version_title":"Shell of What Was","soundtrack_id":"65b834f6bad846dd6181fc2b","duration":241},

                  {"video_id":"OlHMM3Hl7ac","source_type":"Youtube","intensity":["High Action"],"version_title":"Shell of What Was","soundtrack_id":"65b834f6bad846dd6181fc2b","duration":270},
                  
                  {"video_id":"Hr5kl1A-GOA","source_type":"Youtube","intensity":["Ambient"],"version_title":"Gambit (Queenswalk)","soundtrack_id":"65b834f6bad846dd6181fc2b","duration":206},
                  
                  {"video_id":"FeJFRAAf9js","source_type":"Youtube","intensity":["Action"],"version_title":"Shell of What Was (Queenswalk)","soundtrack_id":"65b834f6bad846dd6181fc2b","duration":209},
                  
                  {"video_id":"7zYE0YPOd3E","source_type":"Youtube","intensity":["High Action"],"version_title":"Shell of What Was (Queenswalk)","soundtrack_id":"65b834f6bad846dd6181fc2b","duration":271}]}]}
            >
            </SongPlaylist>
            </body>
        </div>
    );

}