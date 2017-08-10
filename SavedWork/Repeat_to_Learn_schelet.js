var React = require('react');
var ReactDOM = require('react-dom');

var Obiect = React.createClass({
  getInitialState:function(){
    return{
      title:'Appointments',
      show: true
    };
  },//getInitialState

  render: function(){
    var showTitle;
    if(this.state.show){
      showTitle="_____ New PET _____ "
    } else {
      showTitle="__ PET __ "
    }//if // else

    var displayList = {
      display: this.state.show ? 'block':'none',
      color: 'red'
    } // use these variables to work with the states and getInitialState
    var colorHeader = {
      display: this.state.show ? 'block':'none',
      color: 'green'
    }// use these variables to work with the states and getInitialState

    return(
      <div>
      <p> And here we noe show the new state -- diff Html tags herein </p>
      <h1 style={colorHeader}> {showTitle} {this.state.title} </h1>
       <ul style={displayList}>
       <li>Spot: 1pm</li>
       <li>Schmitz: 2pm</li>
       <li>Jojo: 12pm</li>
       <li>Jiji: 11am</li>
       <li>Jaja- Bings: 10am</li>
       <li>Jaja- Bings Jr.: 09am</li>
       </ul>
      </div>
    ) // return
  } // render
}); //Obiect ==> the obj has: getInitialState, render func(), 2xvars and a return

ReactDOM.render(
  <Obiect />,
  document.getElementById('obiect')
);//render
