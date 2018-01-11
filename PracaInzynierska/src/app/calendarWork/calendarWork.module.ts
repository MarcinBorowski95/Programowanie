import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'angular-calendar';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DemoUtilsModule } from '../demo-utils/module';
import { CalendarWorkComponent } from './calendarWork.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

const routes = [
  {path: '' , component: CalendarWorkComponent},
  
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgbModalModule.forRoot(),
    CalendarModule.forRoot(),
    DemoUtilsModule,
    NgbDropdownModule
  ],
  declarations: [CalendarWorkComponent]
})
export default class HomeModule { }