import React from 'react';
import { connect } from 'react-redux'
import { getWeatherHereAsync, getWeatherInCityAsync } from './actions.js';
const AppBar = require('material-ui/lib/app-bar');
const MyRawTheme = require('./theme.js');
const ThemeManager = require('material-ui/lib/styles/theme-manager');
let injectTapEventPlugin = require("react-tap-event-plugin");
import lockr from 'lockr';
injectTapEventPlugin();
import {Weather} from './weather.jsx';
import {Cities} from './cities.jsx';
import {CitiesArray} from '../libs/city_array.js';
 
var App = React.createClass({

  getInitialState() {
    const cachedCitiesString = lockr.get('cities');
    const cachedCities = cachedCitiesString ? JSON.parse(cachedCitiesString) : [];
    const cities = new CitiesArray(cachedCities || []);
    
    return {
      inputCity: '',
      cities: cities,
      selectedCity: '',
      selectedIndex: 0
    };
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(MyRawTheme),
    };
  },

  updateStorage() {
    lockr.set('cities', JSON.stringify(this.state.cities.cities));
  },


  componentDidMount() {
    this.props.dispatch(getWeatherHereAsync());   
  },

  handleRefresh() {
    this.getWeatherInCity();
  },

  handleCityNameChange(e) {
    this.state.inputCity = e.target.value;
    this.setState(this.state);
  },

  addCity() {
    if (this.state.inputCity) {
      this.state.cities.add({
        payload: this.state.cities.cities.length,
        text: this.state.inputCity
      });
      this.state.inputCity = '';
      this.setState(this.state);
      this.updateStorage();
      this.getWeatherInCity();
    }
  },


  handleSelectCity(e) {
    this.state.cities.setSelected(e.target.value);
    const city = this.state.cities.getCurrentCity();
    this.setState(this.state);
    this.getWeatherInCity();
  },

  getWeatherInCity() {
    const city = this.state.cities.getCurrentCity();
    this.props.dispatch(getWeatherInCityAsync(city.text));
  },

  handleRemoveCity() {
    this.state.cities.remove();
    this.setState(this.state);
    this.updateStorage();
    this.getWeatherInCity();
  },

  render() {
    const { weather, main, name, dispatch, loading, wind, sys } = this.props;
    const img_src = weather.icon ? `http://openweathermap.org/img/w/${weather.icon}.png` : '';
    
    return (
      <div>
        <AppBar title="Awesome weather application"/>
        
        
        <div style={{
          display: 'flex',
          flexFlow: 'row wrap',
          maxWidth: 1200,
          width: '100%',
          margin: '30px auto 30px'
        }}>

          
          <Cities
            inputCity={this.state.inputCity}
            selectedIndex={this.state.cities.selectedIndex}
            handleCityNameChange={this.handleCityNameChange}
            addCity={this.addCity}
            cities={this.state.cities.cities}
            handleSelectCity={this.handleSelectCity}
            removeCity={this.handleRemoveCity}
            handleRefresh={this.handleRefresh}
            isLoading={loading}
          />
          <Weather name={name} weather={weather} main={main}
           img_src={img_src} wind={wind} sys={sys}
           handleRefresh={this.handleRefresh}
          />
        </div>




        
      </div>
    )

  }


});

function select (state) {
  return state;
}

export default connect(select)(App)