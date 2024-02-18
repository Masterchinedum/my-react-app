// TradingComponent.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TradingComponent = ({ isBotRunning, toggleBot }) => {
  const [apiError, setApiError] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(null);

  const binanceApiUrl = 'https://api.binance.com';
  const apiKey = process.env.REACT_APP_API_KEY;
  const apiSecret = process.env.REACT_APP_API_SECRET;
  const symbol = 'ETHUSDT';
  const leverage = 20;
  const quantity = 10 / leverage; // Assuming 10 USD worth of ETH at 20X leverage


  useEffect(() => {
    const fetchCurrentPrice = async () => {
      try {
        const response = await axios.get(`${binanceApiUrl}/api/v3/ticker/price`, {
          params: { symbol },
        });

        setCurrentPrice(response.data.price);
      } catch (error) {
        setApiError('Error fetching current price');
      }
    };

    if (isBotRunning) {
      const priceFetchInterval = setInterval(fetchCurrentPrice, 5000); // Fetch every 5 seconds
      return () => clearInterval(priceFetchInterval);
    }
  }, [isBotRunning]);


  const placeOrder = async (side) => {
    try {
      const response = await axios.post(
        `${binanceApiUrl}/fapi/v1/order`,
        {
          symbol,
          side,
          type: 'MARKET',
          quantity,
          leverage,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-MBX-APIKEY': apiKey,
          },
        }
      );

      console.log(response.data);
      // Handle successful order placement here
    } catch (error) {
      setApiError(error.response.data.msg || 'Error placing order');
    }
  };

  return (
    <div>
      {apiError && <p style={{ color: 'red' }}>{apiError}</p>}
      <p>Current Price: {currentPrice}</p>
      <button onClick={() => placeOrder('BUY')}>Buy at Market Price</button>
      <button onClick={() => placeOrder('SELL')}>Sell at Market Price</button>
      <button onClick={toggleBot}>
        {isBotRunning ? 'Stop Bot' : 'Start Bot'}
      </button>
    </div>
  );
};

export default TradingComponent;
