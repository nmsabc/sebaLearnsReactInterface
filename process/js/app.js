var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');//we include loadsh

var FiltruApts = require('./subCompSeba');
var AddNewAppointment = require('./AddNewAppointment');


var MainInterface = React.createClass({
  getInitialState: function() {
    return {
      myAppointments: []
    } //return
  }, //getInitialState

  componentDidMount: function() {
    this.serverRequest = $.get('./js/dataSeba.json', function(result) {
      var tempApts = result;
      this.setState({
        myAppointments: tempApts
      }); //setState
    }.bind(this));
  }, // componentDidMount

  componentWillUnmount: function() {
    this.serverRequest.abort();
  }, //componentWillUnmount

 deleleRecord: function(item){
   var allElem = this.state.myAppointments;
   var newAllElem = _.without(allElem, item);
   this.setState({
     myAppointments: newAllElem
   }); // setState
 },//deleleRecord

  render: function() {
    var filteredApts = this.state.myAppointments;
    filteredApts = filteredApts.map(function(item, index) {
      return(
        <FiltruApts key = { index }
        singleItem = { item }
        whichItem = { item }
        onDelete = {this.deleleRecord}
        />
      ) //return
    }.bind(this)); //filteredApts.map
    return (
      <div className="interface">
      <p>Avem {filteredApts.length} ELEMENTE in dB si folosim functii dintr-un fisier separat :).</p>
      <p>Avem acum si access la events</p>
        <AddNewAppointment />
        <ul className="item-list media-list">{filteredApts}</ul>
      </div>
    ) //return
  } //render
}); //MainInterface

ReactDOM.render(
  <MainInterface />,
  document.getElementById('petAppointments')
); //render