import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { DisplayComponent } from './display/display.component';
import { TimerComponent } from './timer/timer.component';
import { AlertViewComponent } from './alert-view/alert-view.component';
import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tab/tab.component';
import { SimpleAlertViewComponent } from './simple-alert-view/simple-alert-view.component';
import { FormsModule } from '@angular/forms';
import { TimerNativeComponent } from './timer-native/timer.component';
import { TimerNoneComponent } from './timer-none/timer.component';

@NgModule({
  declarations: [
    AppComponent,
    ProgressBarComponent,
    DisplayComponent,
    TimerComponent,
    AlertViewComponent,
    TabsComponent,
    TabComponent,
    SimpleAlertViewComponent,
    TimerNativeComponent,
    TimerNoneComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  /*leer la nota del timer.component.ts*/
  providers: [],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
