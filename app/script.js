import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';

const App = () => {

  const [status, setStatus] = useState('off');
  const [rest, setRest] = useState('off');
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(null);
  
  const formatTime = () => {
    let minutes = Math.floor(time / 60);
    let seconds = Math.ceil(time % 60);
    
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return `${minutes}:${seconds}`
  };

  useEffect(() => {
    if(time === 0 && timer) {
      clearInterval(timer);
      setTimer(null);
    
      if(status === 'work') {
        setStatus('rest');
        setTime(10);
        startNewTimer();
      } else if(status === 'rest') {
        setStatus('work');
        setTime(15);
        startNewTimer();
      }
    }
  },[time]);

  const startNewTimer = () => {
    setTimer(setInterval(() => {
      setTime(time => time -1);
    },1000))
  }

  const startTimer = () => {
    setTime(15);
    setStatus('work');
    startNewTimer();
  };

  const stopTimer = () => {
    
  }

  let content = '';

  if(status === 'off') {
    content = 
    <div>
      <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
      <p>This app will help you track your time and inform you when it's time to rest.</p>
      <button className="btn" onClick={startTimer}>Start</button>
    </div>
  } else if(status === 'work') {
    content = 
    <div>
      <img src="./images/work.png" />
      <div className="timer">{formatTime()}</div>
      <button className="btn">Stop</button>
    </div>
    
  } else if(status === 'rest') {
    content = 
    <div>
      <img src="./images/rest.png" />
      <div className="timer">{formatTime()}</div>
      <button className="btn">Stop</button>
    </div>
  } 

  return (
    <div>
      <h1>Protect your eyes</h1>
      {content}
      <button className="btn btn-close">X</button>
    </div>
  )
};

render(<App />, document.querySelector('#app'));
