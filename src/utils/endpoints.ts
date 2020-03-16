export default class Endpoints {
  static get openWeatherApiKey() {
    return process.env.VUE_APP_OPEN_WEATHER_API_KEY;
  }

  static get base() {
    return `http://api.openweathermap.org/`;
  }
  static get weather() {
    return {
      fetchByCoords: (coords: Coordinates) =>
        `${this.base}/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${this.openWeatherApiKey}`,
    };
  }
}
