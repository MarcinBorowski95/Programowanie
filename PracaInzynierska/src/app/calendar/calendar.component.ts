import { AuthService } from './../_services/auth.service';
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
import { Popup } from 'ng2-opd-popup';
import 'rxjs/Rx';

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
  },
  green: {
    primary: '#1dda17',
    secondary: '#ceffcc'
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

  events$: Observable<Array<CalendarEvent<{ appointment: Appointment }>>>;

  doctors;
  choosenDoctor = "";

  zabiegi;
  choosenZabieg = "";

  users;
  userType;

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

  activeDayIsOpen: boolean = true;

  popupText = ""

  constructor(
    private modal: NgbModal,
    private dbService: DatabaseService,
    private authService: AuthService,
    private router: Router,
    private popup: Popup
  ) {

    this.events$ = this.dbService.getAppointments()
      .map(this.fromAppointmentsToEvents)


    this.doctors = this.dbService.getDoctors();
    this.zabiegi = this.dbService.getZabiegi();
  }

  ngOnInit(): void {

  }

  daySelected(day: CalendarMonthViewDay): void {
    this.viewDate = day.date;
    this.view = 'day';
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    if (event.meta.appointment.flag == 0) {
      this.popupText = "Czy chcesz się zapisać na ten termin wizyty?"
      this.popupOKShow(event);
    } else if (event.meta.appointment.flag == 1 && event.meta.appointment.userEmail == this.authService.currentUserDisplayName) {
      this.popupText = "Czy chcesz odwołać wizytę?"
      this.popupOKShow(event);
    } else if( event.meta.appointment.flag == 2 && event.meta.appointment.userEmail != this.authService.currentUserDisplayName) {
      this.popupText = "Termin zajęty"
      this.popupBadShow(event);
    } else if( event.meta.appointment.flag == 2 && event.meta.appointment.userEmail == this.authService.currentUserDisplayName) {
      this.popupText = "Twoja rezerwacja została potwierdzona"
      this.popupBadShow(event);
    } else {
      this.popupText = "Termin zarezerwowany"
      this.popupBadShow(event);
    }
  }

  popupOKShow(event)
  {
    this.popup.show({
      header: "Wizyta dnia " + event.start.toLocaleDateString() + " o godzinie " + event.meta.appointment.time + " na zabieg: " + event.meta.appointment.zabiegName,
      color: "#2c3e50", // red, blue.... 
      widthProsentage: 60, // The with of the popou measured by browser width 
      confirmBtnContent: "Tak", // The text on your confirm button 
      cancleBtnContent: "Nie", // the text on your cancel button 
    });
  }

  popupBadShow(event)
  {
    this.popup.show({
      header: "Wizyta dnia " + event.start.toLocaleDateString() + " o godzinie " + event.meta.appointment.time + " na zabieg: " + event.meta.appointment.zabiegName,
      color: "#2c3e50", // red, blue.... 
      widthProsentage: 60, // The with of the popou measured by browser width 
      showButtons: false
    });
  }

  signForEvent(modalData) {
    if (modalData.event.meta.appointment.flag == 0) {
      this.dbService.updateAppointment(modalData.event.meta.appointment.key, this.authService.currentUserDisplayName);
      this.popup.hide();
    } else if (modalData.event.meta.appointment.flag == 1 && modalData.event.meta.appointment.userEmail == this.authService.currentUserDisplayName) {
      this.dbService.updateAppointment(modalData.event.meta.appointment.key, "");
      this.popup.hide();
    } else if (modalData.event.meta.appointment.flag == 2 && modalData.event.meta.appointment.userEmail == this.authService.currentUserDisplayName) {
      this.popup.hide();
      alert("Termin zajęty")
    } else {
      this.popup.hide();
      alert("Termin zarezerwowany")
    }


  }

  onZabiegChange() {
    this.events$ = this.events$
      .map((appointments) => {
        if (this.choosenZabieg == "") {
          return appointments;
        } else {
          return appointments.filter((appointment) => this.choosenZabieg == appointment.meta.appointment.zabiegName)
        }
      });
  }

  onDoctorChange() {
    this.events$ = this.events$
      .map((appointments) => {
        if (this.choosenDoctor == "") {
          return appointments;
        } else {
          return appointments.filter((appointment) => this.choosenDoctor == appointment.meta.appointment.doctorEmail)
        }
      });
  }

  fromAppointmentsToEvents(appiontments: Appointment[]) {
    return appiontments.map((appointment: Appointment) => {
      if (appointment.flag == 0) {
        return ({
          title: appointment.zabiegName,
          start: new Date(appointment.date),
          color: colors.green,
          meta: {
            appointment
          }
        })
      } else if (appointment.flag == 1) {
        return ({
          title: appointment.zabiegName,
          start: new Date(appointment.date),
          color: colors.yellow,
          meta: {
            appointment
          }
        })
      } else if (appointment.flag == 2) {
        return ({
          title: appointment.zabiegName,
          start: new Date(appointment.date),
          color: colors.red,
          meta: {
            appointment
          }
        })
      } else {
        return ({
          title: appointment.zabiegName,
          start: new Date(appointment.date),
          color: colors.blue,
          meta: {
            appointment
          }
        })
      }

    })
  }
}



