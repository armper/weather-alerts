import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WeatherAlertEditorComponent } from './components/weather-alert-editor/weather-alert-editor.component';
import { WeatherDataService } from '../services/weather-data.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    DashboardComponent,
    WeatherAlertEditorComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [WeatherDataService]
})
export class DashboardModule { }
