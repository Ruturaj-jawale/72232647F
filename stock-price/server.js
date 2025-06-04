const express = require('express');
const fs = require('fs');
const { getAveragePrice, getPriceHistory } = require('./stockService');
const { calculateCorrelation } = require('./utils/correlationUtils');

const app = express();
const PORT = 3000;

// Load token
const TOKEN = fs.readFileSync('./token.json', 'utf8').trim();

app.get('/stocks/:ticker', async (req, res) => {
  const { ticker } = req.params;
  const { minutes, aggregation } = req.query;

  if (aggregation !== 'average') return res.status(400).json({ error: 'Only average aggregation is supported' });

  const { averagePrice, priceHistory } = await getAveragePrice(ticker, minutes, TOKEN);
  res.json({ averageStockPrice: averagePrice, priceHistory });
});

app.get('/stockcorrelation', async (req, res) => {
  const { minutes, ticker: tickers } = req.query;

  if (!Array.isArray(tickers) || tickers.length !== 2) {
    return res.status(400).json({ error: 'Provide exactly 2 tickers' });
  }

  const [ticker1, ticker2] = tickers;
  const stock1 = await getPriceHistory(ticker1, minutes, TOKEN);
  const stock2 = await getPriceHistory(ticker2, minutes, TOKEN);

  const correlation = calculateCorrelation(stock1.map(p => p.price), stock2.map(p => p.price));

  res.json({
    correlation,
    stocks: {
      [ticker1]: {
        averagePrice: stock1.reduce((sum, p) => sum + p.price, 0) / stock1.length,
        priceHistory: stock1,
      },
      [ticker2]: {
        averagePrice: stock2.reduce((sum, p) => sum + p.price, 0) / stock2.length,
        priceHistory: stock2,
      }
    }
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
