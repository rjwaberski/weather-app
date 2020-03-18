import axios from 'axios';
import Endpoints from '@/utils/endpoints';
import { ICoords } from '@/interfaces/locationData';

export default class WeatherService {
  public static fetchWeather(coords: ICoords) {
    const url = Endpoints.weather.fetchBaseWeather(coords);
    return axios
      .get(url)
      .then(res => res.data)
      .catch(error => {
        //  handle error
        return null;
      });
  }

  public static fetchHourlyForecast(coords: { lat: string; lon: string }) {
    return axios
      .get(Endpoints.weather.fetchWeatherForecast(coords))
      .then(res => res.data)
      .catch(error => {
        // handle error
        return null;
      });
  }
}
