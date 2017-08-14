var React = require("react");

var AddNewAppointment = React.createClass({
 // get html from https://gist.github.com/planetoftheweb/4e7bdebf7b8d30dff6d0b11ed2746915

 toggleDisplayAddApointmentForm:function(){
   this.props.handleToggleDisplayAddForm();
 },

AddNewAppointmentInDb: function(e){
  var tempRecord = {
    petName: this.refs.inputPetName.value,
    ownerName: this.refs.inputOwnerName.value,
    aptDate: this.refs.inputAptDate.value + " " + this.refs.inputAptTime.value,
    pastSurgery: this.refs.inputSurgeryNotes.value,
    aptNotes: this.refs.inputAptNotes.value,
    firstTimer: "tbc"
  }//tempRecord
  e.preventDefault();
  this.props.addAptInDb(tempRecord);
}, //AddNewAppointmentInDb

  render: function(){
    var displayAddApointmentBody = {
      display: this.props.addApointmentBodyVisible ? 'block' : 'none'
      // if display is TRUE then show the block : else show none
    }; // displayAddApointmentBody

    return(
      <div className="panel panel-primary">
        <div className="panel-heading apt-addheading">
        <span className="glyphicon glyphicon-plus"></span> Add Appointment</div>
        <div className="panel-body" style={displayAddApointmentBody}>
          <form className="add-appointment form-horizontal" onSubmit = {this.AddNewAppointmentInDb}>
            <div className="form-group">
              <label className="col-sm-2 control-label" for="petName">Pet Name</label>
              <div className="col-sm-10">
                <input type="text" className="form-control"
                  id="petName" ref="inputPetName" placeholder="Pet's Name" />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-2 control-label" for="petOwner">Pet Owner</label>
              <div className="col-sm-10">
                <input type="text" className="form-control"
                  id="petOwner" ref="inputOwnerName" placeholder="Owner's Name" />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-2 control-label" for="aptDate">Date</label>
              <div className="col-sm-4">
                <input type="date" className="form-control"
                  id="aptDate" ref="inputAptDate"/>
              </div>
              <label className="col-sm-2 control-label" for="aptTime">Time</label>
              <div className="col-sm-4">
                <input type="time" className="form-control"
                  id="aptTime" ref="inputAptTime" />
              </div>

            </div>

            <div className="form-group">
              <label className="col-sm-2 control-label" htmlFor="aptPastSurgery">Any known Past Surgeries:</label>
              <div className="col-sm-10">
                <textarea className="form-control" rows="2" cols="50"
                  id="aptPastSurgery" ref="inputSurgeryNotes" placeholder="please enter here details on any known past surgeries"></textarea>
              </div>
            </div>

            <div className="form-group">
              <label className="col-sm-2 control-label" for="aptNotes">Apt. Notes</label>
              <div className="col-sm-10">
                <textarea className="form-control" rows="4" cols="50"
                  id="aptNotes" ref="inputAptNotes" placeholder="Appointment Notes"></textarea>
              </div>
            </div>

            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <button type="submit" className="btn btn-primary pull-right">Adauga noua inregistrare</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )//return
  } // render function in the sumbcomponent
}); //AddAppointment className

// read the export message like this:
// this module exports AddAppointment className  :)
module.exports=AddNewAppointment;
