var React = require('react');
var Clock = require('Clock');
var CountdownForm = require('CountdownForm');
var Message = require('Message');

var Countdown = React.createClass({

  getInitialState: function (){
    return {
      count: 0,
      message: null
    };
  },

  handleSetCountdown: function(result) {
    if (result == 'Error') {
      this.setState({
        message: 'Please enter a valid number in seconds'
      });
    } else {
      this.setState({
        message: null,
        count: result
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
