const { calculateCorrelation } = require('../utils/correlationUtils');

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

