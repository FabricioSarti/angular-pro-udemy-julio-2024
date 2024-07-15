import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit, OnDestroy, OnChanges {

  @Output() onDecrease = new EventEmitter<number>();
  @Output() onComplete = new EventEmitter<void>();

  @Input() init?: number;

  private countDownTimerRef: any = null;

  public counter: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    //aca con este evento se puede manejar cuando un valor cambia en el HTML osea aca esto cambia y se dispara por el binding. tomar en cuenta eso
    console.log("Init value updated to ", changes['init'].currentValue);
    this.startCountDown();
  }

  ngOnDestroy(): void {
    this.clearTimeOutFuncion();
  }

  constructor() { }
  ngOnInit(): void {
    this.startCountDown();
  }

  startCountDown() {
    if (this.init && this.init > 0) {
      this.clearTimeOutFuncion();
      this.counter = this.init;
      this.doCountDown();
    }
  }

  doCountDown() {
    //se crea esta variable global para no crear mas objetos setTimeout
    this.countDownTimerRef = setTimeout(() => {
      this.counter = this.counter - 1;
      this.processCount();
    }, 1000)
  }

  processCount() {
    this.onDecrease.emit(this.counter);


    if (this.counter == 0) {
      this.onComplete.emit();
    } else {
      this.doCountDown();
    }
  }

  private clearTimeOutFuncion() {
    //aca se limpia esta referencia al timer creado ya que por cada click se crea  un timeout nuevo
    if (this.countDownTimerRef) {
      clearTimeout(this.countDownTimerRef);
      this.countDownTimerRef = null;
    }
  }

}
