import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, ElementRef, QueryList, Renderer2, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { SimpleAlertViewComponent } from './simple-alert-view/simple-alert-view.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, AfterContentInit {

  /*@ViewChildren(SimpleAlertViewComponent) alert?: QueryList<SimpleAlertViewComponent>;*/
  @ViewChild("timerInput") timerInput?: ElementRef;

  //aca se le dice al view child que queremos un tipo de ViewContainerRef
  @ViewChild("alertRender", { read: ViewContainerRef }) alertRenderContainer?: ViewContainerRef;

  title = 'angular-advanced-101';
  public time = 0;

  public timers: Array<number> = [];

  public isAddtimerVisible: boolean = false;
  public isEndTimerAlertVisible: boolean = false;

  public simpleAlert?: ComponentRef<SimpleAlertViewComponent>;


  constructor(
    private rendered: Renderer2,
    private resolverReder: ComponentFactoryResolver,
    private cdRef: ChangeDetectorRef) {
    this.timers = [3, 20, 185]

  }

  ngAfterViewInit() {


    //utilizando rendered
    //this.rendered.setAttribute(this.timerInput?.nativeElement, "placeholder", "Enter seconds");

    //se reemplazo esto usando rendered
    //this.timerInput?.nativeElement.setAttribute("placeholder", "Enter seconds");

    //this.rendered.addClass(this.timerInput?.nativeElement, "time-in")
    //see remplazo esto usando rendered
    //this.timerInput?.nativeElement.classList.add("time-in")

    /*this.alert?.forEach(item => {

      if (!item.title) {
        //item.title = 'Hi';
        item.message = 'Hello World';
      }

      //item.show();
    })*/

    //esto se usa para que se detecten los camios y muestre la alerta se comento todo para utilizar componentes dinamicos
    // this.cdRef.detectChanges();



  }

  ngAfterContentInit(): void {
    //const alertFactory = this.resolverReder.resolveComponentFactory(SimpleAlertViewComponent);
    //console.log("alertFactory ",alertFactory)
    //this.simpleAlert = this.alertRenderContainer?.createComponent(alertFactory);
    //console.log("this.simpleAlert ",this.simpleAlert)
  }

  countDownFinished() {
    console.log("el conteo ha finalizado");

    this.showAddAlterTimer();
    //comentamos
    //usamos el query list

    //this.alert?.first.show();
  }

  public showAddTimer() {
    this.isAddtimerVisible = true;
    setTimeout(() => {
      this.rendered.selectRootElement(this.timerInput?.nativeElement).focus();
      //tambien se cambia por rendered
      //this.timerInput?.nativeElement.focus()
    });
  }

  public hideAddTimer() {
    this.isAddtimerVisible = false;
  }

  public submitAddTimer() {
    this.timers.push(this.time);
    this.hideAddTimer();
  }

  public showAddAlterTimer() {
    //this.isEndTimerAlertVisible = true;

    //usar por medio de inyector dinamico
    console.log("showAddAlterTimer ");

    const alertFactory = this.resolverReder.resolveComponentFactory(SimpleAlertViewComponent);
    console.log("alertFactory ", alertFactory)
    this.simpleAlert = this.alertRenderContainer?.createComponent(alertFactory);
    console.log("this.simpleAlert ", this.simpleAlert);
    //this.cdRef.detectChanges();

    if (this.simpleAlert) {
      this.simpleAlert.instance.title = 'Titulo';
      this.simpleAlert.instance.message = 'Conteo terminado';

      this.simpleAlert.instance.onDismissEvent.subscribe(() => {
        console.log('Evento emisor subscripcion ');
        this.simpleAlert?.destroy();
      })
    }

    this.simpleAlert?.instance.show();
  }

  public hideAddAlterTimer() {
    this.isEndTimerAlertVisible = false;
  }
}
