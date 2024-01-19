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
      <button onClick={buyMarketOrder}>Buy</button>
      <button onClick={sellMarketOrder}>Sell</button>
    </div>
  );
};


export default App
