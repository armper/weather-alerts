import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-weather-alert-editor',
  templateUrl: './weather-alert-editor.component.html',
  styleUrls: ['./weather-alert-editor.component.scss']
})
export class WeatherAlertEditorComponent implements OnInit {
  @Output() alertSaved = new EventEmitter();
  @Input() editingAlert: any | null = null;
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
    if (this.editingAlert) {
      this.alertForm.patchValue(this.editingAlert);
    }
  }

  onSubmit(): void {
    if (this.alertForm.valid) {
      const formData = this.alertForm.value;
      const alertData = {
        ...formData,
        dates: {
          start: new Date(formData.startDate),
          end: new Date(formData.endDate),
        },
      };
      this.alertSaved.emit(alertData);
      this.alertForm.reset();
    }
  }
}
