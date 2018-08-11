import React, { Component } from 'react';

import Controls from './components/Controls';
import DrumPad from './components/DrumPad';
import './App.css';

const clips = {
   Q: 'https://dl.dropbox.com/s/yyjvzr7bi2p9383/alarm_bass.mp3?dl=0',
   W: 'https://dl.dropbox.com/s/2r5nymp4lcebggh/bass-bombdive.mp3?dl=0',
   E: 'https://dl.dropbox.com/s/dh9zqbt3v5nsg9d/bass-poweron.mp3?dl=0',
   A: 'https://dl.dropbox.com/s/7pkgjxhja97vr3d/bass-synth.mp3?dl=0',
   S: 'https://dl.dropbox.com/s/l48om2ceg4x705k/bass-wobble-drop.wav?dl=0',
   D: 'https://dl.dropbox.com/s/nb05mc0sitjpubf/BassDistorted.wav?dl=0',
   Z: 'https://dl.dropbox.com/s/5u05rj3wqzq9539/dark-bass.wav?dl=0',
   X: 'https://dl.dropbox.com/s/dq3z7v19l4a2psy/darkbass-stutters.mp3?dl=0',
   C: 'https://dl.dropbox.com/s/6poqxhyu5m4musn/glass-breaker-bass.mp3?dl=0',
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { clip: '' };
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.playClip = this.playClip.bind(this);
  }

  componentWillMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleClick(event) {
    this.playClip(event.target.firstElementChild);
  }

  handleKeyPress(event) {
    const key = event.key.toUpperCase();
    if (Object.keys(clips).includes(key)) {
      const audioEl = document.getElementById(key);
      const btn = audioEl.parentNode;
      btn.classList.add('drum-pad--active');
      setTimeout(() => { btn.classList.remove('drum-pad--active'); }, 75);
      this.playClip(audioEl);
    }
  }

  playClip(audioEl) {
    audioEl.currentTime = 0;
    const playPromise = audioEl.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.setState({ clip: audioEl.parentNode.id });
         })
        .catch(err => { console.log(err); });
    }
  }

  render() {
    return (
      <div id="drum-machine">
        <div id="drum-pads">
          {Object.keys(clips).map(key =>
            <DrumPad
              handleClick={this.handleClick}
              key={key}
              letter={key}
              src={clips[key]}
            />
          )}
        </div>
        <Controls clip={this.state.clip} />
      </div>
    );
  }
}

export default App;
