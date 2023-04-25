import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit {

  // Doughnut
  @Input() chartTitle: string = '';
  @Input() doughnutChartLabels: Label[] = ['Label 1', 'Label 2', 'Label 3'];
  @Input() doughnutChartData: MultiDataSet = [[10, 10, 10]];
  @Input() doughnutChartColors: Color[] = [
    {
      backgroundColor: ['#6857E6', '#009FEE', '#F02059']
    }
  ];

  constructor() {

    console.log('init dona components');
   }

  ngOnInit(): void {
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }


}
