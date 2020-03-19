import Endpoints from '@/services/endpoints';
import axios from 'axios';

export default class LocationService {
  public static fetchLocation(query: string) {
    return axios
      .get(Endpoints.location.geocode(query))
      .then((res) => res)
      .catch((error) => error);
  }
}
