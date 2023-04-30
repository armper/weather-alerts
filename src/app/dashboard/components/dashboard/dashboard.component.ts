import { IWeatherDataService, WEATHER_DATA_SERVICE, ICurrentWeather, IWeatherForecast } from 'src/app/services/iweather-data.service';
import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  alerts: any[] = [];
  currentWeather: ICurrentWeather | undefined;
  weatherForecast: IWeatherForecast[] = [];
  showAddAlertForm: boolean = false;

  @Output() alertAdded = new EventEmitter();
  @Output() alertRemoved = new EventEmitter();

  constructor(@Inject(WEATHER_DATA_SERVICE) private weatherDataService: IWeatherDataService) { }

  ngOnInit(): void {
    this.weatherDataService.getCurrentWeather().subscribe((data: ICurrentWeather) => {
      this.currentWeather = data;
    });

    this.weatherDataService.getWeatherForecast().subscribe((data: IWeatherForecast[]) => {
      this.weatherForecast = data;
    });
  }

  onAlertSaved(alert: any): void {
    this.alerts.push(alert);
    this.showAddAlertForm = false;
    this.alertAdded.emit();
  }

  addAlert(): void {
    this.showAddAlertForm = true;
    this.alertAdded.emit();

  }

  editAlert(alert: any): void {
    // Implement editing an existing alert
  }

  deleteAlert(alert: any): void {
    if (window.confirm('Are you sure you want to delete this alert?')) {
      this.alerts = this.alerts.filter(a => a.id !== alert.id);
      // Emit the alertRemoved event
      this.alertRemoved.emit();
    }
  }
}
