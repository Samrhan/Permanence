import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CalendarOptions, FullCalendarComponent} from '@fullcalendar/angular';
import {UserService} from '../service/user.service';


@Component({
  selector: 'app-main-calendar',
  templateUrl: './main-calendar.component.html',
  styleUrls: ['./main-calendar.component.css']
})
export class MainCalendarComponent implements OnInit, AfterViewInit {

  view: string;
  users: [{ lastname, date }];

  constructor(private userService: UserService) {
  }

  @ViewChild('calendar') calendarComponent: FullCalendarComponent;


  calendarOptions: CalendarOptions = {
    buttonText: {
      today: 'Aujourd\'hui'
    },
    weekends: false,
    initialView: 'dayGridMonth',
    locale: 'fr',
    visibleRange: {
      start: '2021-01-18',
      end: '2021-03-7'
    },
    dateClick: this.handleDateClick.bind(this)
  };

  async ngOnInit(): Promise<void> {
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

  async ngAfterViewInit(): Promise<void> {
    this.users = await this.userService.fetchPlanning();
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.changeView(`dayGridMonth`, '2021-01-18');
    for (const user of this.users) {
        calendarApi.addEvent({
          title: user.lastname, date: new Date(user.date), allDay: true
        });
    }
  }

}
