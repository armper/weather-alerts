import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WeatherAlertEditorComponent } from './components/weather-alert-editor/weather-alert-editor.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'; // Add this import
import { WeatherDataService } from '../services/weather-data.service';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';
import { AlertItemComponent } from './alert-item/alert-item.component';

@NgModule({
  declarations: [
    DashboardComponent,
    WeatherAlertEditorComponent,
    CurrentWeatherComponent,
    WeatherForecastComponent,
    AlertItemComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule, ReactiveFormsModule
  ],
  exports: [
    DashboardComponent
  ],
  providers: [WeatherDataService]

})
export class DashboardModule { }
