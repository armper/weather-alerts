import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { environment } from '../environments/environment';
import { MockWeatherDataService } from './services/mock-weather-data.service';
import { WeatherDataService } from './services/weather-data.service';
import { WEATHER_DATA_SERVICE } from './services/iweather-data.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule
  ],
  providers: [
    {
      provide: WEATHER_DATA_SERVICE,
      useClass: environment.useMockWeatherData ? MockWeatherDataService : WeatherDataService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
