import PlaybackGrid from "./PlaybackGridContainer";

const PlaybackView = () => {
    return (
      <>
        <div className="playback-view">
          <p>Play back your simulation here.</p>
        </div>

        <PlaybackGrid/>
      </>
    );
  };
  
  export default PlaybackView;