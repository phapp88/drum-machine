import React from 'react';

const DrumPad = ({ handleClick, letter, src }) => {
  const splitSrc = src.split('/');
  const clipDescription = splitSrc[splitSrc.length - 1].split('.')[0];
  return (
    <button className="drum-pad" id={clipDescription} onClick={handleClick}>
      {letter}
      <audio className="clip" id={letter} src={src} />
    </button>
  );
};

export default DrumPad;
