import { InjectionToken } from '@angular/core';

export const WEATHER_DATA_SERVICE = new InjectionToken<IWeatherDataService>('weather.data.service');

export interface IWeatherDataService {
  getCurrentWeather(): any;
  getWeatherForecast(): any;
}

export interface ICurrentWeather {
  temp: number;
  description: string;
}

export interface IWeatherForecast {
  temp: number;
  description: string;
  date: Date;
}
