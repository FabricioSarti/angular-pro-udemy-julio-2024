import { AfterContentChecked, AfterContentInit, Component, ContentChild, ContentChildren, EventEmitter, OnDestroy, OnInit, Output, QueryList } from '@angular/core';
import { TabComponent } from "./../tab/tab.component";
import { Tab } from "../tab/tab.interface";


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, AfterContentInit, OnDestroy {


  //un solo componente hijo con ng-content
  //lo vamos a comentar
  //solo podemos utilizar un componente nada mas y no la lista que le enviamos en <app-tabs>
  //@ContentChild(TabComponent) tab?: TabComponent;

  //con query list accedo a todos los componentes hijos
  @ContentChildren(TabComponent) public tabs?: QueryList<TabComponent>;
  private tabClickSubscript: any[] = [];

  constructor() { }

  ngOnDestroy(): void {
    if (this.tabClickSubscript) {
      this.tabClickSubscript.forEach(item => item.unsubscribe());
    }
  }

  //usamos este evento para agregar el tab ya que hasta este punto se puede mostrar el componente
  ngAfterContentInit(): void {
    this.tabs?.forEach(tab => {
      let tabControlSubscriptions = tab.onClick.subscribe(() => {
        console.log(`tab ${tab.title} content clicked`)
      })

      //ESTE ES UN CONTROL PARA DESUSCRIBIRNOS DE TODAS LAS SUBSCRIPCIONES QUE HICIMOS por cada click
      this.tabClickSubscript.push(tabControlSubscriptions);
    });

    this.selectTab(this.tabs?.first);
    /*if (this.tab) {
      console.log(this.tab);
      this.addTab(this.tab)
      this.tabClickSubscript = this.tab.onClick.subscribe(() => { console.log("tab context clicked") })
    }*/

    console.log('tabs ', this.tabs)
  }


  ngOnInit() {

  }

  addTab(tab: Tab) {
    /*if (this.tabs?.length === 0) {
      tab.isActive = true;
    }
    this.tabs?.push(tab);*/
  }

  selectTab(tab?: Tab) {
    /*for (let tab of this.tabs) {
      tab.isActive = false;
    }
    tab.isActive = true;*/

    //gracias a querylist es mas facil
    this.tabs?.forEach(tab => tab.isActive = false);
    if (tab)
      tab.isActive = true;
  }


}
