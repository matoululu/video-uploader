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
import Howto from './Howto';

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
      fluid: false,
      width: 640,
      height: 480,
      plugins: {
        record: {
          image: false,
          audio: true,
          video: true,
          frameWidth: 640,
          frameHeight: 480,
          maxLength: 20,
          debug: true
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
        <div className="video__content">
          <p>Welcome to Emily's 29th birthday surprise! I've built this site to gather a collection of warm birthday wishes to piece together for Emily, this way we won't all feel so separated from one another if even for a short moment.</p>
        </div>
        <div className="video__relative">
          <video className="video video-js vjs-default-skin" id="video"  ></video>
          <Howto/>
          {this.state.recorded ? <div className="video__button"><p><span aria-label="Thumbs up">👍</span> Nice video! Happy with it?</p><button onClick={this.handleSend} className="button">Send video</button></div> : null }
        </div>
      </div>

    )
  }
}

export default Recorder;
