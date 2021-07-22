/**
 * This file is part of the Magebit WeatherWidget package.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade Magebit WeatherWidget
 * to newer versions in the future.
 *
 * @copyright Copyright (c) 2021 Magebit, Ltd. (https://magebit.com/)
 * @license   GNU General Public License ("GPL") v3.0
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
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
