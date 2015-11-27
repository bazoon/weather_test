import { GET_WEATHER_HERE, SHOW_LOADER, HIDE_LOADER, GET_WEATHER_IN_CITY } from './actions.js';


export default function actions(state, action) {
  switch(action.type) {
    
    case GET_WEATHER_HERE:
      console.log(action.data);
      return Object.assign({}, state, {
        weather: {
          description: action.data.weather[0].description,
          icon: action.data.weather[0].icon,
          main: action.data.weather[0].main
        },
        main: {
          grnd_level: action.data.main.grnd_level,
          humidity: action.data.main.humidity,
          pressure: action.data.main.pressure,
          temp: action.data.main.temp
        },
        sys: {
          country: action.data.sys.country,
          sunrise: action.data.sys.sunrise,
          sunset: action.data.sys.sunset
        },
        wind: {
          speed: action.data.wind.speed
        },
        name: action.data.name
      });
      break;
    case SHOW_LOADER:
      return Object.assign({}, state, {
        loading: true
      });
      break;
    case HIDE_LOADER:
      return Object.assign({}, state, {
        loading: false
      });
      break;
    case GET_WEATHER_IN_CITY:
      return Object.assign({}, state, {
        weather: {
          description: action.data.weather[0].description,
          icon: action.data.weather[0].icon,
          main: action.data.weather[0].main
        },
        main: {
          grnd_level: action.data.main.grnd_level,
          humidity: action.data.main.humidity,
          pressure: action.data.main.pressure,
          temp: action.data.main.temp
        },
        sys: {
          country: action.data.sys.country,
          sunrise: action.data.sys.sunrise,
          sunset: action.data.sys.sunset
        },
        wind: {
          speed: action.data.wind.speed
        },
        name: action.data.name
      });
    default:
      return state;
  }

}