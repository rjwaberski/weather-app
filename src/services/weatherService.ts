import axios from 'axios';
import Endpoints from '@/services/endpoints';
import { ICoords } from '@/interfaces/locationData';

export default class WeatherService {
  public static async fetchWeather(coords: ICoords) {
    const url = Endpoints.weather.fetchBaseWeather(coords);
    return axios
      .get(url)
      .then((res) => res)
      .catch((error) => error);
  }

  public static async fetchHourlyForecast(coords: ICoords) {
    return axios
      .get(Endpoints.weather.fetchWeatherForecast(coords))
      .then((res) => res)
      .catch((error) => error);
  }
}
