import { useState } from 'react'
import './App.css'


const Binance = require('binance-api-node').default;

const client = Binance({
  apiKey: 'YOUR_API_KEY',
  apiSecret: 'YOUR_SECRET_KEY',
  test: true,
  baseURL: 'https://testnet.binancefuture.com',
});

const symbol = 'BTCUSDT';
const quantity = 0.001;

const buyMarketOrder = async () => {
  try {
    const order = await client.futuresMarketBuy(symbol, quantity);
    console.log(`Bought ${order.executedQty} ${symbol} at ${order.avgPrice}`);
  } catch (error) {
    console.error(error);
  }
};

const sellMarketOrder = async () => {
  try {
    const order = await client.futuresMarketSell(symbol, quantity);
    console.log(`Sold ${order.executedQty} ${symbol} at ${order.avgPrice}`);
  } catch (error) {
    console.error(error);
  }
};

const App = () => {
  return (
    <div>

      Hello This Is the begining of this code so please run well
      <div className="container" >
        <button className="buy" onClick={buyMarketOrder}>Buy</button>
        <button className="sell" onClick={sellMarketOrder}>Sell</button>
      </div>
    </div>
  );
};


export default App
