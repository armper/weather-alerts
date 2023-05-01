import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert-item',
  templateUrl: './alert-item.component.html',
  styleUrls: ['./alert-item.component.scss']
})
export class AlertItemComponent {
  @Input() alert: any;
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

  onEdit(): void {
    this.edit.emit();
  }

  onDelete(): void {
    this.delete.emit();
  }
}
