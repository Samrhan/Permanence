import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {appRoutingModule} from './app.routing';
import {ReactiveFormsModule} from '@angular/forms';
import {MainCalendarComponent} from './home/main-calendar/main-calendar.component';
import {FullCalendarModule} from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainCalendarComponent
  ],
  imports: [
    BrowserModule,
    appRoutingModule,
    ReactiveFormsModule,
    FullCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
