import { Component, Input } from '@angular/core';
import { IWeatherForecast } from 'src/app/services/iweather-data.service';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherForecastComponent {
  @Input() weatherForecast: IWeatherForecast[] = [];
}
