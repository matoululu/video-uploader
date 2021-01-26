import React from "react";
import 'video.js/dist/video-js.min.css';
import videojs from 'video.js';
import RecordRTC from 'recordrtc';
import 'videojs-record/dist/css/videojs.record.css';
import Record from 'videojs-record/dist/videojs.record.js';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

class Recorder extends React.Component {
  constructor() {
    super();
    this.player = '';
    this.state = {
      recorded: false
    };
    this.recorded = false;
    this.options = {
      controls: true,
      bigPlayButton: false,
      loop: false,
      fluid: true,
      width: 320,
      height: 240,
      plugins: {
        record: {
          image: false,
          audio: true,
          video: true,
          maxLength: 20,
          debug: false
        }
      }
    };
    this.config = {
      apiKey: "AIzaSyD_a-78Rb2WuEzELb0dI_4-caFABxqg7As",
      authDomain: "linkbank-83067.firebaseapp.com",
      projectId: "linkbank-83067",
      storageBucket: "linkbank-83067.appspot.com",
      messagingSenderId: "472372161350",
      appId: "1:472372161350:web:aad65b58f560984b0b9347",
      measurementId: "G-D3MS1HR2RP"
    };
  }

  componentDidMount() {
    firebase.initializeApp(this.config);

    this.player = videojs('video', this.options, function() {
      const msg = `Using video.js ${videojs.VERSION} with videojs-record ${videojs.getPluginVersion('record')}`;
      videojs.log(msg);
    });

    this.player.on('startRecord', ()=> {
      this.setState(state => ({
        recorded: false
      }));
    });

    this.player.on('finishRecord', ()=> {
      this.setState(state => ({
        recorded: true
      }));
    });
  }

  handleSend = (e) => {
    this.storage = firebase.storage().ref();
    const storageRef = this.storage;
    const time = Date.now();
    const videoRef = storageRef.child(`video-${time}`);
    console.log(e)
    e.target.classList.add('disabled');
    e.target.textContent = 'Sending...';

    videoRef.put(this.player.recordedData).then((snapshot) => {
      console.log('Uploaded a blob or file!');

      e.target.textContent = 'Sent';

      setTimeout(() => {
        this.setState(state => ({
          recorded: false
        }));
        e.target.classList.remove('disabled');
        e.target.textContent = 'Send video';
      }, 1000)
    });
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  render() {
    return(
      <div className="video__wrapper">
        <video id="video" playsInline className="video-js vjs-default-skin"></video>
        {this.state.recorded ? <div className="video-button"><button onClick={this.handleSend} className="button">Send video</button></div> : null }
      </div>

    )
  }
}

export default Recorder;
