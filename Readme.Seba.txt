
++++++++++++++++++++++++++++++++++
NEW: we add a new record
branch:hideAddAppointmentComponent
++++
we make use of onSubmit and we ensure that we pass to the fucntion the event e.
on this event we will make sure that we set e.preventDefault();

we use the this.refs.<inputId> to create a tempRecord that will be sent to the main app.

in the main app, we check if petName exists. if yes, we add record with the firstTimer == false ? true

we use .push followed by .setState as follows

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

++++++++++++++++++++++++++++++++++
NEW: we can show/hide the add Apointment component
branch:hideAddAppointmentComponent
++++
- we create an Create Style Object which will manage the inline style
- we will manage this subComponent managing its Props which will have a State associated
- we must manage the events on the item
 - we will manage the clickEven
  - have a subComponents copy and one equivalent to manage the state of the subComponent

This is how we do it:
    var displayAddApointmentBody = {
      display: this.props.addApointmentBodyVisible ? 'block' : 'none'
      // if display is TRUE then show the block : else show none
    }; // displayAddApointmentBody

this will be one props in app.js for the AddNewAppointment subComp:
    addApointmentBodyVisible = {this.state.addAppointmentBodyIsVisible}

and this is set to false in the MainInterface getInitialState

therefore, now on refresh we get the AddNewAppointment hidden.

to toggle on/off, we add the onClick={this.toggleDisplayAddApointmentForm}
which will call the function to set the state of the AddNewAppointment form:

    toggleDisplayAddApointmentForm:function(){
      this.props.handleToggleDisplayAddForm();
    },

this one will refer to the app.js on AddNewAppointment object which is sent with the variable set:
    handleToggleDisplayAddForm = {this.toggleAddDisplay}
this will call a function before the render to change the status of the form display to on/off:

    toggleAddDisplay: function(){
      tempVisibility = !this.state.addAppointmentBodyIsVisible;
      this.setState({
        addAppointmentBodyIsVisible : tempVisibility
      }); // setState
    }, // toggleAddDisplay

in short, the object AddNewAppointment will be rendered with two propos:
    addApointmentBodyVisible & handleToggleDisplayAddForm
on any change driven by the onClick, the new object is invoked with the new prop for handleToggleDisplayAddForm.

++++++++++++++++++++++++++++++++++
NEW: add interface for adding records into dB
branch: seba_add_records_2
++++

AddNewAppointment.js shows a form that will allow users to add new records into dB
This is a new subComponent as subCompSeba ==> nothing new.
next will showOn/showOff the add new record form and add records into the file

End of Business day :)
8 Aug 2017

++++++++++++++++++++++++++++++++++
NEW: handleDelete
branch:seba_events_ok_1
++++

usage ==> add in the subcomponent:
- in return add:
      onClick={this.handleDelete}
- define the function In the class:
      handleDelete: function(){
        this.props.onDelete(this.props.singleItem)
        // this.props.onDelete(this.props.whichItem)
      },//handleDelete

add inthe main js file:
      onDelete = {this.deleleRecord}
which is a call to the function:
          deleleRecord: function(item){
            var allElem = this.state.myAppointments;
            var newAllElem = _.without(allElem, item);
            this.setState({
              myAppointments: newAllElem
            }); // setState
          },//deleleRecord



++++++++++++++++++++++++++++++++++
NEW: using subcomponents:
branch: seba_subComp_ok
++++

-the subcomponent is in a diff file
-need to import react library (var react = require('react'))
-use createClass to define classes
  this will have at least a render method to export the JSX
-has the export module component to be available in the main component

=======================================================
SAMPLE CODE - use w//o issues
=======================================================
        var React = require("react"); //exact asa cum e scris

        var [subCompName] = React.createClass({
          render: function(){
            return(
                < [JSX code as required]/>
            )//return ==> this render needs to return
          } // render function in the sumbcomponent
        }); // [subCompName]class

        module.exports=[subCompName];
=======================================================
- HTML follows JSX
- class este className
- <input /> must have self close
- other gotchas @ https://facebook.github.io/react/docs/jsx-in-depth.html

-si este necesar importul modului in app.js
        var FiltruApts = require('./subCompSeba');

      //add this in the *return* of the render function
      <FiltruApts key = { index }
              singleItem = { item }
              whichItem = { item }
              onDelete = {this.deleleRecord}
              />
+++++++++++++++++++++++++++++
require is because of BROWSERIFY
