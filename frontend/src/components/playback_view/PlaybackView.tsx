import PlaybackGrid from "./PlaybackGridContainer";
import WorldTimeline from "./WorldTimeline";

const PlaybackView = () => {
    return (
      <>
        <div className="playback-view">
          <p>Play back your simulation here.</p>
        </div>
        <div style={{display: "flex"}}>
          <WorldTimeline/>
          <PlaybackGrid/>
        </div>
      </>
    );
  };
  
  export default PlaybackView;