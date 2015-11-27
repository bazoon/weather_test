import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import todoApp from './components/reducers.js';
import App from './components/app.jsx';



const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);

const initialState = {
  weather: {
    description: '',
    icon: '',
    main: ''
  },
  main: {
    grnd_level: '',
    humidity: '',
    preassure: '',
    temp: ''
  },
  sys: {
    country: '',
    sunrise: undefined,
    sunset: undefined
  },
  wind: {
    speed: undefined
  },
  name: '',
  loading: false
}

const store = createStoreWithMiddleware(todoApp, initialState);

ReactDOM.render(<Provider store={store}>
                  <App/>
                </Provider>,
                document.getElementById('container'));

