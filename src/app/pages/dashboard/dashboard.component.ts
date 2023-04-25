import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit {
  public roundDownString: string = '3.4';
  public roundUpString: string = '53.5';
  public roundDown;
  public roundUp;

  constructor() {
    this.roundDown = Math.round(parseFloat(this.roundDownString));
    this.roundUp = Math.round(parseFloat(this.roundUpString));
  }

  ngOnInit(): void {}
}
