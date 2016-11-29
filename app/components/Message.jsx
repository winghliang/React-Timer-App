var React = require('react');

var Message = React.createClass({
  render: function(){
    return (
      <div>
        <p className="error-message">{this.props.message}</p>
      </div>
    )
  }
});

module.exports = Message;
