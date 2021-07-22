<template>
  <div class="weather-main">
    <div class="weather-container">
      <div class="form-container">
        <div>
          <h3>Weather Widget</h3>
        </div>
        <div>
          <h4>Choose: </h4>
        </div>
        <div class="form">
          <form>
            <p>
              <input type="radio" id="current" name="data_type" value="current" v-model="type">
              <label for="current">Current weather data: </label>
            </p>
            <p>
              <input type="radio" id="forecast" name="data_type" value="forecast" v-model="type">
              <label for="forecast">Forecast for next 3 days: </label>
            </p>
            <p>
              <input type="radio" id="single_forecast" name="data_type" value="single_forecast" v-model="type">
              <label for="forecast">Forecast for specific date: </label>
            </p>
            <div class="date-container" v-if="getType === 'single_forecast'">
              <input class="date-input" type="text" id="forecast_date" name="forecast_date" placeholder="dd/mm/YYYY" v-model="forecast_date">
              <label for="forecast_date">(Up to 10 days)</label>
              <p class="warning-message" v-if="!getForecastDateValid && forecast_date !== ''">
                Forecast date must be in following format dd/mm/YYYY and within next 10 days!
              </p>
            </div>
          </form>
        </div>
      </div>
      <div class="data-container" v-if="getType === 'current'">
        <div><h4>Data</h4></div>
        <div class="datarow">
          <strong>Temperature: &nbsp;</strong> {{ getData.temp_c }} C&#176;
        </div>
        <div class="datarow">
          <strong>Wind speed: &nbsp;</strong> {{ getData.wind_kph }} Kph
        </div>
        <div class="datarow">
          <strong>Wind direction: &nbsp;</strong> {{ getData.wind_dir }}
        </div>
      </div>
      <div class="data-container" v-if="getType === 'forecast' || (getType === 'single_forecast' && getForecastDateValid)">
        <div><h4>Data</h4></div>
        <div class="day-data-container" v-for="item in getData" :key="item.date">
          <div>
            <strong>{{ item.date }} &nbsp;</strong>
          </div>
          <div class="datarow">
            <strong>Temperature: &nbsp;</strong> {{ item.mintemp_c }} C&#176; - {{ item.maxtemp_c }} C&#176;
          </div>
          <div class="datarow">
            <strong>Max. wind speed: &nbsp;</strong> {{ item.maxwind_kph }} Kph
          </div>
          <div class="datarow" v-if="item.daily_chance_of_rain > 0">
            <strong>Chance of rain: &nbsp;</strong> {{ item.daily_chance_of_rain }} %
          </div>
          <div class="datarow" v-if="item.daily_chance_of_snow > 0">
            <strong>Chance of snow: &nbsp;</strong> {{ item.daily_chance_of_snow }} %
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import WeatherWidget from 'src/modules/weather-widget/components/WeatherWidget'
export default {
  name: 'WeatherWidget',
  mixins: [WeatherWidget]
}
</script>

<style lang="scss" scoped>
.weather-main {
  width: 100%;
}
.weather-container {
  width: 30vw;
  min-width: 150px;
  margin: auto;
  .form-container{
    display:block;
    .form{
      text-align: left;
      .date-input {
        height: 32px;
        width: 100px;
        font-size: 16px;
        padding-left: 10px;
      }
      input {
        height: 12px;
      }
      .date-container {
        margin-bottom: 10px;
        .warning-message {
          color: #c68400;
        }
      }
    }
  }
  .data-container {
    margin-bottom: 20px;
    .day-data-container {
      margin: 30px 0;
    }
    .datarow {
      margin: 5px 0;
    }
  }
}
</style>
