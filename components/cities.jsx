import React from 'react';
const Card = require('material-ui/lib/card/card');
const CardText = require('material-ui/lib/card/card-text');
const CardHeader = require('material-ui/lib/card/card-header');
const FlatButton = require('material-ui/lib/flat-button');
const Paper = require('material-ui/lib/paper');
const TextField = require('material-ui/lib/text-field');
const RaisedButton = require('material-ui/lib/raised-button');
const SelectField = require('material-ui/lib/select-field');


export class Cities extends React.Component {

  willRecieveProps() {
    console.log('test');
  }

  render() {
    
    return (

      
      <Card style={{ flexGrow: 1, paddingLeft: 20 }}>
        <TextField
          value={this.props.inputCity}
          hintText="Enter city name"
          onChange={this.props.handleCityNameChange}
        />
        <br/>
        <RaisedButton label="Add city" onClick={this.props.addCity}/>
        <br/>
        <SelectField selectedIndex={this.props.selectedIndex}
          menuItems={this.props.cities} 
          onChange={this.props.handleSelectCity}
        />
        <br/>
        <RaisedButton label="Remove city" onClick={this.props.removeCity}/>

 

      </Card>
    );


  }

}

