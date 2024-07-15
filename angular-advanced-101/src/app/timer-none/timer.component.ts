import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { TimerService } from 'src/app/timer-none/timer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-timer-none',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  providers: [TimerService] /*NOTA INTERESANTE, CUANDO SE INSTANCIA ESTE SERVICIO A NIVEL GLOBAL OSEA EN EL APP-MODULE
  AL CREAR MAS COMPONENTES TIMER TODOS TOMAN EL VALOR ULTIMO OSEA QUE SE COMPARTEN LA DATA TODOS LOS COMPONENTES,
  MIENTRAS QUE AL DECLARARLO ACA POR CADA VEZ QUE MANDE A INSTANCIAR ESTE COMPONENTE SE CREA SU PROPIO PROVIDER*/,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class TimerNoneComponent implements OnInit, OnDestroy {

  @Output() onComplete = new EventEmitter<void>();
  @Input() init: number = 20;

  private countDownEndSubscription?: Subscription;
  private countDownSubscriptionBehaviour?: Subscription;
  public countDown = 0;

  constructor(public timer: TimerService, private cdRef: ChangeDetectorRef) { }


  get progress() {
    //ALGO INTERESANTE SI QUITAMOS EL ChangeDetectionStrategy.OnPush PODEMOS VER QUE ACA ESTE SE LLAMA MUCHISIMAS VECES PORQUE DE UNA VEZ
    //SE SUBSCRIBE A LA FUNCION Y EMPIEZA A TRABAJAR.
    //PERO CUANDO AGREGAMOS LA ESTRATEGIA ONPUSH NO SE LLAMA HASTA QUE UNO LE DE PLAY
    //Y CUANDO ESTO PASA HAY QUE TENER CUIDADO DE MANEJAR LOS CAMBIOS MANUALMENTE
    //ACA SABEMOS QUE EL CAMBIO SE DARA PARA ACTUALIZAR EL COUNTDOWN QUE VIENE DEL BEHAVIOUR SUBJECT
    //ENTONCES AL REVISAR ESA FUCNION Y VEMOS QUE EL cdRef FORZA LA VISTA Y SE ACTUALIZA MANUALMENTE
    //CON ESTO SE OPTIMIZA MUCHO MEJOR LOS COMPONENTES
    console.log("change detection")
    return (this.init - this.countDown) / this.init * 100;
  }

  ngOnInit(): void {

    this.timer.restartCountdown(this.init);

    this.countDownEndSubscription = this.timer.countDownEnd$.subscribe(() => {
      this.onComplete.emit();
    })

    this.countDownSubscriptionBehaviour = this.timer.countDownSource$.subscribe((data) => {
      this.countDown = data;
      this.cdRef.markForCheck();
    })
  }

  ngOnDestroy(): void {
    this.timer.destroy();
    this.countDownEndSubscription?.unsubscribe();
    this.countDownSubscriptionBehaviour?.unsubscribe();
  }

}
