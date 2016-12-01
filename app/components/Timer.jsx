var React = require('react');
var Timer = require('Timer');
var Clock = require('Clock');
var Controls = require('Controls');

var Timer = React.createClass({

  getInitialState: function(){
    return ({
      status: 'stopped',
      count: 0
    });
  },

  componentDidUpdate: function (prevProps, prevState){
    if (prevState.status !== this.state.status){
      switch (this.state.status) {
        case 'started':
          this.startTimer();
          break;
        case 'stopped':
          this.setState({count: 0});
        case 'paused':
          clearInterval(this.timer);
          this.timer = undefined;
          break;
      }
    }
  },

  // stop setTimeout function if the countdown component unmounts
  componentWillUnmount: function(){
    clearInterval(this.timer);
    this.timer = undefined;
  },

  startTimer: function( ){
    this.timer = setInterval( () => {
      var newCount = this.state.count + 1;
      this.setState({count: newCount});
    }, 1000);
  },

  handleStatusChange: function (newStatus){
    this.setState({status: newStatus})
  },

  render: function(){
    return (
      <div>
        <h1 className="page-title">Timer App</h1>
        <Clock totalSeconds = {this.state.count} />
        <Controls status = {this.state.status} onStatusChange = {this.handleStatusChange} />
      </div>
    )
  }
});

module.exports = Timer;
