var React = require('react');
var ReactDOM = require('react-dom');

var SecondInterface = React.createClass({
  render: function(){
    return(
      <div className = "SecondInterface">
      <h1>This is where an ordered list will show-up</h1>
      <ul>
      <li>aaaa: 12pm</li>
      <li>bbb: 1pm</li>
      <li>cc: 3pm</li>
      <li>d: 4pm</li>
      <li>ee: 5pm</li>
      <li>fff: 6pm</li>
      </ul>
      </div>
    )
  } // render
});//SecondInterface

ReactDOM.render(
  <SecondInterface />,
  document.getElementById('SecondInterface')
); //render
