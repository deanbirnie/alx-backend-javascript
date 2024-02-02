const sinon = require('sinon');
const { expect } = require('chai');
const Utils = require('./utils');
const sendPaymentRequestToApi = require('./3-payment');

describe('sendPaymentRequestToApi', () => {
  it('utils defines the method calculateNumber used by sendPaymentRequestToApi', () => {
    const utilsSpy = sinon.spy(Utils);

    sendPaymentRequestToApi(100, 20);
    expect(utilsSpy.calculateNumber.calledWith('SUM', 100, 20)).to.be.true;
    expect(utilsSpy.calculateNumber.callCount).to.be.equal(1);
    utilsSpy.calculateNumber.restore();
  });
});
