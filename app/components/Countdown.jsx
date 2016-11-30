var React = require('react');
var Clock = require('Clock');
var CountdownForm = require('CountdownForm');
var Message = require('Message');
var Controls = require('Controls');

var Countdown = React.createClass({

  getInitialState: function (){
    return {
      count: 0,
      message: null,
      countdownStatus: 'stopped'
    };
  },

  // gets called after either props or state gets updated
  componentDidUpdate: function(prevProps, prevState){
    //check if the update is to countdownStatus
    if (this.state.countdownStatus !== prevState.countdownStatus){
      switch (this.state.countdownStatus) {
        case 'started':
          this.startTimer();
          break;
        // the stopped case has no break, so the code below "paused" will execute for both "stopped" and "paused"
        case 'stopped':
          this.setState({count: 0});
        case 'paused':
          clearInterval(this.timer);
          this.timer = undefined;
          break;
      }
    }
  },

  componentWillUnmount: function(){
    clearInterval(this.timer);
    this.timer = undefined;
  },

  startTimer: function(){
    this.timer = setInterval( () => {
      var newCount = this.state.count - 1;
      this.setState({
        count: newCount >= 0 ? newCount : 0
      });

      if (newCount === 0) {
        this.setState({countdownStatus: 'stopped'})
      };

    }, 1000);
  },

  handleSetCountdown: function(result) {
    if (result == 'Error') {
      this.setState({
        message: 'Please enter a valid number in seconds'
      });
    } else {
      this.setState({
        message: null,
        count: result,
        countdownStatus: 'started'
      });
    };
  },

  handleStatusChange: function(newStatus) {
    this.setState({countdownStatus: newStatus});
  },

  render: function(){
    var {count, countdownStatus, message} = this.state;

    var renderMessage = function(){
      if (message){
          return <Message message={message}/>
      }
    };

    var renderControlArea = () => {
      if (countdownStatus != 'stopped') {
        return <Controls countdownStatus = {countdownStatus} onStatusChange = {this.handleStatusChange}/>
      } else {
        return <CountdownForm onSetCountdown = {this.handleSetCountdown}/>
      }
    };

    return (
      <div>
        <h1 className="page-title">Countdown App</h1>
        <Clock totalSeconds={count}/>
        {renderControlArea()}
        {renderMessage()}
      </div>
    )
  }
});

module.exports = Countdown;
