import {Component, OnInit, ViewChild} from '@angular/core';
import {CalendarOptions, FullCalendarComponent} from '@fullcalendar/angular';


@Component({
  selector: 'app-main-calendar',
  templateUrl: './main-calendar.component.html',
  styleUrls: ['./main-calendar.component.css']
})
export class MainCalendarComponent implements OnInit {

  view: string;

  constructor() {
  }

  @ViewChild('calendar') calendarComponent: FullCalendarComponent;


  calendarOptions: CalendarOptions = {
    buttonText: {
      today: 'Aujourd\'hui'
    },
    initialView: 'dayGridMonth',
    locale: 'fr',
    dateClick: this.handleDateClick.bind(this) // bind is important!
  };

  ngOnInit(): void {
  }

  handleDateClick(arg): void {
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.changeView(`dayGridDay`, arg.date);
    this.view = 'Day';

  }

  changeView(view): void {
    const calendarApi = this.calendarComponent.getApi();
    this.view = view;
    calendarApi.changeView(`dayGrid${view}`);
  }

}
