import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { IWeatherDataService, ICurrentWeather, IWeatherForecast } from './iweather-data.service';

@Injectable({
  providedIn: 'root'
})
export class MockWeatherDataService implements IWeatherDataService {

  constructor() { }

  getCurrentWeather() {
    const data: ICurrentWeather = { temp: 20, description: 'Sunny' };
    return of(data);
  }

  getWeatherForecast() {
    const data: IWeatherForecast[] = [
      { temp: 22, description: 'Cloudy', date: new Date() },
      { temp: 25, description: 'Sunny', date: new Date() }
    ];
    return of(data);
  }
}
