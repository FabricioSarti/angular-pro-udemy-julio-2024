import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";


@Injectable()
export class TimerService {

    private countdownTimerRef: any = null;
    //public countdown: number = 0;
    public paused: boolean = true;
    private init: number = 0;
    public disabledButton: boolean = false;

    //proteccion aca se crea el componente para crear mensajes
    private countDownEndSource = new Subject<void>();
    //es publico para obtener la respuesta
    public countDownEnd$ = this.countDownEndSource.asObservable();

    //los behavioursubject siempre se deben de inicializar
    private countDownSource = new BehaviorSubject<number>(0);
    //para poder utilizar el behaviorSubject
    public countDownSource$ = this.countDownSource.asObservable();

    constructor() { }

    destroy(): void {
        this.clearTimeout();
    }

    restartCountdown(init?: number) {

        if (init)
            this.init = init

        if (this.init && this.init > 0) {
            this.paused = true;
            this.clearTimeout();
            this.countDownSource.next(this.init)
            // se elimina this.doCountdown();
        }
    }

    toogleCountDown() {
        this.paused = !this.paused;

        if (!this.paused) {
            this.doCountdown();
        } else {
            this.clearTimeout();
        }
    }

    private doCountdown() {
        this.countdownTimerRef = setTimeout(() => {
            this.countDownSource.next(this.countDownSource.getValue() - 1);
            this.processCountdown();
        }, 1000);
    }

    private processCountdown() {
        if (this.countDownSource.getValue() == 0) {
            //this.onComplete.emit();
            this.countDownEndSource.next();
            this.disabledButton = true;
           // this.restartCountdown();
            //console.log("--countdown end--");
        }
        else {
            this.doCountdown();
        }
    }

    private clearTimeout() {
        if (this.countdownTimerRef) {
            clearTimeout(this.countdownTimerRef);
            this.disabledButton = false;
            this.countdownTimerRef = null;
        }
    }



}