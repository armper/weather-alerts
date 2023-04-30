// weather-alert-editor.component.ts
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-weather-alert-editor',
  templateUrl: './weather-alert-editor.component.html',
  styleUrls: ['./weather-alert-editor.component.scss']
})
export class WeatherAlertEditorComponent implements OnInit {
  @Output() alertSaved = new EventEmitter();
  alertForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.alertForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      locationType: ['map', Validators.required],
      location: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.alertForm.valid) {
      this.alertSaved.emit(this.alertForm.value);
      this.alertForm.reset();
    }
  }
}
