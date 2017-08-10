var React = require('react');
var ReactDOM = require('react-dom');

var MainInterface = React.createClass({
  getInitialState: function() {
    return {
      data: []
    } //return
  }, //getInitialState

componentDidMount: function(){
  this.serverRequest = $.get('./js/dataSeba.json', function(result){
    var tempApts = result;
    this.setState({
      data:tempApts
    }); // setState
  }.bind(this));//serverRequest
}, //componentsDidMount

componentWillUnmount: function(){
  this.serverRequest.abort();
},//componentDidUnmount

  render: function() {
    var filteredApts = this.state.data;
    //const {item, index} = props;
    filteredApts = filteredApts.map(function(item, index) {
      return(
        <filtruApointments  key = { index } singleItem = {item}/>
      ) //return
    }.bind(this)); //filteredApts.map
    return (
      <div className="interface">
        <ul className="item-list media-list">{filteredApts}</ul>
        <div className="length">
        <p>we have a number of {this.state.data.length} records in our file dB </p></div>
      </div>
    ) //return
  } //render
}); //MainInterface

var filtruApointments = React.createClass({
  render: function(){
    return(
      // this we moved out of filteredApts return function into a new class and use as subComponent
      <li className="pet-item media">
        <div className="pet-info media-body">
          <div className="pet-head">
            <span className="pet-name">{"Record ID ", key, ": ", this.props.singleItem.petName}</span>
            <span className="apt-date pull-right">{this.props.singleItem.aptDate}</span>
          </div>
          <div className="owner-name"><span className="label-item">Owner:</span>
          {this.props.singleItem.ownerName}</div>
          <div className="apt-firstTimer"><span className="label-item">First timer:</span> {this.props.singleItem.firstTimer}</div>
          <div className="apt-pastSurgery"><span className="label-item">Past suergery:</span>{this.props.singleItem.pastSurgery}</div>
          <div className="apt-show"><span className="label-item">Show:</span> {this.props.singleItem.show}</div>
          <div className="apt-notes"><span className="label-item">Obs: </span>{this.props.singleItem.aptNotes}</div>
        </div>
      </li>

    )//return
  }//render
});//filtruApointments

ReactDOM.render(
  <MainInterface />,
  document.getElementById('petAppointments')
); //render
