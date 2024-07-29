// MusicPlayer.js
import React, { useState, useEffect, useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css'; // Import default styles
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Button, Card, Slider } from '@mui/material';
import 'tailwindcss/tailwind.css'; // Import tailwind styles
import 'daisyui/dist/full.css'; // Import DaisyUI styles

const audioFiles = [
  { src: '/audio/track4.mp3', image: '/images/Pushpa2.jpeg', title: 'Sooseki', Movie: 'Pushpa2' },
  { src: '/audio/track2.mp3', image: '/images/Pushpa2.jpeg', title: 'Song 2', Movie: 'Pushpa2' },
  { src: '/audio/track3.mp3', image: '/images/Pushpa2.jpeg', title: 'Song 3', Movie: 'Pushpa2' },
];

const MusicPlayer = () => {
  const [currentSong, setCurrentSong] = useState(null);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handlePlay = (song) => {
    if (audioRef.current) {
      audioRef.current.audio.current.pause(); // Ensure the current song is paused
    }
    setCurrentSong(song);
    toast.success(`Playing ${song.title}`);
  };

  return (
    <div className="p-6 bg-black min-h-screen flex flex-col items-center">
      <div className="flex flex-col items-center w-full max-w-7xl">
        {audioFiles.map((song, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full mb-4"
          >
            <Card className="flex flex-row items-center p-2 bg-slate-500 text-white shadow-md rounded-lg">
                <Button
                  onClick={() => handlePlay(song)}
                  className="bg-blue-600 text-black hover:bg-blue-700 transition-colors"
                >
                  Play
                </Button>
              <img
                src={song.image}
                alt={song.title}
                className="w-12 h-12 object-cover rounded-lg mr-4"
              />
              <div className="flex-1 flex flex-row">
                <h2 className="text-lg font-semibold ml-20">{song.title}</h2>
                <h4 className="text-lg font-medium ml-40 mr-12">{song.Movie}</h4>
                
                
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      {currentSong && (
        <div className="mt-96 w-full max-w-7xl fixed">
          <AudioPlayer
            src={currentSong.src}
            ref={audioRef}
            autoPlay
            showSkipControls
            showJumpControls={false}
            onEnded={() => toast.success(`Finished playing ${currentSong.title}`)}
            onError={() => toast.error('Error loading the audio file.')}
          />
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
