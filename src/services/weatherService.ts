import axios from 'axios';
import Endpoints from '@/utils/endpoints';

export default class WeatherService {
  static fetchWeather(coords: Coordinates) {
    const url = Endpoints.weather.fetchBaseWeather(coords);
    return axios
      .get(url)
      .then(res => res.data)
      .catch(error => {
        //  handle error
        return null;
      });
  }

  static fetchHourlyForecast(coords: { lat: string; lon: string }) {
    return axios
      .get(Endpoints.weather.fetchWeatherForecast(coords))
      .then(res => res.data)
      .catch(error => {
        // handle error
        return null;
      });
  }
}
