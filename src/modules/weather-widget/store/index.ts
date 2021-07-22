import * as types from './mutation-types'
import config from 'config'

export const module = {
  namespaced: true,
  state: {
    data: [],
    type: 'current',
    forecast_date: '',
    forecast_date_valid: false
  },
  mutations: {
    [types.SET_WEATHER_WIDGET_DATA] (state, payload) {
      state.data = payload
    },
    [types.SET_WEATHER_WIDGET_TYPE] (state, type) {
      state.type = type
    },
    [types.SET_WEATHER_WIDGET_DATE] (state, date) {
      state.forecast_date = date
    },
    [types.SET_WEATHER_WIDGET_VALIDATE] (state, valid) {
      state.forecast_date_valid = valid
    }
  },
  actions: {
    get ({ commit }, dataType) {
      let date = '?date=';
      if (dataType === 'single_forecast') {
        let dateArray = this.state['weather-widget'].forecast_date.split('/');
        dataType = 'forecast';
        date += dateArray[2] + '-' + dateArray[1] + '-' + dateArray[0];
      }
      fetch(config.weather.endpoint[dataType] + date, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors'
      })
        .then(res => {
          return res.json()
        })
        .then(res => {
          commit(types.SET_WEATHER_WIDGET_DATA, res.result);
        })
    },
    setType ({ commit }, value) {
      commit(types.SET_WEATHER_WIDGET_TYPE, value);
    },
    setForecastDate ({ commit }, value) {
      commit(types.SET_WEATHER_WIDGET_DATE, value);
    },
    setForecastDateValid ({ commit }, value) {
      commit(types.SET_WEATHER_WIDGET_VALIDATE, value);
    }
  },
  getters: {
    data: state => state.data,
    type: state => state.type,
    forecast_date: state => state.forecast_date,
    forecast_date_valid: state => state.forecast_date_valid
  }
}
