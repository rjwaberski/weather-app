export default class Endpoints {
  static get openWeatherApiKey() {
    return process.env.VUE_APP_OPEN_WEATHER_API_KEY;
  }

  static get base() {
    return `http://api.openweathermap.org/`;
  }

  static get iconBase() {
    return `http://openweathermap.org`;
  }

  static get weather() {
    return {
      fetchBaseWeather: (coords: Coordinates) =>
        `${this.base}/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${this.openWeatherApiKey}`,
      fetchWeatherForecast: (coords: { lat: string; lon: string }) =>
        `${this.base}/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lon}&appid=${this.openWeatherApiKey}`,
      icon: (code: string) => `${this.iconBase}/img/wn/${code}@2x.png`,
    };
  }
}
