export default {
  name: 'WeatherWidget',
  methods: {
    formatDate (date) {
      return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    },
    getMinDate () {
      return this.calculateDate();
    },
    getMaxDate () {
      return this.calculateDate(10);
    },
    calculateDate (addDays = 0) {
      let date = new Date();
      date.setDate(date.getDate() + addDays);
      return date.setHours(0, 0, 0, 0);
    },
    validateDate (dateString) {
      let dateArray = dateString.split('/');
      try {
        const newDate = new Date(dateArray[2], dateArray[1] - 1, dateArray[0]);
        if (!isNaN(newDate.getTime()) && newDate >= this.getMinDate() && newDate <= this.getMaxDate()) {
          return true;
        }
      } catch (e) {}
      return false;
    }
  },
  computed: {
    getData () {
      return this.$store.getters['weather-widget/data'];
    },
    getType () {
      return this.$store.getters['weather-widget/type'];
    },
    getForecastDate () {
      return this.$store.getters['weather-widget/forecast_date'];
    },
    getForecastDateValid () {
      return this.$store.getters['weather-widget/forecast_date_valid'];
    },
    type: {
      get () {
        return this.getType;
      },
      set (value) {
        if (value !== this.getType) {
          this.$store.dispatch('weather-widget/setType', value);
          this.$store.dispatch('weather-widget/get', value);
        }
      }
    },
    forecast_date: {
      get () {
        return this.getForecastDate;
      },
      set (value) {
        this.$store.dispatch('weather-widget/setForecastDate', value);
        this.$store.dispatch('weather-widget/setForecastDateValid', this.validateDate(value));
        this.$store.dispatch('weather-widget/get', this.getType);
      }
    }
  },
  beforeMount () {
    this.$store.dispatch('weather-widget/get', this.getType);
  }
};
