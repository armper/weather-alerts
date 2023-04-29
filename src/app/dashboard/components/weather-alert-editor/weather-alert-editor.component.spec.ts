import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherAlertEditorComponent } from './weather-alert-editor.component';

describe('WeatherAlertEditorComponent', () => {
  let component: WeatherAlertEditorComponent;
  let fixture: ComponentFixture<WeatherAlertEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherAlertEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherAlertEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
