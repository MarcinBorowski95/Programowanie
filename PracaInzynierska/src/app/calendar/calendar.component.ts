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
export class CalendarComponent implements OnInit{
  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  
    dbAppointments = this.dbService.appointments;

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

    clickedDate: any;
    clickedTime: any;
  
    selectedDay: CalendarMonthViewDay;    

    actions: CalendarEventAction[] = [
      {
        label: '<i class="fa fa-fw fa-pencil"></i>',
        onClick: ({ event }: { event: CalendarEvent }): void => {
          this.handleEvent('Edited', event);
        }
      },
      {
        label: '<i class="fa fa-fw fa-times"></i>',
        onClick: ({ event }: { event: CalendarEvent }): void => {
          this.events = this.events.filter(iEvent => iEvent !== event);
          this.handleEvent('Deleted', event);
        }
      }
    ];
  
    refresh: Subject<any> = new Subject();
  
    events: CalendarEvent[] = [
      
    ];
  
    activeDayIsOpen: boolean = true;
  
    constructor(
      private modal: NgbModal,
      private dbService: DatabaseService  ,
      private router: Router
    ) {}
  
    ngOnInit(): void {
      this.fetchEvents();
    }

    fetchEvents(): void {
      const getStart: any = {
        month: startOfMonth,
        week: startOfWeek,
        day: startOfDay
      }[this.view];
  
      const getEnd: any = {
        month: endOfMonth,
        week: endOfWeek,
        day: endOfDay
      }[this.view];
    }

    dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
      if (isSameMonth(date, this.viewDate)) {
        if (isFuture(date))
        {
          if (
            (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
            events.length === 0
          ) {
            this.activeDayIsOpen = false;
          } else {
            this.activeDayIsOpen = true;
          }
        }
        
      }
    }
  
    daySelected(day: CalendarMonthViewDay): void {
      if(isFuture(day.date))
      {
        if (this.selectedDay) {
          delete this.selectedDay.cssClass;
        }
        this.viewDate = day.date;
        this.selectedDay = day;
        this.clickedDate = day.date.toLocaleDateString();
        this.view = 'day';
        day.cssClass = 'cal-day-selected';
      }
    }

    timeSelected(time: Date): void {
      if (time.getHours() >= 8 && time.getHours() <= 18)
      {
        this.clickedTime = time.toLocaleTimeString();
        this.view = 'month';
      }
      else
      {
        alert("Wybrano złą godzinę. Proszę wybrać godzinę między 8:00 a 19:00");
      }
    }

    appointment(valid)
    {
      if (valid)
      {
        var appointmentInfo = {
          date: this.clickedDate,
          time: this.clickedTime
        }
        this.dbService.newAppointment(appointmentInfo);
        
        alert("Zostałeś umówiony na " + this.clickedDate + " o godzinie " + this.clickedTime);
        this.router.navigate(['']);
      }
      else
      {
        alert("Błędnie uzupełniony formularz")
      }    
    }

    eventTimesChanged({
      event,
      newStart,
      newEnd
    }: CalendarEventTimesChangedEvent): void {
      event.start = newStart;
      event.end = newEnd;
      this.handleEvent('Dropped or resized', event);
      this.refresh.next();
    }
  
    handleEvent(action: string, event: CalendarEvent): void {
      this.modalData = { event, action };
      this.modal.open(this.modalContent, { size: 'lg' });
    }
  
    addEvent(): void {
      this.events.push({
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        }
      });
      this.refresh.next();
    }
  }
