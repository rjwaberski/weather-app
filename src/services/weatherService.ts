import axios from 'axios';
import Endpoints from '@/utils/endpoints';
import { ICoords } from '@/interfaces/locationData';

export default class WeatherService {
  public static fetchWeather(coords: ICoords) {
    const url = Endpoints.weather.fetchBaseWeather(coords);
    return axios
      .get(url)
      .then(res => res)
      .catch(error => error);
  }

  public static fetchHourlyForecast(coords: ICoords) {
    return axios
      .get(Endpoints.weather.fetchWeatherForecast(coords))
      .then(res => res)
      .catch(error => error);
  }
}
