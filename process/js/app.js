var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');//we include loadsh

var FiltruApts = require('./subCompSeba');
var AddNewAppointment = require('./AddNewAppointment');


var MainInterface = React.createClass({
  getInitialState: function() {
    return {
      addAppointmentBodyIsVisible: false,
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

 toggleAddDisplay: function(){
   tempVisibility = !this.state.addAppointmentBodyIsVisible;
   this.setState({
     addAppointmentBodyIsVisible : tempVisibility
   }); // setState
 }, // toggleAddDisplay

addRecord: function(tempRecord){
  var tempApts = this.state.myAppointments;

  //we check if the record is in the dB
  var existingRecord = _.findIndex(tempApts, {"petName":tempRecord.petName});
  if (existingRecord == "-1" ){
      tempRecord.firstTimer = "true";
  } else { // we have the petName in the record list
      tempRecord.firstTimer = "false";
  }//if-else

  // we add the record inthe dB
  tempApts.push(tempRecord);
  this.setState({
    myAppointments: tempApts
  });//setState
},//addRecord function

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
        <AddNewAppointment
          addApointmentBodyVisible = {this.state.addAppointmentBodyIsVisible}
          handleToggleDisplayAddForm = {this.toggleAddDisplay}
          addAptInDb = {this.addRecord}
        />
        <ul className="item-list media-list">{filteredApts}</ul>
      </div>
    ) //return
  } //render
}); //MainInterface

ReactDOM.render(
  <MainInterface />,
  document.getElementById('petAppointments')
); //render
