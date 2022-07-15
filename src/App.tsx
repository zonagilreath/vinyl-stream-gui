import React, {useEffect, useState} from 'react';
import './App.css';
import icon from './assets/turntable.svg';

export default function App() {
  const [showHelp, setShowHelp] = useState(false);
  const [showWait, setShowWait] = useState(false);
  const [showThenTap, setShowThenTap] = useState(false);
  const [showMustCastFirst, setShowMustCastFirst] = useState(false);
  const [hasTappedCast, setHasTappedCast] = useState(false);

  useEffect(()=>{
    if (showWait){
      setTimeout(()=> {
        setShowWait(false);
        setShowThenTap(true);
      }, 3000);
    }
  }, [showWait]);

  useEffect(()=>{
    if (showThenTap){
      setTimeout(()=> {
        setShowThenTap(false);
      }, 3000);
    }
  }, [showThenTap])

  useEffect(()=>{
    if (showMustCastFirst){
      setTimeout(()=> {
        setShowMustCastFirst(false);
      }, 2000);
    }
  }, [showMustCastFirst])

  const showButtons = !(showHelp || showWait || showThenTap || showMustCastFirst);

  return (
    <div className="main-container">
      <div className="container">
        <img width="150px" alt="icon" src={icon} />
      </div>
      {showButtons && (
        <div className="buttons-container">
          <button type="button" onClick={() => {
              setShowWait(true);
              setHasTappedCast(true);
              window.api.streamIt()
            }}>
            CAST IT
          </button>
          <button type="button" onClick={() => {
              if (hasTappedCast) {
                window.api.playIt();
              } else {
                setShowMustCastFirst(true);
              }
            }}>
            PIPE IT IN
          </button>
          <button type="button" onClick={window.api.killIt}>KILL IT</button>
        </div>
      )}
      {showWait && !showHelp && (
        <h2>Wait a bit for the cast to show up on the TV</h2>
      )}
      {showThenTap && !showHelp && (
        <h2>Then tap "Pipe it in" and play your record!</h2>
      )}
      {showMustCastFirst && !showHelp && (
        <h2>Ya gotta start the cast first!</h2>
      )}
      {showHelp && (
        <div>
          <ol>
            <li>Turn on the TV and Shield</li>
            <li>"Cast it" to start the chromecast, and wait a sec</li>
            <li>"Pipe it in" to get things set up</li>
            <li>Play a record (it might take ~30 sec to hear it)</li>
            <li>"Kill it" when you're done (no need to do this between records)</li>
          </ol>
        </div>
      )}
      <div>
      <button className="help-button" type="button" onClick={()=>setShowHelp(!showHelp)}>
        {showHelp ? 'GO BACK' : 'SHOW HELP'}
      </button>
      </div>
    </div>
  );
}
