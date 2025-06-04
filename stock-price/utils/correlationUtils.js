function calculateCorrelation(x, y) {
  const n = x.length;
  const avgX = x.reduce((a, b) => a + b, 0) / n;
  const avgY = y.reduce((a, b) => a + b, 0) / n;

  const cov = x.reduce((sum, xi, i) => sum + ((xi - avgX) * (y[i] - avgY)), 0) / (n - 1);
  const stdX = Math.sqrt(x.reduce((sum, xi) => sum + (xi - avgX) ** 2, 0) / (n - 1));
  const stdY = Math.sqrt(y.reduce((sum, yi) => sum + (yi - avgY) ** 2, 0) / (n - 1));

  return cov / (stdX * stdY);
}

module.exports = { calculateCorrelation };
