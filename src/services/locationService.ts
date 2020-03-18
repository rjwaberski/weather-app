import axios from 'axios';
import Endpoints from '@/utils/endpoints';
import { ILocation } from '@/interfaces/locationData';

export default class LocationService {
  public static fetchLocation(query: string): Promise<ILocation[]> {
    return axios
      .get(Endpoints.location.geocode(query))
      .then(res => {
        return res.data.results;
      })
      .catch(error => {
        //  todo: handle err
      });
  }
}
