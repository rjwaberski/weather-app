import axios from 'axios';
import Endpoints from '@/utils/endpoints';

export default class WeatherService {
  fetchWeather(coords: Coordinates) {
    const url = Endpoints.weather.fetchByCoords(coords);
    return axios
      .get(url)
      .then(res => res)
      .catch(error => console.error(error));
  }
}
