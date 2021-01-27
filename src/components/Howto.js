function Howto() {
  return (
    <div className="video__howto">
      <h2>How it works</h2>
      <ol>
        <li>
          <span className="click-tap"></span> on <span className="camera"></span> to turn on your camera.
        </li>
        <li>
          <span className="click-tap"></span> on <span className="record"></span> to begin recording.
        </li>
        <li>
          Record your video
        </li>
        <li>
          <span className="click-tap"></span> on <span className="play"></span> to review your video.
        </li>
        <li>
          <span className="click-tap"></span> on 'Send video' to submit your video
        </li>
      </ol>
      <br/>
      <p>If you are experiencing issues on a mobile device try switching to desktop/laptop</p>
      <p><em>Please note all videos are limited to 20 seconds</em></p>
    </div>
  );
}

export default Howto;
