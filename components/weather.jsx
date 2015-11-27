import React from 'react';
const Card = require('material-ui/lib/card/card');
const CardText = require('material-ui/lib/card/card-text');
const CardHeader = require('material-ui/lib/card/card-header');
const FlatButton = require('material-ui/lib/flat-button');
const Paper = require('material-ui/lib/paper');
const CardActions = require('material-ui/lib/card/card-actions');
const CardTitle = require('material-ui/lib/card/card-title');
export class Weather extends React.Component {

  hPaToMMHg (hpa) {
    const hpasPerMMHg = 1.3332239;
    return Math.round(hpa/hpasPerMMHg, 0);
  }

  unixTimeToTime(unixTime) {
    if (unixTime) {
      return new Date(unixTime*1000).toString();  
    }
  }

  render() {

    
    return (
      
      <Card style={{
        flexGrow: 2,
        marginLeft: 30,
        paddingLeft: 5
      }}>
        
        <CardTitle title={this.props.name} subtitle={this.props.weather.description}/>
        <CardHeader avatar={this.props.img_src}/>
        <CardText>Temp: {this.props.main.temp} C</CardText>
        <CardText>Wind speed: {this.props.wind.speed} meter/sec</CardText>
        <CardText>Humidity: {this.props.main.humidity} %</CardText>
        <CardText>Pressure: {this.hPaToMMHg(this.props.main.pressure)} mmHg</CardText>
        <CardText>Sunrise: {this.unixTimeToTime(this.props.sys.sunrise)} </CardText>
        <CardText>Sunset: {this.unixTimeToTime(this.props.sys.sunset)} </CardText>
        <CardActions>
          <FlatButton primary={true} label="Refresh" onClick={this.props.handleRefresh}/>
        </CardActions>
      </Card>
    );


  }

}

