const axios = require('axios');
jest.mock('axios');

const { getStockPrices, getAveragePrice, getCorrelation } = require('../utils/fetchData');
const { calculateCorrelation } = require('../utils/correlationUtils');

describe('Fetch Data Utility Functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getStockPrices returns price data as array', async () => {
    axios.get.mockResolvedValue({
      data: {
        stock: {
          price: 100,
          lastUpdatedAt: '2025-06-04T12:00:00Z'
        }
      }
    });

    const data = await getStockPrices('AAPL');
    expect(Array.isArray(data)).toBe(true);
    expect(data[0].price).toBe(100);
  });

  test('getAveragePrice calculates average', () => {
    const prices = [
      { price: 100 },
      { price: 200 },
      { price: 300 }
    ];

    const result = getAveragePrice(prices);
    expect(result.averageStockPrice).toBeCloseTo(200, 2);
  });

  test('getCorrelation returns proper structure', async () => {
    axios.get
      .mockResolvedValueOnce({
        data: [
          { price: 100, lastUpdatedAt: 'T1' },
          { price: 200, lastUpdatedAt: 'T2' }
        ]
      })
      .mockResolvedValueOnce({
        data: [
          { price: 50, lastUpdatedAt: 'T1' },
          { price: 150, lastUpdatedAt: 'T2' }
        ]
      });

    const result = await getCorrelation('AAPL', 'GOOG');
    expect(result).toHaveProperty('correlation');
    expect(result).toHaveProperty('stocks');
    expect(result.stocks).toHaveProperty('AAPL');
    expect(result.stocks).toHaveProperty('GOOG');
  });
});

describe('Correlation Calculation', () => {
  test('calculates correct Pearson correlation', () => {
    const x = [1, 2, 3, 4, 5];
    const y = [2, 4, 6, 8, 10]; // perfect positive correlation
    expect(calculateCorrelation(x, y)).toBeCloseTo(1, 5);
  });

  test('returns 0 if arrays have different lengths', () => {
    const x = [1, 2, 3];
    const y = [1, 2];
    expect(calculateCorrelation(x, y)).toBe(0);
  });

  test('returns 0 if array is empty', () => {
    expect(calculateCorrelation([], [])).toBe(0);
  });
});
