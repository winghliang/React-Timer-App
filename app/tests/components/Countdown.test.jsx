var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var Countdown = require('Countdown');

describe("Countdown", () => {
  it('should exist', () => {
    expect(Countdown).toExist();
  });

  describe('handleSetCountdown', () => {
    // adding done as an argument lets Mocha know that the test will be asyncrhonous
    it('should set state to started and countdown when a valid time in seconds is entered', (done) => {
      var countdown = TestUtils.renderIntoDocument(<Countdown/>);
      countdown.handleSetCountdown(20);

      expect(countdown.state.count).toBe(20);
      expect(countdown.state.countdownStatus).toBe('started');

      // this will be an asynchronous test because it will run 1001 miliseconds later
      setTimeout( ()=>{
        expect(countdown.state.count).toBe(19);
        done();
      }, 1001)
    });

    it("should set state's message to an error when an invalid time entered", () => {
      var countdown = TestUtils.renderIntoDocument(<Countdown/>);
      countdown.handleSetCountdown('Error');

      expect(countdown.state.message).toBe('Please enter a valid number in seconds');
    });

    it("should never set count to less than zero", () => {
      var countdown = TestUtils.renderIntoDocument(<Countdown />);
      countdown.handleSetCountdown(1);

      setTimeout( () => {
        expect(countdown.state.count).toBe(0);
        done();
      }, 3001)
    });

  });
});
