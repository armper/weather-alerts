import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { WeatherAlertEditorComponent } from '../weather-alert-editor/weather-alert-editor.component';
import { of } from 'rxjs';
import { WeatherDataService } from 'src/app/services/weather-data.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let weatherDataServiceMock: any;

  beforeEach(async () => {
    weatherDataServiceMock = jasmine.createSpyObj('WeatherDataService', ['getCurrentWeather', 'getWeatherForecast']);

    await TestBed.configureTestingModule({
      declarations: [DashboardComponent, WeatherAlertEditorComponent],
      providers: [
        { provide: WeatherDataService, useValue: weatherDataServiceMock }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('User views the dashboard', () => {
    it('should display a list of weather alerts', () => {
      component.alerts = [
        { id: 1, name: 'Alert 1', description: 'Description 1', dates: { start: new Date(), end: new Date() }, location: 'City 1' },
        { id: 2, name: 'Alert 2', description: 'Description 2', dates: { start: new Date(), end: new Date() }, location: 'City 2' },
      ];
      fixture.detectChanges();

      const alertItems = fixture.nativeElement.querySelectorAll('.alert-item');
      expect(alertItems.length).toBe(2);
    });
  });

  describe('User adds a new alert', () => {
    it('should display a form to input name, description, dates, and location', () => {
      const addButton = fixture.nativeElement.querySelector('.add-alert-button');
      addButton.click();
      fixture.detectChanges();

      const alertForm = fixture.nativeElement.querySelector('.alert-form');
      expect(alertForm).toBeTruthy();
    });
  });

  describe('User edits an existing alert', () => {
    beforeEach(() => {
      component.alerts = [
        { id: 1, name: 'Alert 1', description: 'Description 1', dates: { start: new Date(), end: new Date() }, location: 'City 1' },
        { id: 2, name: 'Alert 2', description: 'Description 2', dates: { start: new Date(), end: new Date() }, location: 'City 2' },
      ];
      fixture.detectChanges();
    });

    it('should display a form with the current alert information', () => {
      const editButton = fixture.nativeElement.querySelectorAll('.edit-alert-button')[0];
      editButton.click();
      fixture.detectChanges();

      const alertForm = fixture.nativeElement.querySelector('.alert-form');
      expect(alertForm).toBeTruthy();
    });

    it('should allow the user to modify the name, description, dates, and location', () => {
      const editButton = fixture.nativeElement.querySelectorAll('.edit-alert-button')[0];
      editButton.click();
      fixture.detectChanges();

      const alertForm = fixture.nativeElement.querySelector('.alert-form');
      const nameInput = alertForm.querySelector('.name-input');
      const descriptionInput = alertForm.querySelector('.description-input');
      const startDateInput = alertForm.querySelector('.start-date-input');
      const endDateInput = alertForm.querySelector('.end-date-input');
      const locationInput = alertForm.querySelector('.location-input');

      expect(nameInput).toBeTruthy();
      expect(descriptionInput).toBeTruthy();
      expect(startDateInput).toBeTruthy();
      expect(endDateInput).toBeTruthy();
      expect(locationInput).toBeTruthy();
    });

  });

  describe('User deletes an alert', () => {
    beforeEach(() => {
      spyOn(window, 'confirm').and.returnValue(true);
      component.alerts = [
        { id: 1, name: 'Alert 1', description: 'Description 1', dates: { start: new Date(), end: new Date() }, location: 'City 1' },
        { id: 2, name: 'Alert 2', description: 'Description 2', dates: { start: new Date(), end: new Date() }, location: 'City 2' },
      ];
      fixture.detectChanges();
    });

    it('should display a confirmation prompt when the user clicks "Delete"', () => {
      const deleteButton = fixture.nativeElement.querySelectorAll('.delete-alert-button')[0];
      deleteButton.click();
      fixture.detectChanges();

      expect(window.confirm).toHaveBeenCalled();
    });

    it('should delete the alert if the user confirms', () => {
      const deleteButton = fixture.nativeElement.querySelectorAll('.delete-alert-button')[0];
      deleteButton.click();
      fixture.detectChanges();

      const alertItems = fixture.nativeElement.querySelectorAll('.alert-item');
      expect(alertItems.length).toBe(1);
    });

  });

  describe('Weather data integration', () => {
    it('should display current weather data', () => {
      weatherDataServiceMock.getCurrentWeather.and.returnValue(of({ temp: 25, description: 'Sunny' }));
      component.ngOnInit();
      fixture.detectChanges();

      const currentWeatherElement = fixture.nativeElement.querySelector('.current-weather');
      expect(currentWeatherElement.textContent).toContain('25');
      expect(currentWeatherElement.textContent).toContain('Sunny');
    });

    it('should display weather forecast data', () => {
      weatherDataServiceMock.getWeatherForecast.and.returnValue(of([{ temp: 22, description: 'Cloudy', date: new Date() }]));
      component.ngOnInit();
      fixture.detectChanges();

      const weatherForecastElement = fixture.nativeElement.querySelector('.weather-forecast');
      expect(weatherForecastElement.textContent).toContain('22');
      expect(weatherForecastElement.textContent).toContain('Cloudy');
    });
  });
});
