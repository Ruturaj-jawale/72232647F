const axios = require('axios');
jest.mock('axios');

const { getStockPrices } = require('./fetchData');

describe('getStockPrices', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should fetch stock prices and return an array', async () => {
    // Mock axios.get to resolve with fake data
    axios.get.mockResolvedValue({
      data: {
        prices: [
          { price: 100, date: '2025-06-04' },
          { price: 110, date: '2025-06-05' }
        ]
      }
    });

    const result = await getStockPrices('AAPL');

    expect(axios.get).toHaveBeenCalledWith('https://api.example.com/stocks/AAPL');
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(2);
    expect(result[0]).toHaveProperty('price', 100);
  });

  test('should handle errors gracefully', async () => {
    axios.get.mockRejectedValue(new Error('Network Error'));

    await expect(getStockPrices('AAPL')).rejects.toThrow('Network Error');
  });
});
