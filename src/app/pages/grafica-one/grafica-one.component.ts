import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grafica-one',
  templateUrl: './grafica-one.component.html',
  styles: [
  ]
})
export class GraficaOneComponent implements OnInit {

  // Doughnut
  public chartLabels = ['Pan', 'Sopes', 'Tacos'];
  public chartData = [[50, 120, 200]];
  public chartColors = [
    {
      backgroundColor: ['#6857E6', '#009FEE', '#F02059']
    }
  ];


  constructor() { }

  ngOnInit(): void {
  }


}
