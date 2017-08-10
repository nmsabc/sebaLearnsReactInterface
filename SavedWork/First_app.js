var React = require('react');
var ReactDOM = require('react-dom');

var MainInterface = React.createClass({
  render: function(){
    return (
      <div className = "interface">
      <h1>Pet Appointments</h1>
      <ul>
      <li>Spot: 1pm</li>
      <li>Schmitz: 2pm</li>
      <li>Jojo: 12pm</li>
      <li>Jiji: 11am</li>
      <li>Jaja- Bings: 10am</li>
      <li>Jaja- Bings Jr.: 09am</li>
      </ul>
      </div>
    )
  } // render
}); //MainInterface

ReactDOM.render(
  <MainInterface />,
  document.getElementById('petAppointments')
); //render
