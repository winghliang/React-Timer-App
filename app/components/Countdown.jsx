var React = require('react');
var Clock = require('Clock');
var CountdownForm = require('CountdownForm');
var Message = require('Message');

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
      }
    }
  },

  startTimer: function(){
    this.timer = setInterval( () => {
      var newCount = this.state.count - 1;
      this.setState({
        count: newCount >= 0 ? newCount : 0
      });
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

  renderMessage: function(){
    if (this.state.message){
        return <Message message={this.state.message}/>
    }
  },

  render: function(){
    var {count} = this.state;
    return (
      <div>
        <Clock totalSeconds={count}/>
        <CountdownForm onSetCountdown = {this.handleSetCountdown}/>
        {this.renderMessage()}
      </div>
    )
  }
});

module.exports = Countdown;
