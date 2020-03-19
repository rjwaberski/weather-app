export interface IBaseWeather {
  coord: { lon: number; lat: number };
  weather: IWeatherBaseData[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: { speed: number; deg: number };
  clouds: { all: number };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface IWeatherBaseData {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface IBaseForecast {
  dt: number; // UNIX
  main: IBaseForecastMain;
  weather: IBaseForecastWeather[];
  clouds: IBaseForecastClouds;
  wind: IBaseForecastWind;
  sys: IBaseForecastSys;
  dt_txt: string;
}

export interface IBaseForecastMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

export interface IBaseForecastWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface IBaseForecastClouds {
  all: number;
}

export interface IBaseForecastWind {
  speed: number;
  deg: number;
}

export interface IBaseForecastSys {
  sys: string;
}

export interface IWeatherCardData {
  temp: number;
  location: string;
  description: string;
}
