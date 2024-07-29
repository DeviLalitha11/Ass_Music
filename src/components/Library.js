import React, { useRef } from 'react';
import MusicItem from './MusicItem';

const Library = ({ library = [], currentTrack, setCurrentTrack }) => {
  const audioRefs = useRef(null);

  if (!library.length) {
    return <p className="text-center">No tracks available in the library.</p>;
  }

  return (
    <div className="library mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {library.map((track, index) => (
        <MusicItem key={index} track={track} currentTrack={currentTrack} setCurrentTrack={setCurrentTrack} audioRefs={audioRefs} />
      ))}
    </div>
  );
};

export default Library;
