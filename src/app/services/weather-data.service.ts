import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {
  private apiKey = 'YOUR_API_KEY';
  private apiUrl = 'https://api.openweathermap.org/data/2.5';

  constructor(private http: HttpClient) { }

  getCurrentWeather(location: string): Observable<any> {
    const url = `${this.apiUrl}/weather?q=${location}&appid=${this.apiKey}`;
    return this.http.get(url);
  }

  getWeatherForecast(location: string): Observable<any> {
    const url = `${this.apiUrl}/forecast?q=${location}&appid=${this.apiKey}`;
    return this.http.get(url);
  }
}
