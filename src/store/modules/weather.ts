import { Module, Mutation, VuexModule, Action } from 'vuex-module-decorators';
import WeatherService from '@/services/weatherService';
import { ICoords } from '@/interfaces/locationData';
import { nameof } from 'ts-simple-nameof';
import { IBaseWeather } from '@/interfaces/weatherData';

const WEATHER_KEY = 'weather';

const initialWeather = localStorage.getItem(WEATHER_KEY);

@Module({
  namespaced: true,
})
export default class WeatherModule extends VuexModule {
  private weather: IBaseWeather | null = initialWeather
    ? JSON.parse(initialWeather)
    : null;

  @Mutation
  setData(data: IBaseWeather) {
    localStorage.setItem(WEATHER_KEY, JSON.stringify(data));
    this.weather = data;
  }

  @Action
  async fetchWeather(coords: ICoords) {
    const res = await WeatherService.fetchWeather(coords);
    if (res.status === 200) {
      this.context.commit(
        nameof<WeatherModule>(x => x.setData),
        res.data,
      );
    }
    return res;
  }

  get isDataComplete(): boolean {
    return (
      !!this.weather &&
      !!this.weather.name &&
      !!this.weather.main.temp &&
      !!this.weather.weather[0].description
    );
  }

  get location(): string {
    return this.weather ? this.weather.name : '';
  }

  get temp(): number {
    return this.weather ? this.weather.main.temp : 0;
  }

  get description(): string {
    return this.weather ? this.weather.weather[0].description : '';
  }
}
