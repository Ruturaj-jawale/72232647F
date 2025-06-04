// stockService.js
const { fetchData } = require('./utils/fetchData');

const BASE_URL = 'http://20.244.56.144/evaluation-service/stocks';

async function getPriceHistory(ticker, minutes, token) {
  const url = `${BASE_URL}/${ticker}?minutes=${minutes}`;
  return await fetchData(url, token);
}

async function getAveragePrice(ticker, minutes, token) {
  const priceHistory = await getPriceHistory(ticker, minutes, token);
  const total = priceHistory.reduce((sum, item) => sum + item.price, 0);
  const averagePrice = total / priceHistory.length;

  return { averagePrice, priceHistory };
}

module.exports = { getPriceHistory, getAveragePrice };
