import React from "react";
import 'video.js/dist/video-js.min.css';
import videojs from 'video.js';
import RecordRTC from 'recordrtc';
import 'videojs-record/dist/css/videojs.record.css';
import Record from 'videojs-record/dist/videojs.record.js';

class Recorder extends React.Component {
  constructor() {
    super();
    this.player = '';
    this.options = {
      // video.js options
      controls: true,
      bigPlayButton: false,
      loop: false,
      fluid: true,
      width: 320,
      height: 240,
      plugins: {
          // videojs-record plugin options
          record: {
              image: false,
              audio: true,
              video: true,
              maxLength: 20,
              debug: true,
              autoMuteDevice: true
          }
      }
    };
  }

  componentDidMount() {
    this.player = videojs('video', this.options, function() {
      // print version information at startup
      const msg = 'Using video.js ' + videojs.VERSION +
          ' with videojs-record ' + videojs.getPluginVersion('record');
      videojs.log(msg);

      console.log("videojs-record is ready!");
    });

    this.player.on('finishRecord', ()=> {
      console.log(this.player.recordedData);
    });

    this.player.on('startRecord', ()=> {
      document.body.style.background = 'red';
    });
  }

  render() {
    return(
      <video id="video" playsInline className="video-js vjs-default-skin"></video>
    )
  }
}

export default Recorder;
