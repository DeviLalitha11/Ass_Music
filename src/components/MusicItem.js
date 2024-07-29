import React, { useEffect, useState, useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const MusicItem = ({ track, currentTrack, setCurrentTrack, audioRefs }) => {
  const [duration, setDuration] = useState(0);
  const audioRef = useRef();

  useEffect(() => {
    const audio = new Audio(`/audio/${track}`);
    audio.onloadedmetadata = () => {
      setDuration(audio.duration);
    };
  }, [track]);

  useEffect(() => {
    if (currentTrack !== track && audioRef.current) {
      audioRef.current.audio.current.pause();
      audioRef.current.audio.current.currentTime = 0;
    }
  }, [currentTrack, track]);

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handlePlay = () => {
    if (audioRefs.current && audioRefs.current !== audioRef.current) {
      audioRefs.current.audio.current.pause();
      audioRefs.current.audio.current.currentTime = 0;
    }
    audioRefs.current = audioRef.current;
    setCurrentTrack(track);
  };

  return (
    <div className={`card bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer ${currentTrack === track ? 'border-2 border-blue-500' : ''}`}>
      <div className="card-body">
        <h2 className="card-title text-xl">{track}</h2>
        <p>Duration: {formatDuration(duration)}</p>
        <AudioPlayer
          ref={audioRef}
          src={`/audio/${track}`}
          showJumpControls={false}
          customAdditionalControls={[]}
          customVolumeControls={[]}
          showDownloadProgress={false}
          showFilledProgress={false}
          autoPlay={currentTrack === track}
          onPlay={handlePlay}
        />
      </div>
    </div>
  );
};

export default MusicItem;
