const assert = require('assert');
const calculateNumber = require('./1-calcul');

describe('calculateNumber', () => {
  describe('type == "SUM"', () => {
    it('positive numbers', () => {
      assert.strictEqual(calculateNumber('SUM', 1, 3), 4);
    });

    it('one negative and one positive number', () => {
      assert.strictEqual(calculateNumber('SUM', -1, 3), 2);
    });

    it('two negative numbers', () => {
      assert.strictEqual(calculateNumber('SUM', -2, -2), -4);
    });

    it('zeros', () => {
      assert.strictEqual(calculateNumber('SUM', 0, 0), 0);
    });
  });

  describe('type == "SUBTRACT"', () => {
    it('positive numbers', () => {
      assert.strictEqual(calculateNumber('SUBTRACT', 3, 1), 2);
    });

    it('negative numbers', () => {
      assert.strictEqual(calculateNumber('SUBTRACT', -2, -2), 0);
    });

    it('zeros', () => {
      assert.strictEqual(calculateNumber('SUBTRACT', 0, 0), 0);
    });
  });

  describe('type == "DIVIDE"', () => {
    it('positive numbers', () => {
      assert.strictEqual(calculateNumber('DIVIDE', 6, 2), 3);
    });

    it('negative numbers', () => {
      assert.strictEqual(calculateNumber('DIVIDE', -7, -2), 3.5);
    });

    it('zero and a number', () => {
      assert.strictEqual(calculateNumber('DIVIDE', 0, 2), 0);
    });

    it('undefined error', () => {
      assert.strictEqual(calculateNumber('DIVIDE', 2, 0), 'Error');
    });
  });
});
