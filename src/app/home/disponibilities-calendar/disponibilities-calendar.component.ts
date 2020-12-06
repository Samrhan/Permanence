import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CalendarOptions, FullCalendarComponent} from '@fullcalendar/angular';
import {UserService} from '../service/user.service';


@Component({
  selector: 'app-disponibilities-calendar',
  templateUrl: './disponibilities-calendar.component.html',
  styleUrls: ['./disponibilities-calendar.component.css']
})
export class DisponibilitiesCalendarComponent implements OnInit, AfterViewInit {

  view: string;
  users: [{ lastname, dates }];
  periode: { start, vacation, v_start, v_end };

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
    dateClick: this.handleDateClick.bind(this) // bind is important!
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
    const data = await this.userService.fetchPersons();
    this.users = data.people;
    this.periode = data.periode[0];
    const calendarApi = this.calendarComponent.getApi();

    let view = new Date();
    if (new Date(this.periode.start) > view) {
      view = this.periode.start;
    }
    calendarApi.changeView(`dayGridMonth`, view);

    if (this.periode.vacation) {
      calendarApi.addEvent({
        start: this.periode.v_start,
        end: this.periode.v_end,
        allDay: true,
        title: 'Vacation',
        color: 'green'
      });
    }

    for (const user of this.users) {
      for (const date of user.dates) {
        calendarApi.addEvent({
          title: user.lastname, date: new Date(date), allDay: true
        });
      }
    }

  }


}
