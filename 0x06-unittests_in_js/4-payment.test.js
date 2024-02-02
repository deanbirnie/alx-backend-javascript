const sinon = require('sinon');
const Utils = require('./utils');
const { expect } = require('chai');
const sendPaymentRequestToApi = require('./4-payment');

describe('sendPaymentRequestToApi', () => {
  it('sendPaymentRequestToApi calls console.log with the right arguments', () => {
    const logSpy = sinon.spy(console);
    const tmpVal = sinon.stub(Utils, 'calculateNumber');

    tmpVal.returns(10);
    sendPaymentRequestToApi(100, 20);
    expect(tmpVal.calledWith('SUM', 100, 20)).to.be.true;
    expect(tmpVal.callCount).to.be.equal(1);
    expect(logSpy.log.calledWith('The total is: 10')).to.be.true;
    expect(logSpy.log.callCount).to.be.equal(1);
    tmpVal.restore();
    logSpy.log.restore();
  });
});
