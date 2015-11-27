export const GET_WEATHER_HERE = 'GET_WEATHER_HERE';
export const GET_WEATHER_HERE_ASYNC = 'GET_WEATHER_HERE_ASYNC';
export const SHOW_LOADER = 'SHOW_LOADER';
export const HIDE_LOADER = 'HIDE_LOADER';
export const GET_WEATHER_IN_CITY_ASYNC = 'GET_WEATHER_IN_CITY_ASYNC';
export const GET_WEATHER_IN_CITY = 'GET_WEATHER_IN_CITY';

import weatherApi from '../api/weather_api.js';


export function getWeatherHere (data) {
  return {
    type: GET_WEATHER_HERE,
    data
  }
}

export function showLoader () {
  return {
    type: SHOW_LOADER,
  }
}

export function hideLoader () {
  return {
    type: HIDE_LOADER,
  }
}

export function getWeatherInCity (data) {
  return {
    type: GET_WEATHER_IN_CITY,
    data
  }
}



export function getWeatherHereAsync () {
  return function (dispatch, getState) {
    dispatch(showLoader());
    return weatherApi.getWeatherAtCurrentLocation('en')
      .then(function (response) {
        dispatch(hideLoader());
        return dispatch(getWeatherHere(response));
      });
  }
}

export function getWeatherInCityAsync (city) {
  return function (dispatch, getState) {
    return weatherApi.getWeatherInCity(city)
      .then(function (response) {
        dispatch(hideLoader());
        return dispatch(getWeatherInCity(response));
      });
  }
}


