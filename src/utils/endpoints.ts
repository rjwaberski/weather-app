import { ICoords } from '@/interfaces/locationData';

export default class Endpoints {
  static get openWeatherApiKey() {
    return process.env.VUE_APP_OPEN_WEATHER_API_KEY;
  }

  static get googleApiKey() {
    return process.env.VUE_APP_GOOGLE_API_KEY;
  }

  static weatherBase: string = `http://api.openweathermap.org`;
  static weatherIconBase = `http://openweathermap.org`;
  static locationBase: string = `https://maps.googleapis.com`;

  static get weather() {
    return {
      fetchBaseWeather: (coords: ICoords) =>
        `${this.weatherBase}/data/2.5/weather?lat=${coords.lat}&lon=${coords.lng}&appid=${this.openWeatherApiKey}`,
      fetchWeatherForecast: (coords: { lat: string; lon: string }) =>
        `${this.weatherBase}/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lon}&appid=${this.openWeatherApiKey}`,
      icon: (code: string) => `${this.weatherIconBase}/img/wn/${code}@2x.png`,
    };
  }

  static get location() {
    return {
      geocode: (query: string) =>
        `${this.locationBase}/maps/api/geocode/json?address=${query}&key=${this.googleApiKey}`,
    };
  }
}
