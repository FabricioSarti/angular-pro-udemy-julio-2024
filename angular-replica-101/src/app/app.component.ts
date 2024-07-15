import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-replica-101';

  counterProgres: number = 0;
  totalCounterNumber = 15;

  constructor() {

  }

  updateProgress($event: number) {
    this.counterProgres = (this.totalCounterNumber - $event) / this.totalCounterNumber
      * 100;
  }

  countDownFinish() {
    console.log("countdown has finished")
  }
}
