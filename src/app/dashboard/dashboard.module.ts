import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WeatherAlertEditorComponent } from './components/weather-alert-editor/weather-alert-editor.component';



@NgModule({
  declarations: [
    DashboardComponent,
    WeatherAlertEditorComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DashboardModule { }
