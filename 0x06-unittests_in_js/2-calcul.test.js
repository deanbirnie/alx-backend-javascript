const { expect } = require('chai');
const calculateNumber = require('./2-calcul_chai');

describe('calculateNumber', () => {
  describe('type == "SUM"', () => {
    it('positive numbers', () => {
      expect(calculateNumber('SUM', 1, 3)).to.equal(4);
    });

    it('one negative and one positive number', () => {
      expect(calculateNumber('SUM', -1, 3)).to.equal(2);
    });

    it('two negative numbers', () => {
      expect(calculateNumber('SUM', -2, -2)).to.equal(-4);
    });

    it('zeros', () => {
      expect(calculateNumber('SUM', 0, 0)).to.equal(0);
    });
  });

  describe('type == "SUBTRACT"', () => {
    it('positive numbers', () => {
      expect(calculateNumber('SUBTRACT', 3, 1)).to.equal(2);
    });

    it('negative numbers', () => {
      expect(calculateNumber('SUBTRACT', -2, -2)).to.equal(0);
    });

    it('zeros', () => {
      expect(calculateNumber('SUBTRACT', 0, 0)).to.equal(0);
    });
  });

  describe('type == "DIVIDE"', () => {
    it('positive numbers', () => {
      expect(calculateNumber('DIVIDE', 6, 2)).to.equal(3);
    });

    it('negative numbers', () => {
      expect(calculateNumber('DIVIDE', -7, -2)).to.equal(3.5);
    });

    it('zero and a number', () => {
      expect(calculateNumber('DIVIDE', 0, 2)).to.equal(0);
    });

    it('undefined error', () => {
      expect(calculateNumber('DIVIDE', 2, 0)).to.equal('Error');
    });
  });
});
