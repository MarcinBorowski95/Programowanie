import { Appointment } from './../_DBModels/appointment';
import { DatabaseService } from './../_services/Database.service';
import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  isPast,
  isFuture,
  endOfWeek,
  startOfWeek,
  startOfMonth
} from 'date-fns';
import { Subject } from 'rxjs/Subject';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  DAYS_OF_WEEK,
  CalendarDateFormatter,
  CalendarMonthViewDay
} from 'angular-calendar';

import { CustomDateFormatter } from './custom-date-formatter.provider';
import { DayViewHour } from 'calendar-utils';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DatabaseService,
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
  ]
})
export class CalendarComponent implements OnInit {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  // dbAppointments = this.dbService.appointments;
  items = ['lol','lol2']

  events$: Observable<Array<CalendarEvent<{ appointment: Appointment }>>>;

  view: string = 'month';

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  locale: string = 'pl';

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];

  clickedDate: number;
  clickedTime: string;
  dateToShow: string;

  selectedDay: CalendarMonthViewDay;

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [

  ];

  activeDayIsOpen: boolean = true;

  constructor(
    private modal: NgbModal,
    private dbService: DatabaseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.events$ = this.dbService.appointments
      .map((appiontments: Appointment[]) =>
        appiontments.map((appointment: Appointment) => ({
          title: 'appointment.title',
          start: new Date(appointment.date),
          color: colors.yellow,
          meta: {
            appointment
          }
        })))
  }

  daySelected(day: CalendarMonthViewDay): void {
    if (isFuture(day.date)) {
      if (this.selectedDay) {
        delete this.selectedDay.cssClass;
      }
      this.viewDate = day.date;
      this.selectedDay = day;
      this.clickedDate = day.date.getTime();
      this.dateToShow = day.date.toLocaleDateString();
      this.view = 'day';
      day.cssClass = 'cal-day-selected';
    }
  }

  timeSelected(time: Date): void {
    if (time.getHours() >= 8 && time.getHours() <= 18) {
      this.clickedTime = time.toLocaleTimeString();
      this.view = 'month';
    }
    else {
      alert("Wybrano złą godzinę. Proszę wybrać godzinę między 8:00 a 19:00");
    }
  }

  appointment(valid) {
    if (valid) {
      var appointmentInfo = {
        date: this.clickedDate,
        time: this.clickedTime
      }
      this.dbService.newAppointment(appointmentInfo);

      alert("Zostałeś umówiony na " + this.dateToShow + " o godzinie " + this.clickedTime);
      this.router.navigate(['']);
    }
    else {
      alert("Błędnie uzupełniony formularz")
    }
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    alert("Wizyta dnia " + event.start.toLocaleDateString() + " o godzinie " + event.meta.appointment.time)
  }

}
