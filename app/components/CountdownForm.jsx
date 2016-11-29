var React = require('react');

var CountdownForm = React.createClass({

  onSubmit: function(e){
      e.preventDefault();

      var strSeconds = this.refs.seconds.value;
      this.refs.seconds.value = "";

      if ( strSeconds.match(/^[0-9]*$/) ){
        this.props.onSetCountdown(parseInt(strSeconds, 10));
      } else {
        this.props.onSetCountdown('Error');
      };
  },

  render: function (){
    return (
      <div>
        <form ref="form" onSubmit = {this.onSubmit} className="countdown-form">
          <input type="text" ref="seconds" placeholder="Enter time in seconds"></input>
          <button className="button expanded">Start Countdown</button>
        </form>
      </div>
    )
  }
});

module.exports = CountdownForm;
