const sinon = require('sinon');
const { expect } = require('chai');
const sendPaymentRequestToApi = require('./5-payment');

describe('sendPaymentRequestToApi', () => {
  let paymentRequestSpy;

  beforeEach(() => {
    if (!paymentRequestSpy) {
      paymentRequestSpy = sinon.spy(console);
    }
  });

  afterEach(() => {
    paymentRequestSpy.log.resetHistory();
  });

  it('calling sendPaymentRequestToApi and verify console logging', () => {
    sendPaymentRequestToApi(100, 20);
    expect(paymentRequestSpy.log.calledWith('The total is: 120')).to.be.true;
    expect(paymentRequestSpy.log.calledOnce).to.be.true;
  });

  it('calling sendPaymentRequestToApi with different values and verify console logging', () => {
    sendPaymentRequestToApi(10, 10);
    expect(paymentRequestSpy.log.calledWith('The total is: 20')).to.be.true;
    expect(paymentRequestSpy.log.calledOnce).to.be.true;
  });
});
