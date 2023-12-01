
import React, { useState, useRef, useEffect } from "react";
import Icon from "./Icon";
import {AiFillPauseCircle, AiFillPlayCircle} from "react-icons/ai"

export const Audio =({ audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const handlePlay = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    audioRef.current.currentTime = e.target.value;
    setCurrentTime(e.target.value);
  };

  function formatDuration(durationSeconds) {
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = Math.floor(durationSeconds % 60);
    const formattedSeconds = seconds.toString().padStart(2, "0");
    return `${minutes}:${formattedSeconds}`;
  }

  useEffect(() => {
    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
   
  }, []);

  return (
    <div className="flex w-52 bg-neutral-50 
    flex-col px-6 my-5 mx-5 rounded-xl ">
      <div className="flex justify-center my-7">
      <button disabled={audioSrc ? false : true} 
      className="w-20 h-20 " onClick={handlePlayPause}>
        <span className="f" >
          {isPlaying ? <>
          <Icon color="#d6cccb" name={<AiFillPauseCircle/>}/>
          
          </> : <>
          <Icon color="#d6cccb" name={<AiFillPlayCircle/>}/>
          </>}
        </span>
      </button>
      </div>
      
      <input
        type="range"
        className="accent-purple-900 h-1"
        min="0"
        max={duration}
        value={currentTime}
        onChange={handleSeek}
      />

      <audio ref={audioRef} src={audioSrc} />

      <div className="flex justify-between 
      py-5 mt-2 font-mono font-normal">
        <p>{formatDuration(currentTime)}</p>
        {audioSrc ? <p>{formatDuration(duration)}</p> : <></> }
       
      </div>

     
    </div>
  );
}

