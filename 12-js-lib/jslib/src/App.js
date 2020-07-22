import React from 'react';
import * as nj from 'numjs';
import Plot from 'react-plotly.js';
import Anime from 'react-anime';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMapPin } from '@fortawesome/free-solid-svg-icons';

function App() {
  const someArray = nj.random([3,3]);
  
  return (
    <div className="App">
      <h1>Some stacked icons:</h1>
      <span className='fa-layers fa-fw'>
        <FontAwesomeIcon icon={faEnvelope} size='3x' spin />
        <FontAwesomeIcon icon={faMapPin} size='2x' color='green' />
      </span>
      <h1>A plot.ly + numjs + animejs example:</h1>
      <Anime opacity={[0,1]} duration={5000}>
        <Plot
          data={[
            {
              x: [1, 2, 3],
              y: nj.diag(someArray).tolist(),
              type: 'scatter',
              mode: 'lines+markers',
              marker: {color: 'blue'},
            }
          ]}
          layout={ {width: 500, height: 500} }
        />
      </Anime>
    </div>
  );
}

export default App;
