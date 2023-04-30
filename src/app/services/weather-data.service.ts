import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IWeatherDataService } from './iweather-data.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService implements IWeatherDataService {

  constructor(private http: HttpClient) { }

  getCurrentWeather() {
    // Implement the logic to fetch the real current weather data
  }

  getWeatherForecast() {
    // Implement the logic to fetch the real weather forecast data
  }
}
