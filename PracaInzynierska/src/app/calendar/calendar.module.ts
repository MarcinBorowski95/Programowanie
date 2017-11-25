import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'angular-calendar';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DemoUtilsModule } from '../demo-utils/module';
import { CalendarComponent } from './calendar.component';

const routes = [
  {path: '' , component: CalendarComponent},
  
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgbModalModule.forRoot(),
    CalendarModule.forRoot(),
    DemoUtilsModule,
  ],
  declarations: [CalendarComponent]
})
export default class HomeModule { }