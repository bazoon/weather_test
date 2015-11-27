import config from './config.js';
var reqwest = require('reqwest');

class WeatherApi  {
  constructor() {
    
  }

  get(url) {
    return new Promise((resolve, reject) => {
      reqwest({ url: this.addApiKey(url), type: 'jsonp'})
        .then(function (response) {
          resolve(response);
        })
        .catch(function (err) {
          reject(err);
        })
    });
  }

  addApiKey(url) {
    return `${url}&APPID=${config.api_key}`;
  }

  getWeatherAtLocation(lat, lon, lang = 'en', units='metric') {
    return this.get(`${config.api_url}?lat=${lat}&lon=${lon}&lang=${lang}&units=${units}`);
  }

  getWeatherAtCurrentLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => {
        this.getWeatherAtLocation(position.coords.latitude, position.coords.longitude)
          .then(function (response) {
            resolve(response);         
          })
          .catch(function (err) {
            reject(err);
          })
      });  
    });
  }

  getWeatherInCity(city, units='metric') {
    return new Promise((resolve, reject) => {
      this.get(`${config.api_url}?q=${city}&units=${units}`)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (err) {
          reject(err)
        });
    });
  }
  

}

export default new WeatherApi();