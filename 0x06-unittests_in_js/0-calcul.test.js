const assert = require('assert');
const calculateNumber = require('./0-calcul');

describe('calculateNumber', () => {
  it('should add rounded numbers', () => {
    assert.strictEqual(calculateNumber(1.5, 2.3), 4);
  });

  it('should handle negative numbers', () => {
    assert.strictEqual(calculateNumber(-1.5, 2.3), 1);
  });

  it('rounding down', () => {
    assert.strictEqual(calculateNumber(1.4, 2.4), 3);
  });

  it('rounding up', () => {
    assert.strictEqual(calculateNumber(1.5, 2.5), 5);
  });

  it('three decimal places', () => {
    assert.strictEqual(calculateNumber(1.555, 2.555), 5);
  });

  it('multiple decimals close to upper bound', () => {
    assert.strictEqual(calculateNumber(1.9999999999, 2.4999999999), 4);
  });

  it('multiple decimals close to lower bound', () => {
    assert.strictEqual(calculateNumber(1.5000000000, 2.0000000000), 4);
  });
});
