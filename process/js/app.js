var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');//we include loadsh

var FiltruApts = require('./subCompSeba');
var AddNewAppointment = require('./AddNewAppointment');
var SearchAppointments = require('./SearchAppointments');


var MainInterface = React.createClass({
  getInitialState: function() {
    return {
      addAppointmentBodyIsVisible: false,
      orderBy: 'petName',
      orderDir: 'asc',
      // orderFirstTimer: "true",
      // includeArchived: 'true',
      queryText: "",
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

  reOrder: function(orderBy, orderDir){
    this.setState({
      orderBy: orderBy,
      orderDir: orderDir
    }); // setState
  },//reOrder function

  searchRecords(query){
    this.setState({
      queryText: query
    });//setState
  }, // searchRecords

  render: function() {
    var filteredApts = [];
    var queryText = this.state.queryText;
    var myAppointments = this.state.myAppointments;
    // we include these vars for the SearchAppointments filter
    // these are first defined in the getInitialState and set to a value there.
    var orderBy = this.state.orderBy;
    var orderDir = this.state.orderDir;
    // var orderFirstTimer = this.state.orderFirstTimer;
    // var includeArchived = this.state.includeArchived;

    myAppointments.forEach(function(item){
      if(
        (item.petName.toLowerCase().indexOf(queryText)!= -1) ||
        (item.ownerName.toLowerCase().indexOf(queryText)!= -1) ||
        (item.aptDate.toLowerCase().indexOf(queryText)!= -1) ||
        (item.pastSurgery.toLowerCase().indexOf(queryText)!= -1) ||
        (item.aptNotes.toLowerCase().indexOf(queryText)!= -1)
      ){
        filteredApts.push(item);
      }
    });//forEach

    filteredApts = _.orderBy (filteredApts, function(item){
      return item[orderBy].toLowerCase(); // orders list by perName in asc order
    }, orderDir);     // lodash - _.orderBy

    // ! not working because orderBy uses asc and desc. firstTimer = true:false
    // filteredApts = _.orderBy (filteredApts, function(item){
    //   return item[orderFirstTimer];
    // }, orderDir);

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

        <SearchAppointments
          orderBy = { this.state.orderBy}
          orderDir = { this.state.orderDir }
          // orderFirstTimer = { this.state.orderFirstTimer }
          // includeArchived = { this.state.includeArchived }
          onReOrder = {this.reOrder}
          onSearch = { this.searchRecords }
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
