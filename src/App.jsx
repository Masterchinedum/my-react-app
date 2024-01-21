import React, { useState } from 'react';
import TradingComponent from './TradingComponent';
import './App.css';


function App() {
  const [isBotRunning, setIsBotRunning] = useState(false);

  const toggleBot = () => {
    setIsBotRunning((prevIsBotRunning) => !prevIsBotRunning);
    // Additional logic for starting or stopping the bot if needed
  };

  return (
    <div className="App">
      <h1>Binance Trader</h1>
      <TradingComponent isBotRunning={isBotRunning} toggleBot={toggleBot} />
    </div>
  );
}

export default App;
