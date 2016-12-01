var React = require('react');

var Controls = React.createClass({

  propTypes: {
    status: React.PropTypes.string.isRequired,
    onStatusChange: React.PropTypes.func.isRequired
  },

  // when the "onclick" is triggered for the buttons below, the onStatusChange function is first called (because an argument is passed oin),
  // then whatever is returned (in this case the onStatusChange functoin passed down from props) is called.
  // this is known as the CURRYING pattern.  It avoids having to have a different onStatusChange function for each button.
  onStatusChange: function (newStatus) {
    return () => {
      this.props.onStatusChange(newStatus);
    }
  },

  render: function(){
    var {status} = this.props;

    var renderStartStopButton = () => {
      if (status === 'started') {
        return (
          <button className="button secondary" onClick = {this.onStatusChange('paused')}>Pause</button>
        )
      } else {
        return (
          <button className="button primary" onClick={this.onStatusChange('started')}>Start</button>
        )
      }
    };

    return (
      <div className="controls">
        { renderStartStopButton() }
        <button className="button alert hollow" onClick={this.onStatusChange('stopped')}>Clear</button>
      </div>
    )
  }
});

module.exports = Controls;
