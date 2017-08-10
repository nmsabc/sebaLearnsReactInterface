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
    console.info("this is what tempApts looks like: ",tempApts);
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
    filteredApts = filteredApts.map(function(item, index) {
      return(

        <li className="pet-item media" key={index}>
          <div className="pet-info media-body">
            <div className="pet-head">
              <span className="pet-name">{"Record ID ", index, ": ", this.state.data[index].petName}</span>
              <span className="apt-date pull-right">{this.state.data[index].aptDate}</span>
            </div>
            <div className="owner-name"><span className="label-item">Owner:</span>
            {this.state.data[index].ownerName}</div>
            <div className="apt-firstTimer"><span className="label-item">First timer:</span> {this.state.data[index].firstTimer}</div>
            <div className="apt-pastSurgery"><span className="label-item">Past suergery:</span>{this.state.data[index].pastSurgery}</div>
            <div className="apt-show"><span className="label-item">Show:</span> {this.state.data[index].show}</div>
            <div className="apt-notes"><span className="label-item">Obs: </span>{this.state.data[index].aptNotes}</div>
          </div>
        </li>
      ) //return
    }.bind(this)); //filteredApts.map
    return (
      <div className="interface">
      <div className="length">
      <p>we have a number of {this.state.data.length} records in our file dB </p></div>
        <ul className="item-list media-list">{filteredApts}</ul>
      </div>
    ) //return
  } //render
}); //MainInterface

ReactDOM.render(
  <MainInterface />,
  document.getElementById('petAppointments')
); //render
