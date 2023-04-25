import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  // @Input() progreso: number = 40;
  @Input('valorEntrada') progreso: number = 40;
  @Input() btnClass: string = 'btn-primary';

  @Output() valorSalida: EventEmitter<number> = new EventEmitter();

  constructor() { }

  //whis method only will execute one time when the component starts
  ngOnInit() {
    this.btnClass = `btn ${this.btnClass}`;
  }


  cambiarValor(valor: number) {
    if (this.progreso >= 100 && valor >= 0) {
      this.valorSalida.emit(100);
      return this.progreso = 100;
    }

    if (this.progreso <= 0 && valor < 0) {
      this.valorSalida.emit(0);
      return this.progreso = 0;
    }

    if (this.progreso < 100 || this.progreso >= 0) {
      this.progreso = this.progreso + valor;
      this.valorSalida.emit(this.progreso);
    }
  }

  onChange(newValue: number) {
    if (newValue >= 100) {
      this.progreso = 100;
    } else if (newValue <= 0) {
      this.progreso = 0;
    } else {
      //emit the event for display in the loader
      this.valorSalida.emit(this.progreso);
    }
  }


}
