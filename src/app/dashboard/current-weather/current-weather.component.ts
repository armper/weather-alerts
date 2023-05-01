import { Component, Input } from '@angular/core';
import { ICurrentWeather } from 'src/app/services/iweather-data.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent {
  @Input() currentWeather: ICurrentWeather | undefined;
}
