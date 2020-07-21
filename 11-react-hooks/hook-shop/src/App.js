import React from 'react';
import logo from './fish-hook.png';
import './App.css';

import HookCard from './HookCard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Matt's Fishing Hook Shop</h1>
        <img className="App-logo" src={logo} alt="a fishing hook" />
        <div className="hooks">
          <HookCard />
        </div>
      </header>
    </div>
  );
}

export default App;
