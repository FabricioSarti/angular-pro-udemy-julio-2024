import { Component, OnInit, Input, AfterContentInit, Output, EventEmitter } from '@angular/core';
import { Tab } from "./tab.interface";
import { TabsComponent } from '../tabs/tabs.component';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})

//VAMOS A EXPLICAR ACA ESTE COMPONENTE
/*SI REVISAMOS EL CONSOLE LOG VAMOS A VER QUE HAY UN JSON EN DONDE ESTAN LAS PROPIEDADES TITLE e IsActiv. Esto se debe
a que la clase esta usando onInit y la interface Tab... esto permite que cuando se use esta clase espere esa estructura aca.

Ahora bien este tipo de uso de componentes es donde desde el padre pasamos componentes, esto es una inyeccion de componentes.
Entonces aca inyectamos el componente pero desde el app.component.ts y si vemos el codigo parece confuso pero es que alli hacemos uso de esto.
por cada <app-tab> le añadimos un app-tabs y aca en la funcion this.tabs.addTab(this) enviamos el this para decirle que tome todo lo que se ha inyectado
y como tal estamos haciendo un ciclo de todos los componentes agregados dentro de la etiqueta <app-tab> */
export class TabComponent implements OnInit, Tab {

  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();
  @Input() title: string = "";
  public isActive: boolean = false;

  //vamos a comentar esto
  constructor(/*public tabs: TabsComponent*/) { }

  ngOnInit() {
    //console.log("this ", this)
    //this.tabs.addTab(this);
  }

  clickTabContent() {
    this.onClick.emit();
  }

}
