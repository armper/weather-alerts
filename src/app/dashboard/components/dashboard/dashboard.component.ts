import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  ngOnInit(): void {
  }

  alerts: Array<{ id: number; name: string; description: string; dates: { start: Date; end: Date }; location: string }> = [];

}
