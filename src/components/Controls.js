import React from 'react';

const Controls = ({ clip }) => (
  <div id="controls">
    {/* TODO: power button, volume meter, dropdown for other sets of clips*/}
    <p id="display">{clip}</p>
    <input type="range" />
  </div>
);

export default Controls;
