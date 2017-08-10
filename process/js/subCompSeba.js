var React = require('react');

var FiltruApts = React.createClass({

  handleDelete: function(){
    this.props.onDelete(this.props.singleItem)
    // this.props.onDelete(this.props.whichItem)
  },//handleDelete

  render: function(){

    //am adaugat div-ul media-left pentru a sterge o inregistrare
    return(
        <li className="pet-item media">

          <div className="media-left">
            <button className="pet-delete btn btn-xs btn-danger" onClick={this.handleDelete}>
            <span className="glyphicon glyphicon-remove"></span>
            </button>
          </div>

          <div className="pet-info media-body">
            <div className="pet-head">
            <span className="pet-name">{this.props.singleItem.petName}</span>
            <span className="apt-date pull-right">{this.props.singleItem.aptDate}</span>
          </div>
          <div className="owner-name"><span className="label-item">Owner:</span>
          {this.props.singleItem.ownerName}</div>
          <div className="apt-firstTimer"><span className="label-item">First timer:</span> {this.props.singleItem.firstTimer}</div>
          <div className="apt-pastSurgery"><span className="label-item">Past surgery:</span>{this.props.singleItem.pastSurgery}</div>
          <div className="apt-notes"><span className="label-item">Obs: </span>{this.props.singleItem.aptNotes}</div>
          </div>
        </li>

    ) //return
  }//render
});//filtruApts

module.exports=FiltruApts;

//<div className="apt-show"><span className="label-item">Show:</span> {this.props.singleItem.show}</div>
