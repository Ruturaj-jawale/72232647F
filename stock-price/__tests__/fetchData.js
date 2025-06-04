const axios = require('axios');
const { calculateCorrelation } = require('./correlationUtils');

const BASE_URL = 'http://20.244.56.144/evaluation-service/stocks';

async function getStockPrices(ticker, minutes) {
  const url = `${BASE_URL}/${ticker}${minutes ? `?minutes=${minutes}` : ''}`;
  const response = await axios.get(url);
  return Array.isArray(response.data) ? response.data : [response.data.stock];
}

function getAveragePrice(prices) {
  const total = prices.reduce((sum, p) => sum + p.price, 0);
  const avg = total / prices.length;
  return {
    averageStockPrice: avg,
    priceHistory: prices
  };
}

async function getCorrelation(ticker1, ticker2, minutes) {
  const [prices1, prices2] = await Promise.all([
    getStockPrices(ticker1, minutes),
    getStockPrices(ticker2, minutes)
  ]);

  const x = prices1.map(p => p.price);
  const y = prices2.map(p => p.price);

  const correlation = calculateCorrelation(x, y);

  return {
    correlation,
    stocks: {
      [ticker1]: {
        averagePrice: getAveragePrice(prices1).averageStockPrice,
        priceHistory: prices1
      },
      [ticker2]: {
        averagePrice: getAveragePrice(prices2).averageStockPrice,
        priceHistory: prices2
      }
    }
  };
}

module.exports = { getStockPrices, getAveragePrice, getCorrelation };
