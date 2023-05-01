import { WEATHER_DATA_SERVICE } from "src/app/services/iweather-data.service";
import { DashboardComponent } from "./dashboard.component";
import { MockWeatherDataService } from "src/app/services/mock-weather-data.service";

describe('DashboardComponent', () => {
  it('mounts', () => {
    cy.mount(DashboardComponent, {
      providers: [
        { provide: WEATHER_DATA_SERVICE, useClass: MockWeatherDataService }
      ]
    });
  });


});

