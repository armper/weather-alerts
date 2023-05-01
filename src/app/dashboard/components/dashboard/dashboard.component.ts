import { IWeatherDataService, WEATHER_DATA_SERVICE, ICurrentWeather, IWeatherForecast } from 'src/app/services/iweather-data.service';
import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';

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

  editingAlert: any | null = null;

  // Add a counter to generate unique IDs for alerts
  private alertIdCounter = 1;

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
    if (this.editingAlert) {
      const index = this.alerts.findIndex(a => a.id === this.editingAlert.id);
      if (index !== -1) {
        this.alerts[index] = alert;
      }
      this.editingAlert = null;
    } else {
      // Assign a unique ID to the new alert
      alert.id = this.alertIdCounter++;
      this.alerts.push(alert);
    }
    this.showAddAlertForm = false;
    this.alertAdded.emit();
  }

  addAlert(): void {
    this.editingAlert = null;
    this.showAddAlertForm = true;
    this.alertAdded.emit();
  }

  editAlert(alert: any): void {
    this.editingAlert = alert;
    this.showAddAlertForm = true;
  }

  deleteAlert(alert: any): void {
    if (window.confirm('Are you sure you want to delete this alert?')) {
      this.alerts = this.alerts.filter(a => a.id !== alert.id);
      // Emit the alertRemoved event
      this.alertRemoved.emit();
    }
  }
}
