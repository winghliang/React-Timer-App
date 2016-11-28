var React = require('react');
var Countdown = require('Countdown');
var Clock = require('Clock');

var Countdown = React.createClass({
  render: function(){
    return (
      <div>
        <Clock totalSeconds={129}/>
      </div>
    )
  }
});

module.exports = Countdown;
