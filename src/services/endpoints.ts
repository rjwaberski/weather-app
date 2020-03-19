import { ICoords } from '@/interfaces/locationData';

export default class Endpoints {
  static get openWeatherApiKey() {
    return process.env.VUE_APP_OPEN_WEATHER_API_KEY;
  }

  static get googleApiKey() {
    return process.env.VUE_APP_GOOGLE_API_KEY;
  }

  private static weatherBase: string = `http://api.openweathermap.org`;
  private static weatherIconBase = `http://openweathermap.org`;
  private static locationBase: string = `https://maps.googleapis.com`;

  //  todo: let user choose units
  static get weather() {
    return {
      fetchBaseWeather: (coords: ICoords) =>
        `${this.weatherBase}/data/2.5/weather?lat=${coords.lat}&lon=${coords.lng}&units=metric&appid=${this.openWeatherApiKey}`,
      fetchWeatherForecast: (coords: ICoords, count: number = 6) =>
        `${this.weatherBase}/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lng}&units=metric&cnt=${count}&appid=${this.openWeatherApiKey}`,
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
